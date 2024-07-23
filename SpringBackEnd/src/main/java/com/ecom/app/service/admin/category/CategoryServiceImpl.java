package com.ecom.app.service.admin.category;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ecom.app.dto.CategoryDto;
import com.ecom.app.model.Category;
import com.ecom.app.model.Faq;
import com.ecom.app.repo.CategoryRepo;

@Service

public class CategoryServiceImpl implements CategoryService {
	
	private final CategoryRepo categoryRepo;

	public CategoryServiceImpl(CategoryRepo categoryRepo) {
		super();
		this.categoryRepo = categoryRepo;
	}
	
	// admin creating category
	public Category createcategory(CategoryDto categorydto) {
		
		Category category = new Category();
		
		category.setCat_image(categorydto.getCat_image());
		category.setName(categorydto.getName());
		category.setDescription(categorydto.getDescription());
		
		
		return categoryRepo.save(category);
	}
	
	// retreiving categories
	
	public List<Category> getAllCategories(){
		return categoryRepo.findAll();
	}
	
	@Override
	public void deleteCategory(Long id) {
		categoryRepo.deleteById(id);
	}
	
	public Category updateCategory(Long id, Category catUpdate) {
	    Category existingCat = categoryRepo.findById(id).orElse(null);
	    
	    if (existingCat != null) {
	    	existingCat.setCat_image(catUpdate.getCat_image());
	    	existingCat.setName(catUpdate.getName());
	    	existingCat.setDescription(catUpdate.getDescription());
	        return categoryRepo.save(existingCat);
	    } else {
	        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found with id " + id);
	    }
	}
	
	 

}
