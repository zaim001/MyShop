package com.ecom.app.service.customer.cart;


import java.util.List;

import com.ecom.app.dto.ProductDto;
import com.ecom.app.model.Cart;
import com.ecom.app.model.Product;

public interface CustomerCartService {

	Cart getCart(String userId);
	void removeFromCart(String userId, Long productId);
	Cart addToCart(String userId, ProductDto productDto);
	Cart updateCart(String userId, List<Product> products);
}
