package com.youceffethoune.securityjwt.web;

import lombok.Data;

@Data
public class RegisterForm {

	private String username;
	private String password;
	private String passwordConfirm;
}
