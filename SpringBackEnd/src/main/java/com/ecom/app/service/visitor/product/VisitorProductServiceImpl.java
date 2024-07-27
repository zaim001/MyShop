package com.ecom.app.service.visitor.product;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.app.dto.ProductDto;
import com.ecom.app.model.Product;
import com.ecom.app.repo.ProductRepo;

@Service
public class VisitorProductServiceImpl implements VisitorProductService{
	
	@Autowired
	private ProductRepo productRepo;
	
	  public List<ProductDto> getAllProducts() {
	        List<Product> products = productRepo.findAll();
	        return products.stream().map(this::convertToDto).collect(Collectors.toList());
	    }
	  public ProductDto getProductById(Long id) {
	        Product product = productRepo.findById(id)
	            .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + id));
	        return convertToDto(product);
	    }
	  private ProductDto convertToDto(Product product) {
	        ProductDto dto = new ProductDto();
	        dto.setId(product.getId());
	        dto.setName(product.getName());
	        dto.setDescription(product.getDescription());
	        dto.setPrice(product.getPrice());
	        dto.setRating(product.getRating());
	        dto.setProduct_image(product.getProduct_image());
	        dto.setCategoryId(product.getCategory().getId());
	        dto.setCategoryName(product.getCategory().getName());
	        return dto;
	    }
}
