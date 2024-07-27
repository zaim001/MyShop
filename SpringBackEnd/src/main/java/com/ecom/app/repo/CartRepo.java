package com.ecom.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.app.model.Cart;

public interface CartRepo extends JpaRepository<Cart, Long> {
	Optional<Cart> findByUserId(String userId);
}
