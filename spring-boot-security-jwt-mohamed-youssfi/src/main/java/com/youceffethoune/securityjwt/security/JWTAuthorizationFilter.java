package com.youceffethoune.securityjwt.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.dialect.function.CharIndexFunction;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterchain)
			throws ServletException, IOException {

		// ***** Access-Control-Allow-Origin CORS from ANY *
		// Le « Cross-origin resource sharing » (CORS)
		// ou « partage des ressources entre origines multiples »
		//
		// ANGULAR |------------OK --------> site A ( domain A)
		// |---------- CORS -------> site B ( Domain B ) Controlled by CORS.
		//
		// Erreur msg chrome: Failed to load http://localhost:8080/login: Response to
		// preflight request
		// doesn't pass access control check: No 'Access-Control-Allow-Origin' header is
		// present on the requested resource. Origin 'http://localhost:4200' is
		// therefore not allowed access.
		response.addHeader("Access-Control-Allow-Origin", "*");

		
		// ***** Access-Control-Allow-Headers
		// Erreur msg chrome: Failed to load http://localhost:8080/login: Request header
		// field Content-Type is
		// not allowed by Access-Control-Allow-Headers in preflight response.
		response.addHeader("Access-Control-Allow-Headers", "Origin," + " Accept," + " X-Requested-With,"
				+ " Content-Type," + " Access-Control-Request-Method," + " Access-Control-Request-Headers,"
				// + " Access-Control-Expose-Headers,"
				+ " Authorization"
		// + " Observe"

		// + " X-auth-token"
		);

		// Erreur msg chrome: ERROR TypeError: Cannot read property 'headers' of null
		// core.js:1673
		response.addHeader("Access-Control-Expose-Headers",
				"Access-Control-Allow-Origin," + " Access-Control-Allow-Credentials," + " Authorization");

		// response.addHeader("Access-Control-Allow-Methods", "POST, GET, UPDATE,
		// OPTIONS, DELETE");

		// response.setHeader("Access-Control-Max-Age", "86400"); // 24 Hours


		if (request.getMethod().equals("OPTIONS")) {
			response.setStatus(HttpServletResponse.SC_OK);
		} else {

			System.out.println("getMethod(): " + request.getMethod());
			System.out.println("getContentType(): " + request.getContentType());
			System.out.println("Cache-Control : " + request.getHeader("Cache-Control"));
			String jwt = request.getHeader("Authorization");
			/*
			 * { "sub": "admin", "exp": 1534793187, "roles": [ { "authority": "ADMIN" }, {
			 * "authority": "USER" } ] }
			 */
			System.out.println("jwt in JWTAuthorizationFilter: " + jwt);
			// If jwt is not define or not start with "bearer"
			if (jwt == null || !jwt.startsWith(SecurityConstants.TOKEN_PREFIX)) {
				// return to the spring security
				filterchain.doFilter(request, response);
				return;
			}

			// retrieve all claims JWT in payload
			Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECRET)
					// remove bearer form authorization header : "Bearer eyJhbGciOiJIUzUxxxx"
					// to keep only jwt token
					.parseClaimsJws(jwt.replace(SecurityConstants.TOKEN_PREFIX, "")).getBody();

			// retrieve claim "sub" ties with subject
			String username = claims.getSubject();

			// do cast with (ArrayList<Map<String,String>>)
			ArrayList<Map<String, String>> roles = (ArrayList<Map<String, String>>) claims.get("roles");

			// contains Collection of role's user.
			Collection<GrantedAuthority> authorities = new ArrayList<>();
			roles.forEach(r -> {
				authorities.add(new SimpleGrantedAuthority(r.get("authority")));
			});

			// here is not really importante password since it was aleardy get before in the
			// first filter jwt. We can
			// add it or not in this UsernamePasswordAuthenticationToken it will no affect
			// anything
			// we won't realy need it there
			UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
					username, null, authorities);

			// acces to spring security context. load connected user
			SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			filterchain.doFilter(request, response);
		}
	}

}
