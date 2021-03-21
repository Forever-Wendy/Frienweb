$(document).ready(function () {
    var uimg = document.getElementById("user_img");
    var umessage = document.getElementById("user_message");
    var allusermessage = document.getElementById("AllUser_message");
    var search = document.getElementById("search");
    var foot = document.getElementById("foot_div");
    var shenfen = document.getElementById("show_shenfen");
    shenfen.style.display = "none";
    foot.style.display = "block";
    umessage.style.display = "none";
    allusermessage.style.display = "block";
    search.style.display = "block";
    $.ajax({
        type: "POST",//方法类型
        dataType: "text",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/homepage" ,		//url
        xhrFields: { withCredentials: true },//判断同一个session
        crossDomain: true,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if(result=="用户已退出，请重新登录！"){
                alert(result);
                window.location.href ="login.html";
            }else{
                uimg.src = result;
                findAllUser(1);
                recompose();
                //findAllUser();
            }
        },
        error : function() {
            alert("异常！");
        }
    });
});



function userexit() {
    $.ajax({
        type: "POST",//方法类型
        dataType: "text",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/userexit" ,		//url
        xhrFields: { withCredentials: true },//判断同一个session
        crossDomain: true,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if(result!=null){
                window.location.href ="login.html";
            }else{
                alert("用户退出失败，状态异常！");
            }
        },
        error : function() {
            alert("异常！");
        }
    });
}

