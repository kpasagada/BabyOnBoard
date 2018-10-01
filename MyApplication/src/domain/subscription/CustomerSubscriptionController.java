package domain.subscription;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonArray;

@WebServlet("/CustomerSubscriptions")
public class CustomerSubscriptionController extends HttpServlet{
	
	private static final long serialVersionUID = 1L;
	private static Gson gson = new Gson();
	
	public CustomerSubscriptionController() {}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		BufferedReader in = new BufferedReader(new InputStreamReader(req.getInputStream()));
		String inputLine;
		String data = "";
		while ((inputLine = in.readLine()) != null) {
			data += inputLine;
		}
		in.close();
		
		JsonArray customerSubDetails = gson.fromJson(data, JsonArray.class);
		
		SubscriptionProductDao subProdDao = new SubscriptionProductDaoImpl();
		int status = subProdDao.saveCustomerSubscriptions(customerSubDetails);
		
		resp.setContentType("application/json");
    	resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write("{\"status\":" + status + "}");
        resp.flushBuffer();
	}
}
