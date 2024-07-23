package com.ecom.app.service.admin.faq;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ecom.app.model.Faq;
import com.ecom.app.repo.FaqRepo;


@Service
public class FaqServiceImpl implements FaqService {
	
	@Autowired
	 private FaqRepo faqRepo;
	 
	 
		public FaqServiceImpl(FaqRepo faqRepo) {
		super();
		this.faqRepo = faqRepo;
	}

		public Faq createFaq(Faq faq) {
			return faqRepo.save(faq);
		}
		
		public List<Faq> getFaqs() {
			return faqRepo.findAll();
		}
		
		public void deleteFaqs(Long id) {
			faqRepo.deleteById(id);
		}
		public Faq updateFaq(Long id, Faq faqUpdate) {
		    Faq existingFaq = faqRepo.findById(id).orElse(null);
		    
		    if (existingFaq != null) {
		        existingFaq.setQuestion(faqUpdate.getQuestion());
		        existingFaq.setAnswer(faqUpdate.getAnswer());
		        return faqRepo.save(existingFaq);
		    } else {
		        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Faq not found with id " + id);
		    }
		}
		
}
