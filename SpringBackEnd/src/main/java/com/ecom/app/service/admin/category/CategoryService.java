package com.ecom.app.service.admin.category;

import java.util.List;

import com.ecom.app.dto.CategoryDto;
import com.ecom.app.model.Category;

public interface CategoryService {
	
	Category createcategory(CategoryDto categorydto);
	List<Category> getAllCategories();
	void deleteCategory(Long id);
	Category updateCategory(Long id, Category catUpdate);

}
