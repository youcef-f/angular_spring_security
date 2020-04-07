package com.youceffethoune.securityjwt.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youceffethoune.securityjwt.entities.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {

	public AppUser findByUsername(String username) ;
}
