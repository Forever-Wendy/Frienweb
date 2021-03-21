package com.example.bighomework.demo.service;

import com.example.bighomework.demo.dao.UserRepository;
import com.example.bighomework.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<User> findAllUserByPage(Integer page) {
        if (page==null)  page=1;		//第一次访问findAllStudentByPage方法时
        int size=4;			//每页显示四条
        Page<User> pageData =userRepository.findAll(PageRequest.of(page-1, size));
        return pageData;
    }

}
