function checklogin() {
    var uname =  document.getElementById("userNname").value;
    var pword =  document.getElementById("password").value;
    if(uname=="")  //两者中有一个为空
    {
        alert("用户名不能为空！！");
        document.getElementById("userNname").focus();
        return false;
    }
    else
    {
        if(uname.length<3||uname.length>20)
        {
            alert("用户名太短，应在3~20个字符之间！！");
            document.getElementById("userNname").focus();
            return false;
        }
    }
    if (pword=="")  //两者中有一个为空
    {
        alert("密码不能为空！！");
        document.getElementById("password").focus();
        return false;
    }
    else
    {
        if(pword.length<3||pword.length>20)
        {
            alert("密码太短，应在3~20个字符之间！！");
            document.getElementById("password").focus();
            return false;
        }
    }
    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/login" ,		//url
        xhrFields: { withCredentials: true },
        data: $('#formlogin').serialize(),
        crossDomain: true,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if(result==0){
                alert("用户名不存在，登录失败！");
                document.getElementById("userNname").focus();
            }else {
                if(result==-1){
                    alert("密码错误，请重新输入密码！");
                    document.getElementById("password").focus();
                }else{
                    if(result==1){
                        alert("登录成功！");
                        window.location.href ="homepage.html";
                    }
                }
            }
        },
        error : function() {
            alert("异常！");
        }
    });
    return true;
}

function checkSex() {
    var sexNum = document.getElementsByName("sex");
    var sex = "";
    for (let i = 0; i < sexNum.length; ++i) {
        if (sexNum[i].checked) {
            sex = sexNum[i];
        }

    }
    if (sex == "") {
        alert("没有选择性别！！");
        return false;
    }
}



function checkregister() {
    var uname =  document.getElementById("userNname1").value;
    var pword =  document.getElementById("password1").value;
    var surepword = document.getElementById("surePassword").value;
    var introduceText = document.getElementById("introduceText");
    var introduce = introduceText.value;
    if(uname=="")  //两者中有一个为空
    {
        alert("用户名不能为空！！");
        document.getElementById("userNname1").focus();
        return false;
    }
    else
    {
        if(uname.length<3||uname.length>20)
        {
            alert("用户名太短，应在3~20个字符之间！！");
            document.getElementById("userNname1").focus();
            return false;
        }
    }
    if (pword=="")  //两者中有一个为空
    {
        alert("密码不能为空！！");
        document.getElementById("password1").focus();
        return false;
    }
    else
    {
        if(pword.length<3||pword.length>20)
        {
            alert("密码太短，应在3~20个字符之间！！");
            document.getElementById("password1").focus();
            return false;
        }
    }
    if(pword!=surepword){
        alert("密码不一致！！");
        document.getElementById("surePassword").focus();
        return false;
    }

    if(checkSex()==false){
        return false;
    }

    // 校验自我介绍
    if (introduce.length < 3 || introduce.length > 60) {
        alert("自我介绍长度为3-60字!!");
        document.getElementById("introduceText").focus();
        return false;
    }
    var formData = new FormData($("#formregister")[0]);
    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/register" ,		//url
        data: formData,
        crossDomain: true,
        async:false,
        cache:false,
        processData:false,
        contentType:false,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if(result==0){
                alert("用户名存在，注册失败！");
            }else {
                if(result ==-1){
                    alert("图片上传失败，注册失败！");
                }else{
                    alert("注册成功！");
                    window.location.href ="login.html";
                }
            }
        },
        error : function() {
            alert("异常！");
        }
    });
    return true;
}


function picture(file){
    var fileName=$("#register_picture").val();
    if (file.files && file.files[0]){
        var img = document.getElementById('register_picture');
        img.style.display = "block";
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;};
        reader.readAsDataURL(file.files[0]);
    }
}

function resets() {
    var img = document.getElementById('register_picture');
    img.style.display = "none";
}
