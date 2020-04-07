package com.youceffethoune.securityjwt.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youceffethoune.securityjwt.entities.AppRole;

public interface RoleRepository extends JpaRepository<AppRole, Long> {
   public AppRole findByRoleName ( String rolename);
}
