package com.ecom.app.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.app.dto.CategoryDto;
import com.ecom.app.model.Category;
import com.ecom.app.model.Faq;
import com.ecom.app.service.admin.category.CategoryService;
import com.ecom.app.utils.CustomJwt;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*" 
)
public class AdminCategoryController {
	@Autowired
	private CategoryService categoryservice;
	 
	    @PostMapping("category")
	    @PreAuthorize("hasAuthority('ROLE_admin')")
	   	public ResponseEntity<Category> createCategory(@RequestBody CategoryDto categorydto){
	    	// var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
	   		Category category = categoryservice.createcategory(categorydto);
	   		return ResponseEntity.status(HttpStatus.CREATED).body(category);
	   	}
	    
	    @GetMapping("cats")
	    @PreAuthorize("hasAuthority('ROLE_admin')")
	   	public ResponseEntity<List<Category>> getAllCategories(){
	   		return ResponseEntity.ok(categoryservice.getAllCategories());
	   	}
	    
	    @DeleteMapping("cats/{id}")
	    @PreAuthorize("hasAuthority('ROLE_admin')")
	    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
	        categoryservice.deleteCategory(id);
	        return ResponseEntity.noContent().build();
	    }
		 @PutMapping("cats/{id}")
		 @PreAuthorize("hasAuthority('ROLE_admin')")
		    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category cat) {
		        Category updatedCat = categoryservice.updateCategory(id, cat);
		        return ResponseEntity.ok(updatedCat);
		    }

}
