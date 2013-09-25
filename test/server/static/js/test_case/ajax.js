;(function(_) {
    _.ajax({
        url: "/static/img/images.jpeg",
        responseType: "blob",
        success: function (data) {
            console.log("data: ", data);
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(data);
            document.body.appendChild(img);
        }
    });
    var testFormDataBtn = document.querySelector(".-test-formdata");
    testFormDataBtn.addEventListener("click", function (e) {
        var userName = document.getElementById("usrName").value;
        var userPwd = document.getElementById("usrPwd").value;
        _.ajax({
            type: "POST",
            url: "/api/testAjax/uploadFormData",
            dataToSend: {
                "usrPwd": userPwd,
                "usrName": userName
            },
            success: function (data) {
                var resultElem = document.querySelector(".-test-formdata-result");
                resultElem.innerHTML = data;
            }
        });

        var fileUploadBtn = document.getElementById("#uploadFile");
        fileUploadBtn.addEventListener("change", function (e) {
            var files = this.files;
            var fileList = {};
            var i = 0, file;
            for (;file = files[i]; i ++) {
                fileList[file.name] = file;
            }
            _.ajax({
                type: "POST",
                url: "/api/testAjax/uploadFile",
                dataToSend: fileList,
                upload: {
                    onprogress: function (e) {
                        if (e.lengthComputable) {
                            progressBar.value = (e.loaded / e.total) / 100;
                            progressBar.textContent = progressBar.value;
                        }
                    }
                },
                success: function (data) {

                }
            });
        })
    })
}(xe))