//分页显示所有用户
function findAllUser(page) {
    var umessage = document.getElementById("user_message");
    var allusermessage = document.getElementById("AllUser_message");
    var search = document.getElementById("search");
    var foot = document.getElementById("foot_div");
    var shenfen = document.getElementById("show_shenfen");
    shenfen.style.display = "none";
    foot.style.display = "block";
    umessage.style.display = "none";
    allusermessage.style.display = "block";
    search.style.display = "block";
    var i;
    for(i=1;i<=4;i++){
        var uimg = document.getElementById("user"+i+"_img");
        var uname = document.getElementById("user"+i+"_name");
        var usex = document.getElementById("user"+i+"_sex");
        var uphone = document.getElementById("user"+i+"_phone");
        var uemail= document.getElementById("user"+i+"_email");
        var uintroduce= document.getElementById("user"+i+"_message");
        uname.innerText = "";
        usex.innerText = "性别：";
        uphone.innerText = "手机号码：";
        uemail.innerText = "邮箱：";
        uintroduce.innerText = "";
    }


    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/finduserpage/"+page ,		//url
        xhrFields: { withCredentials: true },//判断同一个session
        crossDomain: true,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if(result!=null){
                if(result.uname1!=null){
                    var uimg1 = document.getElementById("user1_img");
                    var uname1 = document.getElementById("user1_name");
                    var usex1 = document.getElementById("user1_sex");
                    var uphone1 = document.getElementById("user1_phone");
                    var uemail1 = document.getElementById("user1_email");
                    var uintroduce1 = document.getElementById("user1_message");
                    uname1.innerText += result.uname1;
                    if(result.usex1=="girl"){
                        usex1.innerText += "♀";
                    }else{
                        usex1.innerText += "♂";
                    }
                    uphone1.innerText += result.uphone1;
                    uemail1.innerText += result.uemail1;
                    uintroduce1.innerText += result.umessage1;
                    uimg1.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/userdate/"+result.uname1 +result.upic1
                }else{
                    var uimg11 = document.getElementById("user"+1+"_img");
                    var uname11 = document.getElementById("user"+1+"_name");
                    var usex11 = document.getElementById("user"+1+"_sex");
                    var uphone11 = document.getElementById("user"+1+"_phone");
                    var uemail11 = document.getElementById("user"+1+"_email");
                    var uintroduce11 = document.getElementById("user"+1+"_message");
                    uname11.innerText = "";
                    usex11.innerText = "性别：";
                    uphone11.innerText = "手机号码：";
                    uemail11.innerText = "邮箱：";
                    uintroduce11.innerText = "";
                    uimg11.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/images/头像.png";
                }
                if(result.uname2!=null){
                    var uimg2 = document.getElementById("user2_img");
                    var uname2 = document.getElementById("user2_name");
                    var usex2 = document.getElementById("user2_sex");
                    var uphone2 = document.getElementById("user2_phone");
                    var uemail2 = document.getElementById("user2_email");
                    var uintroduce2 = document.getElementById("user2_message");
                    uname2.innerText += result.uname2;
                    if(result.usex2=="girl"){
                        usex2.innerText += "♀";
                    }else{
                        usex2.innerText += "♂";
                    }
                    uphone2.innerText += result.uphone2;
                    uemail2.innerText += result.uemail2;
                    uintroduce2.innerText += result.umessage2;
                    uimg2.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/userdate/"+result.uname2+result.upic2
                }else{
                    var uimg22 = document.getElementById("user"+2+"_img");
                    var uname22 = document.getElementById("user"+2+"_name");
                    var usex22 = document.getElementById("user"+2+"_sex");
                    var uphone22 = document.getElementById("user"+2+"_phone");
                    var uemail22 = document.getElementById("user"+2+"_email");
                    var uintroduce22 = document.getElementById("user"+2+"_message");
                    uname22.innerText = "";
                    usex22.innerText = "性别：";
                    uphone22.innerText = "手机号码：";
                    uemail22.innerText = "邮箱：";
                    uintroduce22.innerText = "";
                    uimg22.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/images/头像.png";
                }
                if(result.uname3!=null){
                    var uimg3 = document.getElementById("user3_img");
                    var uname3 = document.getElementById("user3_name");
                    var usex3 = document.getElementById("user3_sex");
                    var uphone3 = document.getElementById("user3_phone");
                    var uemail3 = document.getElementById("user3_email");
                    var uintroduce3 = document.getElementById("user3_message");
                    uname3.innerText += result.uname3;
                    if(result.usex3=="girl"){
                        usex3.innerText += "♀";
                    }else{
                        usex3.innerText += "♂";
                    }
                    uphone3.innerText += result.uphone3;
                    uemail3.innerText += result.uemail3;
                    uintroduce3.innerText += result.umessage3;
                    uimg3.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/userdate/"+result.uname3+result.upic3
                }else{
                    var uimg33 = document.getElementById("user"+3+"_img");
                    var uname33 = document.getElementById("user"+3+"_name");
                    var usex33 = document.getElementById("user"+3+"_sex");
                    var uphone33 = document.getElementById("user"+3+"_phone");
                    var uemail33 = document.getElementById("user"+3+"_email");
                    var uintroduce33 = document.getElementById("user"+3+"_message");
                    uname33.innerText = "";
                    usex33.innerText = "性别：";
                    uphone33.innerText = "手机号码：";
                    uemail33.innerText = "邮箱：";
                    uintroduce33.innerText = "";
                    uimg33.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/images/头像.png";
                }
                if(result.uname4!=null){
                    var uimg4 = document.getElementById("user4_img");
                    var uname4 = document.getElementById("user4_name");
                    var usex4 = document.getElementById("user4_sex");
                    var uphone4 = document.getElementById("user4_phone");
                    var uemail4 = document.getElementById("user4_email");
                    var uintroduce4 = document.getElementById("user4_message");
                    uname4.innerText += result.uname4;
                    if(result.usex4=="girl"){
                        usex4.innerText += "♀";
                    }else{
                        usex4.innerText += "♂";
                    }
                    uphone4.innerText += result.uphone4;
                    uemail4.innerText += result.uemail4;
                    uintroduce4.innerText += result.umessage4;
                    uimg4.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/userdate/"+result.uname4+result.upic4
                }else{
                    var uimg44 = document.getElementById("user"+4+"_img");
                    var uname44 = document.getElementById("user"+4+"_name");
                    var usex44 = document.getElementById("user"+4+"_sex");
                    var uphone44 = document.getElementById("user"+4+"_phone");
                    var uemail44 = document.getElementById("user"+4+"_email");
                    var uintroduce44 = document.getElementById("user"+4+"_message");
                    uname44.innerText = "";
                    usex44.innerText = "性别：";
                    uphone44.innerText = "手机号码：";
                    uemail44.innerText = "邮箱：";
                    uintroduce44.innerText = "";
                    uimg44.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/images/头像.png";
                }
                var currentPage = result.currentPage;//当前页数
                var TotalPages = result.TotlePages;//总页数
                var pageNav = $("#pageNav");
                var pageList = '';/*生成页码*/
                for (var i = 0; i < TotalPages+2; i++) {
                    if(i!=0&&i!=TotalPages+1){
                        pageList += '<li class="click_button"><a " href="javascript:;">'+'</a></li>';
                    }else {
                        pageList += '<li><a href="javascript:;">'+'</a></li>';
                    }
                }
                pageNav.html(pageList);
                /*当前页面按钮高亮*/
                /*当前页加高亮显示*/
                var hh = currentPage+1;
                var iNum = 0;/*当前的索引值*/
                pageNav.find("li:nth-child("+hh+") a").addClass("active");
                /*******标签页的点击事件*******/
                pageNav.find("li.click_button a").each(function() {
                    $(this).click(function() {
                        pageNav.find("a").removeClass("active");
                        $(this).addClass("active");
                        var index = $("li.click_button a").index(this);
                        var currentindex = index + 1;
                        findAllUser(currentindex);
                    });
                })
                /*如果是第一页*/
                pageNav.find("li:first-child a").each(function () {
                    $(this).click(function() {
                        if(currentPage==1){
                            alert("当前已经是首页！");
                            pageNav.find("li:first-child a").removeClass("active");
                            pageNav.find("li:nth-child("+hh+") a").addClass("active");
                        }else{
                            findAllUser(currentPage-1);
                        }
                    });
                })
                /*如果是最后一页*/
                pageNav.find("li:last-child a").each(function () {
                    $(this).click(function() {
                        if(currentPage==TotalPages){
                            alert("当前已经是尾页！");
                            pageNav.find("li:last-child a").removeClass("active");
                            pageNav.find("li:nth-child("+hh+") a").addClass("active");
                        }else{
                            findAllUser(currentPage+1);
                        }
                    });
                })
            }
        },
        error : function() {
            alert("异常！");
        }
    });
}


