package domain.subscribe.pack.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.*;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import domain.subscription.Subscription;
import domain.subscription.SubscriptionProductDao;
import domain.subscription.SubscriptionProductDaoImpl;

import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;

public class SubscribePackageTest {
	
	private static SubscriptionProductDao subProdDao;
	private static Gson gson;
	
	@BeforeClass
	public static void setUp() {
		gson = new Gson();
		subProdDao = new SubscriptionProductDaoImpl();
	}
	
	@Test
	public void getSubscriptionSuccessTest() {
		String subscriptionIds = "2";
		List<Subscription> subscriptionDetails = subProdDao.getSubscriptionInfoById(subscriptionIds);
		assertNotNull(subscriptionDetails);
		assertTrue(subscriptionDetails.size() == 1);
		
		Subscription sub = subscriptionDetails.get(0);
		assertNotNull(sub);
		assertEquals(sub.getName(), "Premium");
		assertEquals(sub.getAgeGroup().getId(), 2);
		assertNotNull(sub.getProducts());
		assertEquals(sub.getProducts().size(), 2);
	}
	
	@Test
	public void getSubscriptionEmptyTest() {
		String subscriptionIds = "55";
		List<Subscription> subscriptionDetails = subProdDao.getSubscriptionInfoById(subscriptionIds);
		assertNotNull(subscriptionDetails);
		assertTrue(subscriptionDetails.size() == 0);
	}
	
	@Test
	public void saveCustomerSubscriptionsSuccessTest() throws MySQLIntegrityConstraintViolationException {
		String transactionData = "{\"payment_mode\":\"card\",\"date\":\"11/15/2018\",\"address\":\"777 Ape Dr, Dallas TX 75252\",\"name_on_card\":\"Greg Wash\",\"card_no\":\"3451-2221-7878-9056\",\"exp_month\":\"12\",\"exp_year\":\"2022\",\"card_cvv\":\"500\",\"amount\":220,\"subscribed_items\":[{\"customer_id\":1,\"subscription_id\":5,\"frequency\":\"bi-weekly\",\"duration\":9,\"quantity\":2,\"start_date\":\"11/15/2018\",\"total\":110}]}";
		JsonObject transactionDetails = gson.fromJson(transactionData, JsonObject.class);
		assertNotNull(transactionDetails);
		assertTrue(transactionDetails.has("subscribed_items"));
		assertTrue(transactionDetails.get("subscribed_items").isJsonArray());
		
		JsonArray customerSubDetails = transactionDetails.getAsJsonArray("subscribed_items");
		ArrayList<Integer> custSubscriptionIds = subProdDao.saveCustomerSubscriptions(customerSubDetails);
		assertNotNull(custSubscriptionIds);
		assertTrue(custSubscriptionIds.size() == customerSubDetails.size());
	}
	
	@Test(expected = MySQLIntegrityConstraintViolationException.class)
	public void saveCustomerSubscriptionsWithSubIdNotPresentTest() throws MySQLIntegrityConstraintViolationException{
		String transactionData = "{\"payment_mode\":\"card\",\"date\":\"11/15/2018\",\"address\":\"777 Ape Dr, Dallas TX 75252\",\"name_on_card\":\"Greg Wash\",\"card_no\":\"3451-2221-7878-9056\",\"exp_month\":\"12\",\"exp_year\":\"2022\",\"card_cvv\":\"500\",\"amount\":220,\"subscribed_items\":[{\"customer_id\":1,\"subscription_id\":15,\"frequency\":\"bi-weekly\",\"duration\":9,\"quantity\":2,\"start_date\":\"11/15/2018\",\"total\":110}]}";
		JsonObject transactionDetails = gson.fromJson(transactionData, JsonObject.class);
		assertTrue(transactionDetails.get("subscribed_items").isJsonArray());
		
		JsonArray customerSubDetails = transactionDetails.getAsJsonArray("subscribed_items");
		ArrayList<Integer> custSubscriptionIds = subProdDao.saveCustomerSubscriptions(customerSubDetails);
		assertNull(custSubscriptionIds);
	}
	
	@Test(expected = MySQLIntegrityConstraintViolationException.class)
	public void saveCustomerSubscriptionsWithCustomerIdNotPresentTest() throws MySQLIntegrityConstraintViolationException{
		String transactionData = "{\"payment_mode\":\"card\",\"date\":\"11/15/2018\",\"address\":\"777 Ape Dr, Dallas TX 75252\",\"name_on_card\":\"Greg Wash\",\"card_no\":\"3451-2221-7878-9056\",\"exp_month\":\"12\",\"exp_year\":\"2022\",\"card_cvv\":\"500\",\"amount\":220,\"subscribed_items\":[{\"customer_id\":999999,\"subscription_id\":5,\"frequency\":\"bi-weekly\",\"duration\":9,\"quantity\":2,\"start_date\":\"11/15/2018\",\"total\":110}]}";
		JsonObject transactionDetails = gson.fromJson(transactionData, JsonObject.class);
		assertTrue(transactionDetails.get("subscribed_items").isJsonArray());
		
		JsonArray customerSubDetails = transactionDetails.getAsJsonArray("subscribed_items");
		ArrayList<Integer> custSubscriptionIds = subProdDao.saveCustomerSubscriptions(customerSubDetails);
		assertNull(custSubscriptionIds);
	}
	
	@Test
	public void saveCustomerSubscriptionsWithEmptySubTest() throws MySQLIntegrityConstraintViolationException {
		String transactionData = "{\"payment_mode\":\"card\",\"date\":\"11/15/2018\",\"address\":\"777 Ape Dr, Dallas TX 75252\",\"name_on_card\":\"Greg Wash\",\"card_no\":\"3451-2221-7878-9056\",\"exp_month\":\"12\",\"exp_year\":\"2022\",\"card_cvv\":\"500\",\"amount\":220,\"subscribed_items\":[]}";
		JsonObject transactionDetails = gson.fromJson(transactionData, JsonObject.class);
		assertNotNull(transactionDetails);
		assertTrue(transactionDetails.has("subscribed_items"));
		assertTrue(transactionDetails.get("subscribed_items").isJsonArray());
		
		JsonArray customerSubDetails = transactionDetails.getAsJsonArray("subscribed_items");
		ArrayList<Integer> custSubscriptionIds = subProdDao.saveCustomerSubscriptions(customerSubDetails);
		assertNotNull(custSubscriptionIds);
		assertTrue(custSubscriptionIds.size() == customerSubDetails.size());
	}
	
	@AfterClass
	public static void tearDown() {
		subProdDao = null;
		gson = null;
	}
	
}
