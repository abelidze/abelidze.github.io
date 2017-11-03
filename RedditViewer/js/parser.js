"use strict";

$(document).ready(function(){
    let url = "https://www.reddit.com/r/funny/.json";

    $("#reddit-getter").click(function() {
        $(this).attr("value", "Обновить записи");
        $.getJSON(url)
            .done(function(obj) {
                $("#content").html( convertToHTML(obj) );
                $(".spoiler-link").click(function() {
                    $(this).parent().children(".spoiler-body").slideToggle("slow");
                    return false;
                });
            })
            .fail(function(request, textStatus) {
                console.log(textStatus);
            })
    });
});

function convertToHTML(tree) {
    let html = "";
    let stack = [];

    stack.push(tree);
    while (stack.length > 0) {
        let current = stack[stack.length - 1];
        if (!current.visited) {
            html += "<div class=" + current.kind.toLowerCase() + ">\n";
        }
        current.visited = true;

        if (current.data.children && current.data.children.length > 0) {
            stack.push( current.data.children.pop() );
            continue;
        }
        
        current = stack.pop();
        delete current.visited;

        switch ( current.kind.toLowerCase() ) {
            case "listing":
                console.log(current);
                break;
            case "t3":
                html += generateRowHTML(current.data);
                break;
        }

        html += "</div><br>\n";
    }
    return html;
}

function generateRowHTML(data) {
    let html = "";
    html += generateSpoilerHTML("JSON", JSON.stringify(data));

    html += "<div class='row'>";
    html += "<div class='" + data.post_hint + "'>";
    html += "<h1 class='title'><a href='" + data.url + "'>" + data.title + "</a></h1>";
    html += "<h2 class='domain'>(" + data.domain + ")</h2>";
    html += "<h2 class='author'>" + data.author + "</h2>";
    html += "<h2 class='score'>" + data.score + "</h2>";
    html += "<img class='thumbnail' src='" + data.thumbnail + "' height='" + data.thumbnail_height + "' width='" + data.thumbnail_width + "'>";
    switch ( data.post_hint ) {
        case "link":
            break;
        case "image":
            html += "<div class='content_unwrap'>"
                 +  "<div class='not_clicked'>";
            if (Object.keys(data.preview.images[0].variants).length !== 0) {
                html += "<img src='" + data.preview.images[0].variants.gif.source.url + "'>";
            }
            else {
                html += "<img src='" + data.preview.images[0].resolutions[Math.ceil(data.preview.images[0].resolutions.length / 2)].url + "'>";
            }
            html += "</div>"
                 +  "</div>";
            break;
        case "hosted:video":
            html += "<div class='content_unwrap'>"
                 +  "<div class='not_clicked'>"
                 +  "<video width='" + data.media.width + "' height='" + data.media.height + "' autoplay controls>"
                 +  "<source src='" + data.media.reddit_video.fallback_url + "'>"
                 +  "</video>"
                 +  "</div>"
                 +  "</div>";
            break;
    }
    html += "</div>";
    html += "</div>";

    return html;
}

function generateSpoilerHTML(title, body) {
    let html = "";
    html += "<div class='spoiler'>\n";
    html += "<a href='' class='spoiler-link'>" + title + "</a>\n";
    html += "<div class='spoiler-body'>" + body + "</div>\n";
    html += "</div>\n";

    return html;
}