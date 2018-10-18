package domain.subscription;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import db.DbManager;

public class SubscriptionProductDaoImpl implements SubscriptionProductDao{

	static Connection conn;
	static PreparedStatement ps;
	DbManager db = new DbManager();
	
	@Override
	public List<Subscription> fetchPredefinedSubscriptions() {
		
		List<Subscription> predefinedSubscriptions = new ArrayList<Subscription>();
		
		try{
			conn = db.getConnection();
			ps = conn.prepareStatement("SELECT s.id, s.name, s.age_group, spm.quantity, p.id, p.name, p.brand, p.category, p.quantity, p.price FROM subscription s JOIN subscription_product_mapping spm ON s.id = spm.subscription_id JOIN product p ON p.id = spm.product_id WHERE s.created_by=1 ORDER BY s.id ASC");
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				int currentSubscriptionId = rs.getInt(1);
				
				Subscription subscription = new Subscription();
				subscription.setId(currentSubscriptionId);
				subscription.setName(rs.getString(2));
				subscription.setAgeGroup(rs.getInt(3));
				
				List<Product> productLists = new ArrayList<Product>();
				
				Product p = new Product();
				p.setId(rs.getInt(5));
				p.setName(rs.getString(6));
				p.setBrand(rs.getString(7));
				p.setCategory(rs.getString(8));
				p.setQuantity(rs.getString(9));
				p.setAmount(rs.getInt(4));
				p.setPrice(rs.getDouble(10));
				productLists.add(p);
				
				while(rs.next()) {
					if(currentSubscriptionId == rs.getInt(1)) {
						Product product = new Product();
						product.setId(rs.getInt(5));
						product.setName(rs.getString(6));
						product.setBrand(rs.getString(7));
						product.setCategory(rs.getString(8));
						product.setQuantity(rs.getString(9));
						product.setAmount(rs.getInt(4));
						product.setPrice(rs.getDouble(10));
						productLists.add(product);
					}
					else {
						break;
					}
				}
				
				subscription.setProducts(productLists);
				predefinedSubscriptions.add(subscription);
				rs.previous();
			}
			
			conn.close();
		}catch(Exception e){
			System.out.println(e);
		}
		
		return predefinedSubscriptions;
	}

	@Override
	public Subscription getSubscriptionInfoById(int subscriptionId) {
		
		Subscription subscription = null;
		try{
			conn = db.getConnection();
			ps = conn.prepareStatement("SELECT s.id, s.name, s.age_group, spm.quantity, p.id, p.name, p.brand, p.category, p.quantity, p.price, ag.name, ag.description FROM subscription s JOIN subscription_product_mapping spm ON s.id = spm.subscription_id JOIN product p ON p.id = spm.product_id JOIN age_group ag ON ag.id = s.age_group WHERE s.id=?");
			ps.setInt(1, subscriptionId);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				subscription = new Subscription();
				subscription.setId(rs.getInt(1));
				subscription.setName(rs.getString(2));
				subscription.setAgeGroup(rs.getInt(3));
				subscription.setAgeGroupName(rs.getString(11));
				subscription.setAgeGroupDescription(rs.getString(12));
				
				List<Product> productLists = new ArrayList<Product>();
				
				Product p = new Product();
				p.setId(rs.getInt(5));
				p.setName(rs.getString(6));
				p.setBrand(rs.getString(7));
				p.setCategory(rs.getString(8));
				p.setQuantity(rs.getString(9));
				p.setAmount(rs.getInt(4));
				p.setPrice(rs.getDouble(10));
				productLists.add(p);
				
				while(rs.next()) {
					Product product = new Product();
					product.setId(rs.getInt(5));
					product.setName(rs.getString(6));
					product.setBrand(rs.getString(7));
					product.setCategory(rs.getString(8));
					product.setQuantity(rs.getString(9));
					product.setAmount(rs.getInt(4));
					product.setPrice(rs.getDouble(10));
					productLists.add(product);
				}
				
				subscription.setProducts(productLists);
			}
			
			conn.close();
		}catch(Exception e){
			System.out.println(e);
		}
		
		return subscription;
	}

	@SuppressWarnings("deprecation")
	@Override
	public int saveCustomerSubscriptions(JsonArray subscriptionDetails) {
		
		int status = 0;
		
		for(JsonElement subDetail: subscriptionDetails) {
			JsonObject subDetailObj = subDetail.getAsJsonObject();
			
			try {
				conn = db.getConnection();
				ps = conn.prepareStatement("INSERT INTO customer_subscription_mapping (`customer_id`,`subscription_id`,`frequency`, `quantity`, `duration`, `start_date`) VALUES(?,?,?,?,?,?)");
				ps.setInt(1, subDetailObj.get("customer_id").getAsInt());
				ps.setInt(2, subDetailObj.get("subscription_id").getAsInt());
				ps.setString(3, subDetailObj.get("frequency").getAsString());
				ps.setInt(4, subDetailObj.get("quantity").getAsInt());
				ps.setInt(5, subDetailObj.get("duration").getAsInt());
				String[] date = subDetailObj.get("start_date").getAsString().split("/");
				ps.setTimestamp(6, new Timestamp(Integer.parseInt(date[2]) - 1900, Integer.parseInt(date[0]), Integer.parseInt(date[1]), 0, 0, 0, 0));
				status += ps.executeUpdate();
				conn.close();
			}catch(Exception e){
				System.out.println(e);
			}
		}
		
		return status == subscriptionDetails.size() ? 1 : 0;
	}
	
}
