$(document).ready(function () {
    var options = {
        beforeSubmit: showRequest,  // pre-submit callback
        success: showResponse  // post-submit callback
    };

    // bind to the form's submit event
    $('#btnSubmit').on('click', function(){
        var formData = new FormData();
        // formData.append('artist', $('form input#artist').val());
        // formData.append('album', $('form input#album').val());
        // formData.append('year', $('form input#year').val());
        // formData.append('length', $('form input#length').val());
        // formData.append('genre', $('form input#genre').val());
        //formData.append('img', $('form input#file'));
        formData.append('artist', 'kupa');

        var form =  $("#frmUploader")[0].elements;

        var data = {
            artist: $('form input#artist').val(),
            album: $('form input#album').val(),
            year: $('form input#year').val(),
            songList: "",
            length: $('form input#length').val(),
            genre: $('form input#genre').val(),
            img: $('form input#file')
        };
        console.log(formData.get('artist'));
        
        $.ajax({
            type: "POST",
            url: '/add-album',
            contentType: 'multipart/form-data',
            data: formData, // serializes the form's elements.
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