package com.example.bighomework.demo.service;

import org.springframework.data.domain.Page;
import com.example.bighomework.demo.entity.User;

import java.util.List;

public interface UserService {
    Page<User> findAllUserByPage(Integer page);
}