//修改信息填充
function recompose() {
    var uname = document.getElementById("user_name");
    var uphone = document.getElementById("phone");
    var uemail= document.getElementById("email");
    var uintroduce= document.getElementById("introduceText");
    var introduceText = document.getElementById("introduceText");
    var introduce = introduceText.value;

    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/recomposes" ,		//url
        xhrFields: { withCredentials: true },//判断同一个session
        crossDomain: true,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
                uname.innerHTML+="&nbsp&nbsp&nbsp&nbsp&nbsp"+result.uname;
                uphone.value = result.uphone;
                uemail.value = result.uemail;
                uintroduce.value = result.umessage;
                if(result.usex=="boy"){
                    $("#boy").attr("checked",true);
                    $("#girl").attr("checked",false);
                }else{
                    $("#girl").attr("checked",true);
                    $("#boy").attr("checked",false);
                }
        },
        error : function() {
            alert("异常！");
        }
    });
}

//用户修改信息
function change_message() {
    var pword =  document.getElementById("password1").value;
    var surepword = document.getElementById("surePassword").value;
    var introduceText = document.getElementById("introduceText");
    var introduce = introduceText.value;

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
        url: "http://localhost:8080/chat/user/changeusermessage" ,		//url
        xhrFields: { withCredentials: true },//判断同一个session
        data: formData,
        async:false,
        cache:false,
        processData:false,
        contentType:false,
        crossDomain: true,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            alert("修改成功！请重新登录~");
            userexit();
        },
        error : function() {
            alert("异常！");
        }
    });
}

//点击用户信息按钮显示div
function check_usermessage() {
    var umessage = document.getElementById("user_message");
    var allusermessage = document.getElementById("AllUser_message");
    var search = document.getElementById("search");
    var foot = document.getElementById("foot_div");
    var shenfen = document.getElementById("show_shenfen");
    shenfen.style.display = "none";
    foot.style.display = "none";
    umessage.style.display = "flex";
    umessage.style.marginTop = "20px";
    allusermessage.style.display = "none";
    search.style.display = "none";

}

