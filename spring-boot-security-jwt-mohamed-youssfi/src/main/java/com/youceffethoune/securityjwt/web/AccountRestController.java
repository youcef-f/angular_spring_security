package com.youceffethoune.securityjwt.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.youceffethoune.securityjwt.entities.AppUser;
import com.youceffethoune.securityjwt.service.AccountService;

@RestController
public class AccountRestController {

	static String DEFAULT_ROLE = "USER";
	
	@Autowired
	private AccountService accountService;

	// pas utilser
	@PostMapping("/registerNotUsed")
	public AppUser register(@RequestBody AppUser appUser) {
		return accountService.saveUser(appUser);
	}

	// cette method est uniquement pour le register form.
	@PostMapping("/register")
	public AppUser register(@RequestBody RegisterForm registerUserFrom) {

		// check if password is confirmed
		if (!registerUserFrom.getPassword().equals(registerUserFrom.getPasswordConfirm()))
			throw new RuntimeException("You must confirm your password");

		
	   // check if user does not aleardy exist in database	
		AppUser userInDataBase = accountService.findUserByUsername(registerUserFrom.getUsername());
		if (userInDataBase != null)
			throw new RuntimeException("User already exist");

		// then add user in database
		AppUser appUser = new AppUser();
		appUser.setUsername(registerUserFrom.getUsername());
		appUser.setPassword(registerUserFrom.getPassword());
		
		// Ajouter un role par defaut
		accountService.saveUser(appUser);
		
		//  lui associé un role par defaut "USER"
		accountService.addRoleToUser(registerUserFrom.getUsername(), DEFAULT_ROLE);

		
		return appUser ; 
	}

}
