package com.example.bighomework.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity(name = "user")
@JsonIgnoreProperties(value ={"hibernatelazyInitializer" })
public class User {
    @Id
    @Column(length = 100)
    private String logname;
    @Column(length = 100)
    private String password;
    @Column(length = 100)
    private String phone;
    @Column(length = 200)
    private String email;
    @Column(length = 200)
    private String message;
    @Column(length = 200)
    private String pic;
    @Column(length = 200)
    private String sex;
    @Column(length = 200)
    private String s_name;
    @Column(length = 200)
    private String s_nation;
    @Column(length = 200)
    private String s_date;
    @Column(length = 200)
    private String s_location;
    @Column(length = 200)
    private String s_id;
    @Column(length = 200)
    private String s_sex;

    public String getS_pic() {
        return s_pic;
    }

    public void setS_pic(String s_pic) {
        this.s_pic = s_pic;
    }

    @Column(length = 200)
    private String s_pic;

    public String getS_name() {
        return s_name;
    }

    public void setS_name(String s_name) {
        this.s_name = s_name;
    }

    public String getS_nation() {
        return s_nation;
    }

    public void setS_nation(String s_nation) {
        this.s_nation = s_nation;
    }

    public String getS_date() {
        return s_date;
    }

    public void setS_date(String s_date) {
        this.s_date = s_date;
    }

    public String getS_location() {
        return s_location;
    }

    public void setS_location(String s_location) {
        this.s_location = s_location;
    }

    public String getS_id() {
        return s_id;
    }

    public void setS_id(String s_id) {
        this.s_id = s_id;
    }

    public String getS_sex() {
        return s_sex;
    }

    public void setS_sex(String s_sex) {
        this.s_sex = s_sex;
    }

    public String getLogname() {
        return logname;
    }

    public void setLogname(String logname) {
        this.logname = logname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }
    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

}