//根据名字搜索用户
function search_user() {
    var i;
    for(i=1;i<=4;i++){
        var uimg = document.getElementById("user"+i+"_img");
        var uname = document.getElementById("user"+i+"_name");
        var usex = document.getElementById("user"+i+"_sex");
        var uphone = document.getElementById("user"+i+"_phone");
        var uemail= document.getElementById("user"+i+"_email");
        var uintroduce= document.getElementById("user"+i+"_message");
        uname.innerText = "";
        usex.innerText = "性别：";
        uphone.innerText = "手机号码：";
        uemail.innerText = "邮箱：";
        uintroduce.innerText = "";
        uimg.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/images/头像.png";
    }

    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/findbyuname" ,		//url
        xhrFields: { withCredentials: true },//判断同一个session
        data: $('#search_form').serialize(),
        crossDomain: true,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            if(result!=null){
                if(result.uname1!=null){
                    var uimg1 = document.getElementById("user1_img");
                    var uname1 = document.getElementById("user1_name");
                    var usex1 = document.getElementById("user1_sex");
                    var uphone1 = document.getElementById("user1_phone");
                    var uemail1 = document.getElementById("user1_email");
                    var uintroduce1 = document.getElementById("user1_message");
                    uname1.innerText += result.uname1;
                    if(result.usex1=="girl"){
                        usex1.innerText += "♀";
                    }else{
                        usex1.innerText += "♂";
                    }
                    uphone1.innerText += result.uphone1;
                    uemail1.innerText += result.uemail1;
                    uintroduce1.innerText += result.umessage1;
                    uimg1.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/userdate/"+result.uname1 +result.upic1
                }else{
                    alert(result.notfind);
                }
                if(result.uname2!=null){
                    var uimg2 = document.getElementById("user2_img");
                    var uname2 = document.getElementById("user2_name");
                    var usex2 = document.getElementById("user2_sex");
                    var uphone2 = document.getElementById("user2_phone");
                    var uemail2 = document.getElementById("user2_email");
                    var uintroduce2 = document.getElementById("user2_message");
                    uname2.innerText += result.uname2;
                    if(result.usex2=="girl"){
                        usex2.innerText += "♀";
                    }else{
                        usex2.innerText += "♂";
                    }
                    uphone2.innerText += result.uphone2;
                    uemail2.innerText += result.uemail2;
                    uintroduce2.innerText += result.umessage2;
                    uimg2.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/userdate/"+result.uname2+result.upic2
                }
                if(result.uname3!=null){
                    var uimg3 = document.getElementById("user3_img");
                    var uname3 = document.getElementById("user3_name");
                    var usex3 = document.getElementById("user3_sex");
                    var uphone3 = document.getElementById("user3_phone");
                    var uemail3 = document.getElementById("user3_email");
                    var uintroduce3 = document.getElementById("user3_message");
                    uname3.innerText += result.uname3;
                    if(result.usex3=="girl"){
                        usex3.innerText += "♀";
                    }else{
                        usex3.innerText += "♂";
                    }
                    uphone3.innerText += result.uphone3;
                    uemail3.innerText += result.uemail3;
                    uintroduce3.innerText += result.umessage3;
                    uimg3.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/userdate/"+result.uname3+result.upic3
                }
                if(result.uname4!=null){
                    var uimg4 = document.getElementById("user4_img");
                    var uname4 = document.getElementById("user4_name");
                    var usex4 = document.getElementById("user4_sex");
                    var uphone4 = document.getElementById("user4_phone");
                    var uemail4 = document.getElementById("user4_email");
                    var uintroduce4 = document.getElementById("user4_message");
                    uname4.innerText += result.uname4;
                    if(result.usex4=="girl"){
                        usex4.innerText += "♀";
                    }else{
                        usex4.innerText += "♂";
                    }
                    uphone4.innerText += result.uphone4;
                    uemail4.innerText += result.uemail4;
                    uintroduce4.innerText += result.umessage4;
                    uimg4.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/userdate/"+result.uname4+result.upic4
                }
                var currentPage = result.currentPage;//当前页数
                var TotalPages = result.TotlePages;//总页数
                var pageNav = $("#pageNav");
                var pageList = '';/*生成页码*/
                for (var i = 0; i < TotalPages+2; i++) {
                    if(i!=0&&i!=TotalPages+1){
                        pageList += '<li class="click_button"><a " href="javascript:;">'+'</a></li>';
                    }else {
                        pageList += '<li><a href="javascript:;">'+'</a></li>';
                    }
                }
                pageNav.html(pageList);
                /*当前页面按钮高亮*/
                /*当前页加高亮显示*/
                var hh = currentPage+1;
                var iNum = 0;/*当前的索引值*/
                pageNav.find("li:nth-child("+hh+") a").addClass("active");
                /*******标签页的点击事件*******/
                pageNav.find("li.click_button a").each(function() {
                    $(this).click(function() {
                        pageNav.find("a").removeClass("active");
                        $(this).addClass("active");
                        var index = $("li.click_button a").index(this);
                        var currentindex = index + 1;
                        findAllUser(currentindex);
                    });
                })
                /*如果是第一页*/
                pageNav.find("li:first-child a").each(function () {
                    $(this).click(function() {
                        if(currentPage==1){
                            alert("当前已经是首页！");
                            pageNav.find("li:first-child a").removeClass("active");
                            pageNav.find("li:nth-child("+hh+") a").addClass("active");
                        }else{
                            findAllUser(currentPage-1);
                        }
                    });
                })
                /*如果是最后一页*/
                pageNav.find("li:last-child a").each(function () {
                    $(this).click(function() {
                        if(currentPage==TotalPages){
                            alert("当前已经是尾页！");
                            pageNav.find("li:last-child a").removeClass("active");
                            pageNav.find("li:nth-child("+hh+") a").addClass("active");
                        }else{
                            findAllUser(currentPage+1);
                        }
                    });
                })
            }
        },
        error : function() {
            alert("异常！");
        }
    });
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

