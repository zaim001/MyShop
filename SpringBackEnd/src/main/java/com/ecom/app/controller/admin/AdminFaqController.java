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

import com.ecom.app.model.Faq;
import com.ecom.app.service.admin.faq.FaqService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*" 
)
public class AdminFaqController {
	
	@Autowired
	private FaqService faqService;
	
	@GetMapping("faqs")
	@PreAuthorize("hasAuthority('ROLE_admin')")
	public ResponseEntity<List<Faq>> getAllFaqs() {
		return ResponseEntity.ok(faqService.getFaqs());
	}
	
	@PostMapping("faq")
	@PreAuthorize("hasAuthority('ROLE_admin')")
	public ResponseEntity<Faq> createFaq(@RequestBody Faq faq) {
		Faq faqs = faqService.createFaq(faq);
		return ResponseEntity.status(HttpStatus.CREATED).body(faqs);
	}
	@DeleteMapping("faqs/{id}")
	@PreAuthorize("hasAuthority('ROLE_admin')")
	public ResponseEntity<Void> deleteFaq(@PathVariable Long id) {
		faqService.deleteFaqs(id);
		return ResponseEntity.noContent().build();
	}
	@PutMapping("faqs/{id}")
	@PreAuthorize("hasAuthority('ROLE_admin')")
	public ResponseEntity<Faq> updateFaq(@PathVariable Long id,@RequestBody Faq faq){
		Faq faqupdate = faqService.updateFaq(id, faq);
		return ResponseEntity.ok(faqupdate);
	}
	
	
	

}
