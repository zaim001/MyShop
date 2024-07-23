package com.ecom.app.repo;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;


import com.ecom.app.model.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {
	
	List<Product> findAllByNameContaining(String title);

}
