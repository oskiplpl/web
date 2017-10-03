$(document).ready(function () {
    console.log('sss');

    $('#img-submit').on('click', function () {

        var file = $('#file-img').prop('files')[0];
        // var fileInput = $('#file-img')[0].files[0];
        // var formData = new FormData();
        // formData.append('file', file);
        // console.log(file);
        if (file) {
            // create reader
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function (e) {
                // browser completed reading file - display it
                var img = { value: e.target.result, contentType: 'multipart/form-data' };

                $.ajax({
                    type: 'POST',
                    url: '/add-album',
                    data: img,
                    success: function (data) {
                        location.reload();
                    }
                });
                return false;
            };
        }

    });

});