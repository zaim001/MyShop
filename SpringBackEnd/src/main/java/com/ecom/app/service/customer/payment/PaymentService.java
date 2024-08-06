package com.ecom.app.service.customer.payment;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;




import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;



@Service
public class PaymentService {

	@Autowired
    private StripeService stripeService;

    public boolean processPayment(Long orderId, double amount, String paymentMethodId) {
        try {
            long amountInCents = (long) (amount * 100);
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(amountInCents, "usd");
            PaymentIntent confirmedIntent = stripeService.confirmPayment(paymentIntent.getId(), paymentMethodId);
            
            return "succeeded".equals(confirmedIntent.getStatus());
        } catch (StripeException e) {
            // Log the exception
            e.printStackTrace();
            return false;
        }
    }
}
