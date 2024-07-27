package com.ecom.app.controller.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.app.model.Cart;
import com.ecom.app.service.customer.cart.CustomerCartService;
import com.ecom.app.utils.CustomJwt;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*" 
)
public class CustomerCartController {
	
    @Autowired
    private CustomerCartService ccs;

    private String getUserIdFromToken(CustomJwt customJwt) {
        return customJwt.getToken().getSubject();
    }
    
    @GetMapping("cart")
    @PreAuthorize("hasAuthority('ROLE_customer')")
    public ResponseEntity<Cart> getCart() {
    	var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
        String userId = getUserIdFromToken(jwt);
        return ResponseEntity.ok(ccs.getCart(userId));
    }
   

}
