package com.youceffethoune.securityjwt.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private UserDetailsService userDetailsService;

	// methode qui permet de dire à spring comment trouver les utilisateurs et les
	// roles
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);

		/*
		 * ou auth.inMemoryAuthentication().
		 * withUser("admin").password("{noop}1234").roles("ADMIN", "USER").and().
		 * withUser("user").password("{noop}1234").roles("USER");
		 */

		/*
		 * ou auth.jdbcAuthentication()...
		 */

	}

	// Definir les droits d'acces et d'ajouter des filtre ou non
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		/*
		 * *************************************************************
		 * 
		 * authenificatinon basic avec un formulaire de login auto generé
		 *
		 * // disactivation du csrf inclus dans le formulaire login generé par spring
		 * security ( // login ) http.csrf().disable();
		 * 
		 * // formulaire par defaut fournis par spring http.formLogin();
		 * http.authorizeRequests().antMatchers("/login/**","/register/**").permitAll();
		 * http.authorizeRequests().antMatchers(HttpMethod.POST,"/tasks/**").
		 * hasAuthority("ADMIN"); http.authorizeRequests().anyRequest().authenticated();
		 * 
		 ****************************************************************/

		
		 /* *************************************************************
		 * authenfication JWT sans formulaire login autogénéré
		 */
		http.csrf().disable();
		// SessionCreationPolicy.STATELESS disactivation du mode authentication basé sur les sessions.
		// passage d'authentification par référence ( token session ) par passage d'authentification par valeur ( token JWT)
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.authorizeRequests().antMatchers("/login/**", "/register/**").permitAll();
		http.authorizeRequests().antMatchers(HttpMethod.POST, "/tasks/**").hasAuthority("ADMIN");
		http.authorizeRequests().anyRequest().authenticated();

		// filter for authentication.
		http.addFilter(new JWTAuthenticationFilter(authenticationManager()));
		// http.addFilter(new JWTAuthenticationFilter());
		// ***************************************************************/

		// filter for authorization
		http.addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
	}

}
