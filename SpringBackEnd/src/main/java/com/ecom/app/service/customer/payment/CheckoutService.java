package com.ecom.app.service.customer.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.app.model.Order;
import com.ecom.app.service.customer.order.OrderService;

import jakarta.transaction.Transactional;

@Service
public class CheckoutService {
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private PaymentService paymentService;

    @Transactional
    public Order processCheckout(String userId, String paymentMethodId) {
        Order order = orderService.checkout(userId);
        boolean paymentSuccessful = paymentService.processPayment(order.getId(), order.getTotalAmount(), paymentMethodId);
        
        if (paymentSuccessful) {
            orderService.updateOrderStatus(order.getId(), "PAID");
            return order;
        } else {
            orderService.updateOrderStatus(order.getId(), "PAYMENT_FAILED");
            throw new RuntimeException("Payment failed");
        }
    }

}
