package domain.subscription;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonArray;

public interface SubscriptionProductDao {
	
	/*
	 *  Fetches predefined subscriptions along with their products and quantities
	 */
	public List<Subscription> fetchPredefinedSubscriptions();
	
	/*
	 *  Fetches each subscription information with products
	 */
	public Subscription getSubscriptionInfoById(int subscriptionId);
	
	/*
	 *  Inserts subscriptions for customers
	 */
	public ArrayList<Integer> saveCustomerSubscriptions(JsonArray subscriptionDetails);
	
	/*
	 *  Fetches all subscriptions information for a customer
	 */
	public List<Subscription> fetchActiveSubscriptions(int userId);
}