//显示身份检测区域
function showsf() {
    var umessage = document.getElementById("user_message");
    var allusermessage = document.getElementById("AllUser_message");
    var search = document.getElementById("search");
    var foot = document.getElementById("foot_div");
    var shenfen = document.getElementById("show_shenfen");
    foot.style.display = "none";
    umessage.style.display = "none";
    allusermessage.style.display = "none";
    search.style.display = "none";
    shenfen.style.display = "flex";

    var formData = new FormData($("#shou_shenfen")[0]);
    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/show_spic" ,		//url
        data: formData,
        crossDomain: true,
        xhrFields: { withCredentials: true },//判断同一个session
        async:false,
        cache:false,
        processData:false,
        contentType:false,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            var details = document.getElementById("shenfen_details");
            details.innerText="";
            details.innerText += "姓名：  " + result.姓名 ;
            details.innerHTML += "<br>";
            details.innerText += "民族：  " + result.民族;
            details.innerHTML += "<br>";
            details.innerText += "出生日期：  " + result.出生日期;
            details.innerHTML += "<br>";
            details.innerText += "住址：  " + result.住址;
            details.innerHTML += "<br>";
            details.innerText += "公民身份号码：  " + result.公民身份号码;
            details.innerHTML += "<br>";
            details.innerText += "性别：  " + result.性别;
            details.innerHTML += "<br>";
            if(result.身份证图片名!=null){
                var img = document.getElementById('showimage');
                img.style.display = "flex";
                img.style.marginLeft = "100px";
                img.src = "http://localhost:63342/bighomework/com/example/bighomework/demo/user_shenfen/"+result.姓名+result.身份证图片名;
            }
        },
        error : function() {
            alert("异常！");
        }
    });
}


//身份证检测
function checkregsf() {
    var formData = new FormData($("#shou_shenfen")[0]);
    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://localhost:8080/chat/user/orc" ,		//url
        data: formData,
        crossDomain: true,
        xhrFields: { withCredentials: true },//判断同一个session
        async:false,
        cache:false,
        processData:false,
        contentType:false,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            alert("身份证上传成功！");
            var details = document.getElementById("shenfen_details");
            details.innerText="";
            details.innerText += "姓名：  " + result.姓名 ;
            details.innerHTML += "<br>";
            details.innerText += "民族：  " + result.民族;
            details.innerHTML += "<br>";
            details.innerText += "出生日期：  " + result.出生日期;
            details.innerHTML += "<br>";
            details.innerText += "住址：  " + result.住址;
            details.innerHTML += "<br>";
            details.innerText += "公民身份号码：  " + result.公民身份号码;
            details.innerHTML += "<br>";
            details.innerText += "性别：  " + result.性别;
            details.innerHTML += "<br>";
        },
        error : function() {
            alert("异常！");
        }
    });
}

function sf_picture(file){
    if (file.files && file.files[0]){
        var img = document.getElementById('showimage');
        img.style.display = "flex";
        img.style.marginLeft = "100px";
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;};
        reader.readAsDataURL(file.files[0]);
    }
}