package com.ecom.app.controller.visitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.app.model.Faq;
import com.ecom.app.service.admin.faq.FaqService;

@RestController
@RequestMapping("/api/visitor")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*" 
)
public class VisitorFaqController {

	@Autowired
	private FaqService faqService; 
	
	@GetMapping("faqs")
	private ResponseEntity<List<Faq>> getFaqs() {
		return ResponseEntity.ok(faqService.getFaqs());
	}
}
