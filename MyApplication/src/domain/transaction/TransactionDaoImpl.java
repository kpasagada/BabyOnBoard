package domain.transaction;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import db.DbManager;
import domain.agegroup.AgeGroup;

public class TransactionDaoImpl implements TransactionDao {
	static Connection conn;
	static PreparedStatement ps;
	DbManager db = new DbManager();
	
	public List<Transaction> fetchTransactions(){
		
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
}
