<?php

//--------------------------------------------------
// Constants
//--------------------------------------------------

define("ROOT",             dirname(__FILE__));
define("PKG_SIZE",         25);
define("ROWS_PER_REQUEST", 100);


//======================================================================
// USELESS amoCRM SCRIPT
//======================================================================

if ( empty($_POST["sub"]) || empty($_POST["usr"]) || empty($_POST["key"]) ) {
    throwError(400);
}

$subdomain = htmlspecialchars(strip_tags(stripslashes(trim($_POST["sub"]))));
$user = htmlspecialchars(strip_tags(stripslashes(trim($_POST["usr"]))));
$key = htmlspecialchars(strip_tags(stripslashes(trim($_POST["key"]))));

if ( !authenticateUser($user, $key, $subdomain) ) throwError(401);
validateAllLeads($subdomain);

include ROOT . "/success.html";


//--------------------------------------------------
// Functions
//--------------------------------------------------

function throwError($code = 500)
{
    $filename = ROOT . "/errors/HTTP" . $code . ".html";
    if ( file_exists($filename) ) {
        include $filename;
    } else {
        echo "Error " . $code;
    }

    http_response_code($code);
    exit(1);
}

function authenticateUser($login, $hash, $subdomain)
{
    $user = array(
        "USER_LOGIN" => $login,
        "USER_HASH"  => $hash
    );
    $link = "https://" . $subdomain . ".amocrm.ru"
          . "/private/api/auth.php?type=json";

    $result = makeRequest($link, $user);

    if (isset($result["out"]["response"]["auth"])
        && ($result["out"]["response"]["auth"]) )
    {
        return true;
    }    
    return false;
}

function validateAllLeads($subdomain)
{
    $text = "Сделка без задачи";
    $taskDuration = 2592000;
    $offset = 0;

    while (true) {
        $link = "https://" . $subdomain . ".amocrm.ru"
              . "/private/api/v2/json/leads/list?limit_rows="
              . ROWS_PER_REQUEST . "&limit_offset=" . $offset;
        $offset += ROWS_PER_REQUEST;

        $result = makeRequest($link);
        if ($result["code"] == 204) {
            return false;
        }

        $tasks["request"]["tasks"]["add"] = array();
        $result = $result["out"]["response"];

        foreach ($result["leads"] as $lead) {
            if ($lead["closest_task"] === 0) {
                array_push(
                    $tasks["request"]["tasks"]["add"],
                    array(
                        "element_id"    => $lead["id"],
                        "element_type"  => 2,
                        "task_type"     => 1,
                        "text"          => $text,
                        "complete_till" => $result["server_time"] + $taskDuration
                    )
                );
                if (count($tasks["request"]["tasks"]["add"]) >= PKG_SIZE) {
                    $result = makeRequest(getTaskLink($subdomain), $tasks);
                    $tasks["request"]["tasks"]["add"] = array();
                }
            }
        }
        if (count($tasks) > 0) {
            $res = makeRequest(getTaskLink($subdomain), $tasks);
        }
    }

    return true;
}

function makeRequest($link, $post = NULL)
{
    $curl = generateCurlRequest($link, $post);
    return getCurlRequestResult($curl);
}

function getTaskLink($subdomain)
{
    return "https://" . $subdomain . ".amocrm.ru/private/api/v2/json/tasks/set";
}

function generateCurlRequest($link, $post = NULL)
{
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL            => $link,
        CURLOPT_TIMEOUT        => 3,
        CURLOPT_AUTOREFERER    => true,
        CURLOPT_FAILONERROR    => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_USERAGENT      => "amoCRM-API-client/1.0",
        CURLOPT_HTTPHEADER     => array('Content-Type: application/json'),
        CURLOPT_HEADER         => false,
        CURLOPT_COOKIEFILE     => ROOT . "/cookie.txt",
        CURLOPT_COOKIEJAR      => ROOT . "/cookie.txt",
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_SSL_VERIFYHOST => 0
    ));
    if ($post !== NULL) {
        curl_setopt_array($curl, array(
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS    => json_encode($post)
        ));
    }

    return $curl;
}

function getCurlRequestResult($curl)
{
    $result = array(
        "out"  => json_decode(curl_exec($curl), true),
        "code" => (int)curl_getinfo($curl, CURLINFO_HTTP_CODE)
    );
    curl_close($curl);
    checkCurlSuccess($result["code"]);

    return $result;
}

function checkCurlSuccess($code = 500)
{
    if ($code != 200 && $code != 204) throwError($code);
}

/*
function flushTasksToLeads(&$mh, $curls)
{
    $running = NULL;

    do {
        curl_multi_exec($mh, $running);
        // sleep(1);
        usleep(200000);
    } while ($running > 0);

    foreach ($curls as $key => $value) {
        $curls[$key] = false;

        if (curl_errno($value) === 0) {
            $curls[$key] = curl_multi_getcontent($value);
            echo curl_getinfo($value, CURLINFO_HTTP_CODE) . "<br><br>";
        }

        curl_multi_remove_handle($mh, $value);
        curl_close($value);
    }

    curl_multi_close($mh);
}
*/