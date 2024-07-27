package com.ecom.app.service.customer.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.app.model.Cart;
import com.ecom.app.repo.CartRepo;

@Service
public class CustomerCartServiceImp implements CustomerCartService{

	   @Autowired
	    private CartRepo cartRepo;

	    public Cart getCart(String userId) {
	        return cartRepo.findByUserId(userId).get();
	    }
}
