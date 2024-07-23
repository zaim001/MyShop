package com.ecom.app.service.admin.faq;

import java.util.List;

import com.ecom.app.model.Faq;

public interface FaqService{
	
	List<Faq> getFaqs();
	Faq createFaq(Faq faq);
	void deleteFaqs(Long id);
	Faq updateFaq(Long id,Faq faqupdate);
	

}
