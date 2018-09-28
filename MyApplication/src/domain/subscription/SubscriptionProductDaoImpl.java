package domain.subscription;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

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
	
}
