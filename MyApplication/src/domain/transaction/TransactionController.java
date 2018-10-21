package domain.transaction;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


@WebServlet("/GetTransactionInfo")

public class TransactionController extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	private static Gson gson = new Gson();
	
	public TransactionController() {}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		TransactionDao transactionDao = new TransactionDaoImpl();
		String str = (req.getParameter("name"));
		char[] userName = str.toCharArray();
	
		Transaction transactionList = (Transaction) transactionDao.fetchTransactionsByName(userName);
		
		String transactionListString = gson.toJson(transactionList, new TypeToken<Transaction>(){}.getType());
	
		resp.setContentType("application/json");
    	resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(transactionListString);
        resp.flushBuffer();
	}
}
