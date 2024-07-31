package com.ecom.app.controller.customer;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.app.utils.CustomJwt;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*" 
)
public class CustomerProfileController {
	
	@GetMapping("profile")
	@PreAuthorize("hasAuthority('ROLE_customer')")
	public ResponseEntity<List<String>> getProfile(){
		var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
	    List<String> infos = Arrays.asList(jwt.getUsername(),jwt.getFirstname(), jwt.getLastname(),jwt.getEmail(),jwt.getVerified());
	    return ResponseEntity.ok(infos);
	}
	

}
