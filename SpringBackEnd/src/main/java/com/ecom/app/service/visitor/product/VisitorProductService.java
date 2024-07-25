package com.ecom.app.service.visitor.product;

import java.util.List;

import com.ecom.app.dto.ProductDto;


public interface VisitorProductService {
	
	List<ProductDto> getAllProducts();
	ProductDto getProductById(Long id);

}
