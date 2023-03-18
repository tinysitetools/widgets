var __io_TstInit = __io_TstInit || (function () {

    // Localize jQuery variable
    var jQuery;
    var _args = {}; // private

    return {
        init: function (Args) {
            _args = Args;

            /******** Load jQuery if not present *********/
            if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.5.1') {

                console.log('TST init jQuery is not loaded');
                var script_tag = document.createElement('script');
                script_tag.setAttribute("type", "text/javascript");
                script_tag.setAttribute("src",
                    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
                if (script_tag.readyState) {
                    script_tag.onreadystatechange = function () { // For old versions of IE
                        if (this.readyState === 'complete' || this.readyState === 'loaded') {
                            scriptLoadHandler();
                        }
                    };
                } else {
                    script_tag.onload = scriptLoadHandler;
                }
                // Try to find the head, otherwise default to the documentElement
                (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
            } else {

                console.log('Tap Widget jQuery is loaded');
                // The jQuery version on the window is the one we want to use
                jQuery = window.jQuery;
                main();
            }
        }

    };

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(); //window.jQuery.noConflict(true);

        // Call our main function
        main();
    }

    function captureFormSubmission() {

        let formData = $(this).closest('form').serializeArray();
        console.log(formData);

        jQuery.ajax({
            type: "POST",
            url: 'https://app.tinysitetools.com/webforms/data',
            data: { data: formData, id: __co_tinysite_props.id, apiKey: __co_tinysite_props.apiKey },
            success: (data) => {
                console.log("Success in POST data");
                console.log(data);
            },
            error: (data) => {
                console.log("Error in POST data");
                console.log(data);
            }
        });
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {

            //add event listener for form submission
            var ele = document.getElementsByClassName("tst-web-form");
            if (ele === null || ele.length === 0) {
                ele = $(":submit").parents("form");
            }
            var form = ele[0];
            console.log('---TST form ---');
            console.log(form);
            if (form.addEventListener) {
                form.addEventListener("submit", captureFormSubmission, false);  //Modern browsers
            } else if (form.attachEvent) {
                form.attachEvent('onsubmit', captureFormSubmission);            //Old IE
            }

        });
    }

})(); // We call our anonymous function immediately
__io_TstInit.init(__co_tinysite_props);