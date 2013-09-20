;(function (_) {
    _.ajax({
        url: "/static/img/images.jpeg",
        responseType: "blob",
        success: function (data) {
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(data);
            document.body.appendChild(img);
        }
    });
}(xe))
