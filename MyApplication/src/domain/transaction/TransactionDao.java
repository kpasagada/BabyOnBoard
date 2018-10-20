package domain.transaction;

import java.util.List;


/**
 *  @author Diksha
 * These methods are used to access and modify Transaction details from the database. 
 */

public interface TransactionDao {
	/*
	 * Retrieves transaction details from the database 
	 */
	public List<Transaction> fetchTransactionsbyName();
}
