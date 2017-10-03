$(document).ready(function () {
    var options = {
        beforeSubmit: showRequest,  // pre-submit callback
        success: showResponse  // post-submit callback
    };

    // bind to the form's submit event
    $('#frmUploader').submit(function () {
        $.ajax({
            type: "POST",
            url: '/add-album',
            data: $("#frmUploader").serialize(), // serializes the form's elements.
            success: function () {
                location.href = "https://stackoverflow.com/questions/3513971/page-redirect-with-successful-ajax-request";
            }
        });
        // $(this).ajaxSubmit(function(){
        //     location.href = "https://stackoverflow.com/questions/3513971/page-redirect-with-successful-ajax-request";

        // });
        // always return false to prevent standard browser submit and page navigation
        return false;
    });
});

// pre-submit callback
function showRequest(formData, jqForm, options) {
    alert('Uploading is starting.');
    return true;
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form) {
    location.href = "https://stackoverflow.com/questions/3513971/page-redirect-with-successful-ajax-request";
}