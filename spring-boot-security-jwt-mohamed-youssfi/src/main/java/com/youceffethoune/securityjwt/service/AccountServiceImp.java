package com.youceffethoune.securityjwt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.youceffethoune.securityjwt.dao.RoleRepository;
import com.youceffethoune.securityjwt.dao.UserRepository;
import com.youceffethoune.securityjwt.entities.AppRole;
import com.youceffethoune.securityjwt.entities.AppUser;

@Service
@Transactional
public class AccountServiceImp implements AccountService {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;

	
	@Override
	public AppUser saveUser(AppUser user) {
		String hashPW = bCryptPasswordEncoder.encode(user.getPassword());
		user.setPassword(hashPW);
		return userRepository.save(user);
	}

	@Override
	public AppRole saveRole(AppRole role) {

		return roleRepository.save(role);
	}


	public void addRoleToUser(String username, String roleName) {

		AppRole role = roleRepository.findByRoleName(roleName);
		AppUser user = userRepository.findByUsername(username);
		user.getRoles().add(role);

	}

	@Override
	public AppUser findUserByUsername(String username) {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(username);
		
	}


}
