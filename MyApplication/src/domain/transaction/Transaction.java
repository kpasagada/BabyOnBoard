/**
 * @author Diksha
 * Getters and setters for Transaction
 *
 *`id` int NOT NULL AUTO_INCREMENT,
	`transaction_date` timestamp NOT NULL,
	`mode` char(100) NOT NULL,
	`address` char(200) NOT NULL,
	`amount` float(10,2) NOT NULL,
	`card_no` INT,
 */

package domain.transaction;

public class Transaction {
	private int id;
	private String mode;
	private String address;
	private float amount;
	private long card_no;
	//private datefield
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public float getAmount() {
		return amount;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public long getCard_no() {
		return card_no;
	}
	public void setCard_no(long card_no) {
		this.card_no = card_no;
	}

	
}
