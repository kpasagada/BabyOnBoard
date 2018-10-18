package domain.subscription;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@WebServlet("/GetSubscriptionInfo")
public class SubscriptionDetailsController extends HttpServlet{
	
	private static final long serialVersionUID = 1L;
	private static Gson gson = new Gson();
	
	public SubscriptionDetailsController() {}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		SubscriptionProductDao subProdDao = new SubscriptionProductDaoImpl();
		int subscriptionId = Integer.parseInt(req.getParameter("subscription"));
		Subscription subscriptionDetails = subProdDao.getSubscriptionInfoById(subscriptionId);
		
		String subscriptionDetailsString = gson.toJson(subscriptionDetails, new TypeToken<Subscription>(){}.getType());
		
		resp.setContentType("application/json");
    	resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(subscriptionDetailsString);
        resp.flushBuffer();
	}
}
