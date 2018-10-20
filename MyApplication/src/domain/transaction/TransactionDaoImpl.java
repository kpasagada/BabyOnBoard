/**
 * @author Diksha
 * Implementation for getting the transaction details from the database.
 */ 

package domain.transaction;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import domain.subscription.*;

import db.DbManager;
import domain.agegroup.AgeGroup;

public class TransactionDaoImpl implements TransactionDao {
	static Connection conn;
	static PreparedStatement ps;
	DbManager db = new DbManager();
	
	public List<Transaction> fetchTransactionsbyName(){
		
		List<Transaction> transactionList = new ArrayList<Transaction>();
		String username = "admin"; // get the username from the controller
		
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
}
