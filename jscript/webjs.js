
/*

Title: WebJS
Description: WebJS is a web framework for client side web development.
Author: Ivo Gjorgjievski
Website: www.ivoprogram.com
License: GNU General Public License v3.0 https://www.gnu.org/licenses/gpl-3.0.en.html
Dependency: JQuery

*/


// Global object
var webjs = webjs || {};

// Closure 
(function () {

    var homeUrl = "home.html";

    // ready
    $(document).ready(function () {
        init();

    }); // $(document).ready


    // init
    function init() {

         // Check if initialized.
        if (webjs.init) { return; }
        else { webjs.init = true; }

        // Add event handlers on links 
        $("a").on("click", webjs.contentRequest);

        // Load home page
        webjs.contentLoad(contentUrl());

    } // function


    // contentUrl
    function contentUrl() {

        // 
        var url = homeUrl;
        var params = document.URL.split("content=");
        if (params[1]) {
            url = params[1];
        }

        return url;

    } // function


    // contentRequest
    webjs.contentRequest = function (event) {

        // Avoid target
        if ($(this).attr("target")) {
            return;
        }

        // Avoid anchors
        if ($(this).context.hash.indexOf("#") === 0) {
            return;
        }

        // Stop click propagation
        event.preventDefault();

        // 
        var url = $(this).context.href;
        webjs.contentLoad(url);

    }// function


    // contentLoad
    webjs.contentLoad = function (url) {

        var content = $("<html></html>");

        $(content).load(url, function (response, status, xhr) {

            // If error
            if (status != "success") {
                console.log(xhr.statusText + " url: " + url);
                return;
            }

            // Filter content, replace, scroll
            content.children('meta,link,title').remove();
            $(".content").html($(content).html());
            window.scrollTo(0, 0);

            // Event handlers
            $(".content a").on("click", webjs.contentRequest);
            $(".content").trigger("ready");

        });
    } // function


}()); // Closure 




