package com.example.bighomework.demo.controller;

import com.example.bighomework.demo.config.BaiDuOCR;
import com.example.bighomework.demo.dao.UserRepository;
import com.example.bighomework.demo.entity.User;
import com.example.bighomework.demo.service.UserService;
import com.example.bighomework.demo.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    UserServiceImpl userServiceImpl;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpServletResponse response;
    @Autowired
    private HttpSession session;

    //用户注册
    @RequestMapping(value = "/user/register",method = RequestMethod.POST)
    @ResponseBody
    public int UserRegister(HttpServletRequest request, HttpServletResponse response,@RequestParam("image") MultipartFile image)throws IOException {
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setCharacterEncoding("utf-8");
        int result;//1代表注册成功，0代表注册失败
        User user = new User();
        String name =request.getParameter("uname");
        System.out.println(name);
        String password = request.getParameter("pword");
        String sex = request.getParameter("sex");
        String phone = request.getParameter("phonenumber");
        String email = request.getParameter("email");
        String message = request.getParameter("introduce");
        String pic = image.getOriginalFilename();
        //获取上传的文件
        try {
            //2.根据时间戳创建新的文件名，这样即便是第二次上传相同名称的文件，也不会把第一次的文件覆盖了
            String fileName = name + image.getOriginalFilename();
            //3.通过req.getServletContext().getRealPath("") 获取当前项目的真实路径，然后拼接前面的文件名
            String destFileName = "D:\\bighomework\\src\\main\\java\\com\\example\\bighomework\\demo\\userdate" + File.separator + fileName;
            //4.第一次运行的时候，这个文件所在的目录往往是不存在的，这里需要创建一下目录（创建到了webapp下uploaded文件夹下）
            File destFile = new File(destFileName);
            destFile.getParentFile().mkdirs();
            //5.把浏览器上传的文件复制到希望的位置
            image.transferTo(destFile);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return -1;
        } catch (IOException e) {
            e.printStackTrace();
            return -1;
        }

        if (userRepository.findByLogname(name)==null){
            user.setLogname(name);
            user.setPassword(password);
            user.setPhone(phone);
            user.setSex(sex);
            user.setMessage(message);
            user.setEmail(email);
            user.setPic(pic);
            userRepository.save(user);
            result = 1;
        }else{
            result=0;
        }
        return result;
    }

    //用户登录
    @RequestMapping(value = "/user/login",method = RequestMethod.POST)
    @ResponseBody
    public int UserLogin(HttpServletRequest request, HttpServletResponse response,HttpSession session){
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("utf-8");
        int result;//1代表登录成功，0代表用户名不存在，-1代表密码错误
        String name = request.getParameter("loginuname");
        String pword = request.getParameter("loginpword");
        if(userRepository.findByLogname(name)==null){
            result = 0;
        }else{
            if (userRepository.findByLognameAndPassword(name,pword)==null){
                result = -1;
            }else {
                result = 1;
                session.setAttribute("name",name);
            }
        }
        return result;
    }

    //用户登录后
    @RequestMapping(value = "/user/homepage",method = RequestMethod.POST)
    @ResponseBody
    public String Homepageimage(HttpServletRequest request, HttpServletResponse response,HttpSession session){
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("utf-8");
        String uname = (String) session.getAttribute("name");
        User u1 = userRepository.findByLogname(uname);
        if(u1==null){
            String result = "用户已退出，请重新登录！";
            return result;
        }else{
            String img = u1.getPic();
            String url = "http://localhost:63342/bighomework/com/example/bighomework/demo/userdate/"+ uname + img;
            return url;
        }
    }

    //用户退出登录后
    @RequestMapping(value = "/user/userexit",method = RequestMethod.POST)
    @ResponseBody
    public String Userexit(HttpServletRequest request, HttpServletResponse response,HttpSession session){
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("utf-8");
        session.removeAttribute("name");
        if(session.getAttribute("name")==null){
            return "ok!";
        }else{
            return null;
        }
    }

    //分页显示所有用户
    @RequestMapping(value = "/user/finduserpage/{page}",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> FindUserPage(HttpServletRequest request, HttpServletResponse response, HttpSession session,@PathVariable("page") Integer page){
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("utf-8");
        Map<String,Object> result=new HashMap<>();
        int i =1;
        Page<User> pageData = userServiceImpl.findAllUserByPage(page);
        List<User> allUser = pageData.getContent();
        long pe = pageData.getTotalElements();//总数据量
        long pe2 = pageData.getTotalPages();//总页数
        long currentpage = page;//当前页数
        for(User u:allUser){
            String uname = u.getLogname();
            String upassword = u.getPassword();
            String uphone = u.getPhone();
            String uemail = u.getEmail();
            String umessage = u.getMessage();
            String upic = u.getPic();
            String usex = u.getSex();
            result.put("uname"+i,uname);
            result.put("upassword"+i,upassword);
            result.put("uphone"+i,uphone);
            result.put("uemail"+i,uemail);
            result.put("umessage"+i,umessage);
            result.put("upic"+i,upic);
            result.put("usex"+i,usex);
            i++;
        }
        result.put("TotlePages",pe2);
        result.put("TotalElements",pe);
        result.put("currentPage",currentpage);
        return result;
    }

    //修改用户信息填充
    @RequestMapping(value = "/user/recomposes",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> Recompose(HttpServletRequest request, HttpServletResponse response,HttpSession session){
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("utf-8");
        Map<String,Object> result=new HashMap<>();
        String unames = (String) session.getAttribute("name");
        User u = userRepository.findByLogname(unames);
        String uname = u.getLogname();
        String upassword = u.getPassword();
        String uphone = u.getPhone();
        String uemail = u.getEmail();
        String umessage = u.getMessage();
        String upic = u.getPic();
        String usex = u.getSex();
        result.put("uname",uname);
        result.put("uphone",uphone);
        result.put("uemail",uemail);
        result.put("umessage",umessage);
        result.put("upic",upic);
        result.put("usex",usex);
        result.put("upassword",upassword);
        return result;
    }

    //修改用户信息
    @RequestMapping(value = "/user/changeusermessage",method = RequestMethod.POST)
    @ResponseBody
    public int ChangeUserMessage(HttpServletRequest request, HttpServletResponse response,HttpSession session,@RequestParam("image") MultipartFile image)throws IOException{
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("utf-8");
        String unames = (String) session.getAttribute("name");
        User u = userRepository.findByLogname(unames);
        String newupword = request.getParameter("pword");
        String newphone = request.getParameter("phonenumber");
        String newsex = request.getParameter("sex");
        String newemail = request.getParameter("email");
        String newmessage = request.getParameter("introduce");
        String newpic = image.getOriginalFilename();
        if(!newpic.equals("") && !newpic.equals(u.getPic())){
            //获取上传的文件
            try {
                String fileName = unames + image.getOriginalFilename();
                String destFileName = "D:\\bighomework\\src\\main\\java\\com\\example\\bighomework\\demo\\userdate" + File.separator + fileName;
                String oldFileName = "D:\\bighomework\\src\\main\\java\\com\\example\\bighomework\\demo\\userdate" + File.separator + unames+u.getPic();
                //删除旧图片
                File oldFile = new File(oldFileName);
                if(oldFile.isFile() && oldFile.exists()) {
                    oldFile.delete();
                }
                //上传新图片
                File destFile = new File(destFileName);
                destFile.getParentFile().mkdirs();
                //5.把浏览器上传的文件复制到希望的位置
                image.transferTo(destFile);
                u.setPic(newpic);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        u.setPassword(newupword);
        u.setPhone(newphone);
        u.setSex(newsex);
        u.setMessage(newmessage);
        u.setEmail(newemail);
        userRepository.save(u);
        int result = 1;
        return result;
    }

    //根据用户名找用户
    @RequestMapping(value = "/user/findbyuname",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> FindByUname(HttpServletRequest request, HttpServletResponse response,HttpSession session){
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("utf-8");
        Map<String,Object> result=new HashMap<>();
        String uname = request.getParameter("search_in");
        User u = userRepository.findByLogname(uname);
        if(u!=null){
            String unames = u.getLogname();
            String upassword = u.getPassword();
            String uphone = u.getPhone();
            String uemail = u.getEmail();
            String umessage = u.getMessage();
            String upic = u.getPic();
            String usex = u.getSex();
            result.put("uname"+1,unames);
            result.put("upassword"+1,upassword);
            result.put("uphone"+1,uphone);
            result.put("uemail"+1,uemail);
            result.put("umessage"+1,umessage);
            result.put("upic"+1,upic);
            result.put("usex"+1,usex);
            result.put("TotlePages",1);
            result.put("TotalElements",1);
            result.put("currentPage",1);

            return result;
        }else{
            result.put("notfind","用户不存在！");
            return result;
        }
    }


    /*判断是否已经上传过身份证*/
    @RequestMapping(value = "/user/show_spic",method = RequestMethod.POST)
    public Map<String,Object> shows_pic(HttpServletRequest request, HttpServletResponse response,HttpSession session,@RequestParam("pic") MultipartFile picOcr) throws Exception {
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("utf-8");
        String unames = (String) session.getAttribute("name");
        User u = userRepository.findByLogname(unames);
        Map<String,Object> result=new HashMap<>();
        result.put("姓名",u.getS_name());
        result.put("民族",u.getS_nation());
        result.put("出生日期",u.getS_date());
        result.put("住址",u.getS_location());
        result.put("公民身份号码",u.getS_id());
        result.put("性别",u.getS_sex());
        result.put("身份证图片名",u.getS_pic());
        return result;
    }


    /**
     * 图片识别
     * @param picOcr
     * @throws Exception
     */
    @RequestMapping(value = "/user/orc",method = RequestMethod.POST)
    public Map<String,Object> picOCR(HttpServletRequest request, HttpServletResponse response,HttpSession session,@RequestParam("pic") MultipartFile picOcr) throws Exception {
        response.addHeader("Access-Control-Allow-Origin", "*");   //用于ajax post跨域（*，最好指定确定的http等协议+ip+端口号）
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setCharacterEncoding("utf-8");
        String unames = (String) session.getAttribute("name");
        User u = userRepository.findByLogname(unames);
        Map<String,Object> result=new HashMap<>();
        String newpic = picOcr.getOriginalFilename();
        byte[] data = null;
        BASE64Encoder base64Encoder = new BASE64Encoder();
        String base64 = base64Encoder.encode(picOcr.getBytes());
        base64 = base64.replaceAll("\r\n", "");
        base64 = base64.replaceAll("\\+", "%2B");
        String httpUrl = "https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=" + BaiDuOCR.getAuth();
        //正面照
        String httpFront = "detect_direction=true&id_card_side=front&image=" + base64;
        //背面照
        String httpBack = "detect_direction=true&id_card_side=back&image=" + base64;
        String jsonResult = BaiDuOCR.request(httpUrl, httpFront);
        HashMap<String, String> map = BaiDuOCR.getHashMapByJson(jsonResult);
        for (String key : map.keySet()) {
            System.out.println(key + ": " + map.get(key));
            result.put(key,map.get(key));
        }
        if(!newpic.equals("") && !newpic.equals(u.getPic())){
            //获取上传的文件
            try {
                String fileName = unames + picOcr.getOriginalFilename();
                String destFileName = "D:\\bighomework\\src\\main\\java\\com\\example\\bighomework\\demo\\user_shenfen" + File.separator + fileName;
                String oldFileName = "D:\\bighomework\\src\\main\\java\\com\\example\\bighomework\\demo\\user_shenfen" + File.separator + unames+u.getPic();
                //删除旧图片
                File oldFile = new File(oldFileName);
                if(oldFile.isFile() && oldFile.exists()) {
                    oldFile.delete();
                }
                //上传新图片
                File destFile = new File(destFileName);
                destFile.getParentFile().mkdirs();
                //5.把浏览器上传的文件复制到希望的位置
                picOcr.transferTo(destFile);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        u.setS_name((String) result.get("姓名"));
        u.setS_date((String) result.get("出生日期"));
        u.setS_id((String) result.get("公民身份号码"));
        u.setS_location((String) result.get("住址"));
        u.setS_nation((String) result.get("民族"));
        u.setS_sex((String) result.get("性别"));
        u.setS_pic(newpic);
        userRepository.save(u);
        return result;
    }

}
