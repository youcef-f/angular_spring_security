package com.youceffethoune.securityjwt.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class TaskToDo {
	
	@Id @GeneratedValue
	private Long id;
	private String taskName ;
	
}
