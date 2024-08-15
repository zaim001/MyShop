package com.ecom.app.controller.visitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.app.dto.ProductDto;
import com.ecom.app.service.visitor.product.VisitorProductService;

@RestController
@RequestMapping("/api/visitor")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*" 
)
public class VisitorProductController {

	@Autowired
	private VisitorProductService vps;
	
	@GetMapping("products")
	public ResponseEntity<List<ProductDto>> getProducts(){
		return ResponseEntity.ok(vps.getAllProducts());
	}
	@GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") Long id) {
        ProductDto productDto = vps.getProductById(id);
        return ResponseEntity.ok(productDto);
    }
    @GetMapping("search/{name}")
    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
    public ResponseEntity<List<ProductDto>> getAllProductByNam(@PathVariable String name) {
    	List<ProductDto> productsDtos = vps.findAllByNameContaining(name);
        return ResponseEntity.ok(productsDtos);
    }
	
}
