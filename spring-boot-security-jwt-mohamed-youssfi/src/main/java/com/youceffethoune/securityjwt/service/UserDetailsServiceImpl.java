package com.youceffethoune.securityjwt.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.youceffethoune.securityjwt.entities.AppUser;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private AccountService accountService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println("-----loadUserByUsername : " + username +  "--------------------");

		AppUser appUser = accountService.findUserByUsername(username);
		if (appUser == null)
		{
			System.out.println("--------------  erreur appUser n'est pas trouvé --------------------");
			throw new UsernameNotFoundException(username);
		}
		Collection<GrantedAuthority> authorities = new ArrayList<>();

		appUser.getRoles().forEach(r -> {
			authorities.add(new SimpleGrantedAuthority(r.getRoleName())); 
		});

		// user ici est un objet spring. password est tjrs encoder
		return new User(appUser.getUsername(), appUser.getPassword(), authorities);
	}

}
