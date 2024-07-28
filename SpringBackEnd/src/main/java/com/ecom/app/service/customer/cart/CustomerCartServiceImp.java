package com.ecom.app.service.customer.cart;

import java.util.List;

import org.apache.el.stream.Optional;
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
	   
	   @Autowired
	    private CategoryRepo categoryRepo;
	   
	

	    @Override
	    public Cart getCart(String userId) {
	        return cartRepo.findByUserId(userId).orElse(new Cart());
	    }

	    @Override
	    public Cart addToCart(String userId, ProductDto productDto) {
	        Cart cart = cartRepo.findByUserId(userId).orElseGet(() -> {
	            Cart newCart = new Cart();
	            newCart.setUserId(userId);
	            return cartRepo.save(newCart);
	        });

	        
	        Product product = convertToProduct(productDto);

	      
	        product.setCart(cart);

	      
	        cart.getProducts().add(product);

	      
	        productRepo.save(product);

	        
	        return cartRepo.save(cart);
	    }

	    private Product convertToProduct(ProductDto productDto) {
	        Product product = new Product();
	        product.setName(productDto.getName());
	        product.setDescription(productDto.getDescription());
	        product.setPrice(productDto.getPrice());
	        product.setRating(productDto.getRating());
	        product.setProduct_image(productDto.getProduct_image());

	        // Fetch or create the category
	        Category category = categoryRepo.findById(productDto.getCategoryId()).orElseGet(() -> {
	            Category newCategory = new Category();
	            newCategory.setId(productDto.getCategoryId());
	            newCategory.setName(productDto.getCategoryName());
	            return categoryRepo.save(newCategory);
	        });

	        // Set the category to the product
	        product.setCategory(category);

	        return product;
	    }

	    @Override
	    public void removeFromCart(String userId, Long productId) {
	        Cart cart = cartRepo.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));
	        cart.getProducts().removeIf(product -> product.getId().equals(productId));
	        cartRepo.save(cart);
	        productRepo.deleteById(productId);
	    }

	    @Override
	    public Cart updateCart(String userId, List<Product> products) {
	        Cart cart = cartRepo.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));
	        cart.setProducts(products);
	        products.forEach(product -> product.setCart(cart));
	        return cartRepo.save(cart);
	    }

		

	
}
