package com.youceffethoune.securityjwt.security;

public class SecurityConstants {

	public static final String SECRET = "youceffetounesecret";  // secret
	public static final long EXPIRATION_TIME = 864_000_000; // 10 jours
	public static final String TOKEN_PREFIX = "Bearer ";  // mettre un espace
	public static final String HEADER_STRING = "Authorization"; 
}
