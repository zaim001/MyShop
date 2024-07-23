package com.ecom.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom.app.model.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {

}
