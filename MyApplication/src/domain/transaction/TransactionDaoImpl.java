package domain.transaction;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import db.DbManager;
import domain.agegroup.AgeGroup;

public class TransactionDaoImpl implements TransactionDao {
	static Connection conn;
	static PreparedStatement ps;
	DbManager db = new DbManager();
	
	
	
	public List<Transaction> fetchTransactionsbyName(){

		List<Transaction> transaction = new ArrayList<Transaction>();
		
		try {
			conn = db.getConnection();
			ps = conn.prepareStatement("SELECT id from customer where user_name = ?");
			ps.setString(1, username);
			
			ResultSet rs1 = ps.executeQuery();
			int userId = rs1.getInt(1);
			
			ps =  conn.prepareStatement("SELECT t.id, t.transaction_date, s.name, t.payment_mode, t.amount, cs.status, ag.name from transaction t JOIN transaction_customer_subscription_mapping tcs ON t.id=tcs.transaction_id JOIN customer_subscription_mapping cs ON tcs.customer_subscription_id = cs.id JOIN subscription s ON cs.subscription_id = s.id JOIN age_group ag ON s.age_group = ag.id where cs.customer_id = ? GROUP BY t.id ");
			ps.setInt(1, userId);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				//getting all the values
				int transactionId = rs.getInt(1); 
				Date date = rs.getDate(2);
				String subscription_name = rs.getString(3);
				String payment_mode = rs.getString(4);
				float amount = rs.getInt(5);
				boolean status = rs.getBoolean(6);
				String ageGroup = rs.getString(7);
				
				//setting all the values into their fields
				Transaction transaction = new Transaction();
				
				transaction.setId(transactionId);
				transaction.setTransactionDate(date);
				transaction.setAmount(amount);
				transaction.setPaymentMode(payment_mode);
				
				List<Subscription> subscriptionsList = new ArrayList<Subscription>();
				
				Subscription subscription = new Subscription();
				subscription.setName(subscription_name);
				subscription.setStatus(status);
				subscription.setAgeGroupName(ageGroup);
				
				subscriptionsList.add(subscription);
				
				while(rs.next()) {
					if(transactionId == rs.getInt(1)) {
						// getting all the values
						
						//Date date = rs.getDate(2);
						String subscription_name = rs.getString(3);
						//String payment_mode = rs.getString(4);
						//float amount = rs.getInt(5);
						boolean status = rs.getBoolean(6);
						String ageGroup = rs.getString(7);
						
						//setting all the values into their respective fields
						Subscription subscription = new Subscription();
						subscription.setName(subscription_name);
						subscription.setStatus(status);
						subscription.setAgeGroupName(ageGroup);
						
						subscriptionsList.add(subscription);
						
					}
					else {
						break;
					}
					
				}
				
				transaction.setSubscriptions(subscriptionsList);
				transactionList.add(transaction);
				rs.previous();
			}
			
			conn.close();
		}catch(Exception e){
			System.out.println(e);
		}
		
		return transactionList;
	}
	
	
	@SuppressWarnings("deprecation")
	@Override
	public int createTransaction(JsonObject transactionDetails) {
		
		int generatedId = -1;
		
		try {
			conn = db.getConnection();
			ps = conn.prepareStatement("INSERT INTO transaction (`transaction_date`,`payment_mode`,`address`,`amount`,`card_name`,`card_no`,`card_expiration`,`card_cvv`) VALUES(?,?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
			String[] date = transactionDetails.get("date").getAsString().split("/");
			ps.setTimestamp(1, new Timestamp(Integer.parseInt(date[2]) - 1900, Integer.parseInt(date[0]), Integer.parseInt(date[1]), 0, 0, 0, 0));
			ps.setString(2, transactionDetails.get("payment_mode").getAsString());
			ps.setString(3, transactionDetails.get("address").getAsString());
			ps.setFloat(4, transactionDetails.get("amount").getAsFloat());
			ps.setString(5, saturate(transactionDetails, "name_on_card"));
			ps.setString(6, saturate(transactionDetails, "card_no"));
			ps.setString(7, saturateTwoMembers(transactionDetails, "exp_month", "exp_year"));
			ps.setString(8, saturate(transactionDetails, "card_cvv"));
			
			ps.executeUpdate();
			
			ResultSet rs = ps.getGeneratedKeys();
			while(rs.next()) {
				generatedId = rs.getInt(1);
			}
			
			conn.close();
		}catch(Exception e){
			System.out.println(e);
		}
		
		return generatedId;
	}

	private String saturate(JsonObject transactionDetails, String member) {
		if(transactionDetails.has(member)) {
			return transactionDetails.get(member).getAsString();
		}
		return "";
	}
	
	private String saturateTwoMembers(JsonObject transactionDetails, String member1, String member2) {
		if(transactionDetails.has(member1) && transactionDetails.has(member2)) {
			return transactionDetails.get(member1).getAsString() + "-" + transactionDetails.get(member2).getAsString();
		}
		return "";
	}

	@Override
	public int saveCustomerSubsciptionTransactions(int transactionId, ArrayList<Integer> custSubscriptionIds) {
		
		int status = 0;
		
		for(Integer custSubscriptionId: custSubscriptionIds) {
			
			try {
				conn = db.getConnection();
				ps = conn.prepareStatement("INSERT INTO transaction_customer_subscription_mapping (`transaction_id`,`customer_subscription_id`) VALUES(?,?)");
				ps.setInt(1, transactionId);
				ps.setInt(2, custSubscriptionId);
				status += ps.executeUpdate();
				
				conn.close();
			}catch(Exception e){
				System.out.println(e);
			}
			
		}
		
		return status;
	}
}
	
}
