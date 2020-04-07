package com.youceffethoune.securityjwt.security;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youceffethoune.securityjwt.entities.AppUser;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	// @Autowired
	private AuthenticationManager authenticationManager;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		super();
		this.authenticationManager = authenticationManager;
	}

	public JWTAuthenticationFilter() {

	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {

		// =============================================================================		
		// =============================================================================
		// ===================== dans le cas d'un envoi du username/password en Json

		AppUser appUser = null;

		try {

			// juste pour info. Il est préférable de cree un methode de Bean de ObjectMapper
			// pour eviter une instanciation à chaque appelle.
			// readValue lit le compte renvoyer par request.getInputStream et le déséralize
			// dans AppUser.class
			appUser = new ObjectMapper().readValue(request.getInputStream(), AppUser.class);

		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}

		System.out.println("*******************************");
		System.out.println("JWTAuthenticationFilter username: " + appUser.getUsername());
		System.out.println("JWTAuthenticationFilter password: " + appUser.getPassword());

		return authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword()));


		// =============================================================================		
		// =============================================================================
		// ===================== dans le cas d'un envoi du username/password en
		// x-www-from-urlencoded

		/*
		 * // dans le cas ou les données sont envoyés en wwwurlencoded String username
		 * =""; String password = "";
		 * 
		 * try {
		 * 
		 * username = request.getParameter("username"); password =
		 * request.getParameter("password");
		 * 
		 * System.out.println(""); System.out.println("username: " + username);
		 * System.out.println("password: " + password);
		 * 
		 * 
		 * } catch (Exception e) { throw new RuntimeException(e); }
		 * 
		 * 
		 * return authenticationManager .authenticate(new
		 * UsernamePasswordAuthenticationToken(username,password));
		 * 
		 */

	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		User springuser = (User) authResult.getPrincipal();
		
		String jwt = Jwts.builder()
				
				////// PAYLOAD  ///////////////
				// claim = revendication : "sub"
				.setSubject(springuser.getUsername())
				// claim "exp"
				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET)
				// costum own claims. Il y a deseralisation automatique.
				.claim("roles", springuser.getAuthorities())
				.compact();
				response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + jwt);
				//response.addHeader(SecurityConstants.HEADER_STRING,  jwt);


		
	}
}
