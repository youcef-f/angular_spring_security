package com.youceffethoune.securityjwt.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.youceffethoune.securityjwt.dao.TaskRepository;

import com.youceffethoune.securityjwt.entities.TaskToDo;

@RestController
public class TestRestController {
	
	
	@Autowired
	private TaskRepository taskRepository;

	@GetMapping("/tasks")
	public List<TaskToDo>  listTasks() {
		return taskRepository.findAll();
	}
	
	@PostMapping("/tasks")
	public TaskToDo save(@RequestBody TaskToDo t) {
		return taskRepository.save(t);
	}
	
}
