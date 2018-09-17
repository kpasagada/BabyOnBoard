package domain.login;
/**
 * 
 * @author karthik
 * The methods that we need to save and retrieve customer from the database
 */
public interface CustomerDao {

	/*
	 * Register customer to the system 
	 */
	public int register(Customer c);
	
	/*
	 * Retrieve the Customer object from the database
	 */
	public Customer validateCustomer(Login login);
	
}

