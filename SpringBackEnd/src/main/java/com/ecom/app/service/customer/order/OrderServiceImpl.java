package com.ecom.app.service.customer.order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.app.model.Cart;
import com.ecom.app.model.Order;
import com.ecom.app.model.OrderItem;
import com.ecom.app.model.Product;
import com.ecom.app.repo.CartRepo;
import com.ecom.app.repo.OrderRepo;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

	    @Autowired
	    private OrderRepo orderRepo;

	    @Autowired
	    private CartRepo cartRepo;

	    @Transactional
	    public Order checkout(String userId) {
	    	 Cart cart = cartRepo.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));

	         Order order = new Order();
	         order.setUserId(userId);
	         order.setOrderDate(LocalDateTime.now());
	         order.setStatus("PLACED");
	         ;

	         double totalPrice = cart.getProducts().stream().mapToDouble(Product::getPrice).sum();
	         order.setTotalAmount(totalPrice);

	         List<OrderItem> orderItems = cart.getProducts().stream().map(product -> {
	             OrderItem orderItem = new OrderItem();
	             orderItem.setOrder(order);
	             orderItem.setProduct(product);
	             orderItem.setQuantity(1); // Assuming quantity is 1 for simplicity
	             return orderItem;
	         }).collect(Collectors.toList());

	         order.setOrderItems(orderItems);
	         
	         orderRepo.save(order);

	         // Clear the cart after checkout
	         cart.getProducts().clear();
	         cartRepo.save(cart);
	         return order;
	}

	    public List<Order> getOrdersForUser(String userId) {
	        return orderRepo.findByUserId(userId);
	    }
	    
	    public void updateOrderStatus(Long orderId, String status) {
	       Order order = orderRepo.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
	        order.setStatus(status);
	        orderRepo.save(order);
	    }
}
