package com.example.bighomework.demo.dao;

import com.example.bighomework.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;


import java.awt.print.Pageable;
import java.util.List;


public interface UserRepository extends JpaRepository<User,String> {
    User findByLogname(String logname);
    User findByLognameAndPassword(String logname,String password);
}
