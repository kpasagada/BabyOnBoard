package domain.subscription;

import java.util.List;

public class Subscription {
	
	private int id;
	private String name;
	private int ageGroup;
	private String ageGroupName;
	private String ageGroupDescription;
	boolean status;
	private int quantity;
	List<Product> products;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAgeGroup() {
		return ageGroup;
	}
	public void setAgeGroup(int ageGroup) {
		this.ageGroup = ageGroup;
	}
	public String getAgeGroupName() {
		return ageGroupName;
	}
	public void setAgeGroupName(String ageGroupName) {
		this.ageGroupName = ageGroupName;
	}
	public String getAgeGroupDescription() {
		return ageGroupDescription;
	}
	public void setAgeGroupDescription(String ageGroupDescription) {
		this.ageGroupDescription = ageGroupDescription;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public boolean getStatus() {
		return this.status;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}
	
	
}
