	package com.ecom.app.service.customer.cart;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.app.dto.ProductDto;
import com.ecom.app.model.Cart;
import com.ecom.app.model.Category;
import com.ecom.app.model.Product;
import com.ecom.app.repo.CartRepo;
import com.ecom.app.repo.CategoryRepo;
import com.ecom.app.repo.ProductRepo;

@Service
public class CustomerCartServiceImp implements CustomerCartService{

	   @Autowired
	    private CartRepo cartRepo;

	   @Autowired
	    private ProductRepo productRepo;
	   

	    @Override
	    public Cart getCart(String userId) {
	        return cartRepo.findByUserId(userId).orElse(new Cart());
	    }

	    @Override
	    public Cart addToCart(String userId, ProductDto productDto) {
	        Cart cart = cartRepo.findByUserId(userId)
	            .orElseGet(() -> {
	                Cart newCart = new Cart();
	                newCart.setUserId(userId);
	                newCart.setProducts(new ArrayList<>()); // Initialize the products list
	                return cartRepo.save(newCart);
	            });
	        
	        // If the cart exists but products is null, initialize it
	        if (cart.getProducts() == null) {
	            cart.setProducts(new ArrayList<>());
	        }
	        
	        // Fetch the existing product by ID
	        Product product = productRepo.findById(productDto.getId())
	            .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productDto.getId()));
	        
	        cart.getProducts().add(product);
	        product.setCart(cart);
	     
	        return cartRepo.save(cart);
	    }



	    @Override
	    public void removeFromCart(String userId, Long productId) {
	        Cart cart = cartRepo.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));
	        Product product = productRepo.findById(productId).orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));
	        
	        // Remove the product from the cart
	        cart.getProducts().removeIf(p -> p.getId().equals(productId));
	        
	        // Disassociate the product from the cart
	        product.setCart(null);
	        productRepo.save(product); // Update the product to remove the cart association
	        
	        cartRepo.save(cart); // Update the cart
	    }
	    @Override
	    public Cart updateCart(String userId, List<Product> products) {
	        Cart cart = cartRepo.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));
	        cart.setProducts(products);
	        products.forEach(product -> product.setCart(cart));
	        return cartRepo.save(cart);
	    }

		

	
}
