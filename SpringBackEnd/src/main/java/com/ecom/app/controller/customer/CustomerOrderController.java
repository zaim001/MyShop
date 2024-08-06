package com.ecom.app.controller.customer;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.app.service.customer.order.OrderService;
import com.ecom.app.service.customer.payment.CheckoutService;
import com.ecom.app.utils.CustomJwt;
import com.ecom.app.model.Order;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*" 
)
public class CustomerOrderController {

	  	@Autowired
	    private OrderService orderService;
	  	
	  	@Autowired
	  	private CheckoutService checkoutService;
	  	
	    private String getUserIdFromToken(CustomJwt customJwt) {
	        return customJwt.getToken().getSubject();
	    }

	    @PostMapping("checkout")
	    @PreAuthorize("hasAuthority('ROLE_customer')")
	    public ResponseEntity<Order> placeOrder(@RequestBody CheckoutRequest checkoutRequest) {
	    	var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
	        String userId = getUserIdFromToken(jwt);
	        Order order = checkoutService.processCheckout(userId, checkoutRequest.getPaymentMethodId());
	        return ResponseEntity.ok(order);
	    }
	    
	    @GetMapping("orders/history")
	    @PreAuthorize("hasAuthority('ROLE_customer')")
	    public List<Order> getOrderHistory() {
	        var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
	        String userId = getUserIdFromToken(jwt);
	        return orderService.getOrdersForUser(userId);
	    }

}
class CheckoutRequest {
    private String paymentMethodId;

    // Getter and setter
    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }
}
