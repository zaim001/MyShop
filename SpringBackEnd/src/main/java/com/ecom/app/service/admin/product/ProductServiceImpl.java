package com.ecom.app.service.admin.product;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import com.ecom.app.dto.ProductDto;
import com.ecom.app.model.Category;
import com.ecom.app.model.Product;
import com.ecom.app.repo.CategoryRepo;
import com.ecom.app.repo.ProductRepo;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductRepo productRepo;
	@Autowired
	private CategoryRepo categoryRepo;
	

	@Override
	public Product createProduct(ProductDto productdto) {
		
		Category category = categoryRepo.findById(productdto.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));;
		
		Product product = new Product();
		
		product.setName(productdto.getName());
		product.setDescription(productdto.getDescription());
		product.setPrice(productdto.getPrice());
		product.setRating(productdto.getRating());
		product.setProduct_image(productdto.getProduct_image());
		product.setCategory(category);
		
		
	
		return productRepo.save(product);
	}
	
	  public List<ProductDto> getAllProducts() {
	        List<Product> products = productRepo.findAll();
	        return products.stream().map(this::convertToDto).collect(Collectors.toList());
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
    
    @Override
    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }
    @Override
    public Product updateProduct(Long id, ProductDto productDto) {
  
        Product existingProduct = productRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Product ID cannot be null"));
      //  Category category = categoryRepo.findById(productDto.getCategoryId()).orElseThrow(() -> new IllegalArgumentException("Category ID cannot be null"));

        existingProduct.setName(productDto.getName());
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setRating(productDto.getRating());
        existingProduct.setProduct_image(productDto.getProduct_image());
    //    existingProduct.setCategory(category);

        return productRepo.save(existingProduct);
    }
    
    public List<ProductDto> findAllByNameContaining(String name){
    	List<Product> products = productRepo.findAllByNameContaining(name);
    	return products.stream().map(this::convertToDto).collect(Collectors.toList());
    	

    }
	

}
