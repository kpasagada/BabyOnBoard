package domain.login;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import db.DbManager;



public class CustomerDaoImpl implements CustomerDao {

	static Connection conn;
	static PreparedStatement ps;
	DbManager db = new DbManager();
	
	@Override
	public int register(Customer c) {
		int status = 0;
		try{
			conn = db.getConnection();
			ps =conn.prepareStatement("INSERT INTO customer(user_name,password,full_name,email,phone) VALUES(?,?,?,?,?)");
			ps.setString(1, c.getUsername());
			ps.setString(2, c.getPassword());
			ps.setString(3, c.getFullName());
			ps.setString(4, c.getEmail());
			ps.setString(5, c.getPhone());
			status = ps.executeUpdate();
			conn.close();
		}catch(Exception e){
			System.out.println(e);
		}
		return status;
	}

	@Override
	public Customer validateCustomer(Login login) {
		Customer c = new Customer();
		try{
			conn = db.getConnection();
			ps =conn.prepareStatement("SELECT id, user_name, password, full_name, email, phone FROM customer WHERE user_name=?");
			ps.setString(1, login.getUsername());

			ResultSet rs = ps.executeQuery();
			while(rs.next()){
				c.setId(rs.getInt(1));
				c.setUsername(rs.getString(2));
				c.setPassword(rs.getString(3));
				c.setFullName(rs.getString(4));
				c.setEmail(rs.getString(5));
				c.setPhone(rs.getString(6));
			}
			conn.close();
		}catch(Exception e){
			System.out.println(e);
		}
		return c;
	}

}
