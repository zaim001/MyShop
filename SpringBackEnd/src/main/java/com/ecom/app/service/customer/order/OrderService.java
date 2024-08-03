package com.ecom.app.service.customer.order;

import java.util.List;

import com.ecom.app.model.Order;

public interface OrderService {

	Order checkout(String userId);
	List<Order> getOrdersForUser(String userId);
}
