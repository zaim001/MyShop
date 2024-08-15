package com.ecom.app.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Collection;

public class CustomJwt extends JwtAuthenticationToken {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String username;

	private String firstname;

    private String lastname;
    
    private String email;
    
    private String verified;
    

    public CustomJwt(Jwt jwt, Collection<? extends GrantedAuthority> authorities) {
        super(jwt, authorities);
    }
    
    public String getUsername() {
 		return username;
 	}


 	public void setUsername(String username) {
 		this.username = username;
 	}
    

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getVerified() {
		return verified;
	}

	public void setVerified(String verified) {
		this.verified = verified;
	}
}