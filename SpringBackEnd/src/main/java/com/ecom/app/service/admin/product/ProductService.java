package com.ecom.app.service.admin.product;

import java.util.List;

import com.ecom.app.dto.ProductDto;
import com.ecom.app.model.Product;

public interface ProductService {
	
	Product createProduct(ProductDto productdto);

	List<ProductDto> getAllProducts();
<<<<<<< HEAD:SpringBackEnd/src/main/java/com/ecom/app/service/admin/product/ProductService.java
	
	void deleteProduct(Long id);
	
	Product updateProduct(Long id, ProductDto productDto);
	
	List<ProductDto> findAllByNameContaining(String title);
=======
>>>>>>> 5868c527 (category mod):src/main/java/com/ecom/app/service/admin/product/ProductService.java

}
