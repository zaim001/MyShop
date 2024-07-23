package com.ecom.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom.app.model.Faq;

@Repository
public interface FaqRepo extends JpaRepository<Faq, Long>{

}
