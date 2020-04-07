package com.youceffethoune.securityjwt.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youceffethoune.securityjwt.entities.TaskToDo;

public interface TaskRepository extends JpaRepository<TaskToDo, Long> {

}
