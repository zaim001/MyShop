package com.ecom.app.service.customer.cart;

import com.ecom.app.model.Cart;

public interface CustomerCartService {

	Cart getCart(String userId);
}
