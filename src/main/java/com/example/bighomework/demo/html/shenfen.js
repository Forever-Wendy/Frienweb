function picture(file){
    if (file.files && file.files[0]){
        var img = document.getElementById('showimage');
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;};
        reader.readAsDataURL(file.files[0]);
    }
}

//身份证检测
function checkregsf() {
    var formData = new FormData($("#shou_shenfen")[0]);
    $.ajax({
        type: "POST",//方法类型
        dataType: "text",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/orc" ,		//url
        data: formData,
        crossDomain: true,
        async:false,
        cache:false,
        processData:false,
        contentType:false,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)

        },
        error : function() {
            alert("异常！");
        }
    });
}