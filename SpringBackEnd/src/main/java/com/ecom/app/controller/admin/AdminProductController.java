package com.ecom.app.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.app.dto.ProductDto;

import com.ecom.app.model.Product;
import com.ecom.app.service.admin.product.ProductService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*" 
)
public class AdminProductController {
	
	@Autowired
	private ProductService productService;
	
	
    @PostMapping("/product")
    @PreAuthorize("hasAuthority('ROLE_admin')")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
        Product product = productService.createProduct(productDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    @GetMapping("/products")
    @PreAuthorize("hasAuthority('ROLE_admin')")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
    
    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasAuthority('ROLE_admin')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("products/{id}")
    @PreAuthorize("hasAuthority('ROLE_admin')")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        Product updatedProduct = productService.updateProduct(id, productDto);
        return ResponseEntity.ok(updatedProduct);
    }

    
}
