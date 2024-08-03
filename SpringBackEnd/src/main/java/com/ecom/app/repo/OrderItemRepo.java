package com.ecom.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.app.model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long>{

}
