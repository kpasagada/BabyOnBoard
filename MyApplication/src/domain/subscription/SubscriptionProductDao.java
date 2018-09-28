package domain.subscription;

import java.util.List;

public interface SubscriptionProductDao {
	
	/*
	 *  Fetches predefined subscriptions along with their products and quantities
	 */
	public List<Subscription> fetchPredefinedSubscriptions();
}
