package com.ecom.app.repo;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;


import com.ecom.app.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {
	List<Order> findByUserId(String userId);
	
	
}
