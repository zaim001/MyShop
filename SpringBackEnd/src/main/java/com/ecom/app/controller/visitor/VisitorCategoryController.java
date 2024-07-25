package com.ecom.app.controller.visitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.app.model.Category;

import com.ecom.app.service.visitor.category.VisitorCategoryService;


@RestController
@RequestMapping("/api/visitor")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*" 
)
public class VisitorCategoryController {
	
	@Autowired
	private VisitorCategoryService vcs;
	
	@GetMapping("categories")
	public ResponseEntity<List<Category>> getCategories(){
		return ResponseEntity.ok(vcs.getAllCats());
	}

}
