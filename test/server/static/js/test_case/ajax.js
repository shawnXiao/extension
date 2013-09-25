;(function(_) {
    _.ajax({
        url: "/static/img/images.jpeg",
        responseType: "blob",
        success: function (data) {
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(data);
            document.body.appendChild(img);
        }
    });
    var testFormDataBtn = document.querySelector(".-test-formdata");
    testFormDataBtn.addEventListener("click", function (e) {
        var userName = document.getElementById("usrName").value;
        var userPwd = document.getElementById("usrPwd").value;
        var formData = new FormData();
        formData.append("usrName", userName);
        formData.append("usrPwd", userPwd);
        _.ajax({
            type: "POST",
            url: "/api/testAjax/uploadFormData",
            success: function (data) {
                var resultElem = document.querySelector("-test-formdata-result");
                resultElem.innerHTML = data;
            }
        });
    })
}(xe))
