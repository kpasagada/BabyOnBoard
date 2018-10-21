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
	
	public List<Transaction> fetchTransactionsByName(char[] userName){
		
		List<Transaction> transaction = new ArrayList<Transaction>();
		
		try {
			conn = db.getConnection();
			ps = conn.prepareStatement("SELECT ");
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				
			}
			
			conn.close();
		}catch(Exception e){
			System.out.println(e);
		}
		
		return transaction;
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
