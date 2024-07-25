package com.ecom.app.service.visitor.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.app.model.Category;

import com.ecom.app.repo.CategoryRepo;


@Service
public class VisitorCategoryServiceImpl implements VisitorCategoryService  {
	
	@Autowired
	private CategoryRepo categoryRepo;
	
	public List<Category> getAllCats(){
		return categoryRepo.findAll();
	}

}
