package com.ecom.app.service.customer.payment;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentConfirmParams;
import com.stripe.param.PaymentIntentCreateParams;

import jakarta.annotation.PostConstruct;

@Service
public class StripeService {

	@Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public PaymentIntent createPaymentIntent(Long amount, String currency) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency(currency)
                .build();
        return PaymentIntent.create(params);
    }

    public PaymentIntent confirmPayment(String paymentIntentId, String paymentMethodId) throws StripeException {
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        PaymentIntentConfirmParams params = PaymentIntentConfirmParams.builder()
                .setPaymentMethod(paymentMethodId)
                .build();
        return paymentIntent.confirm(params);
    }
   }
