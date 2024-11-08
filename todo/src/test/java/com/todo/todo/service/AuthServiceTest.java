package com.todo.todo.service;

import com.todo.todo.entity.Customer;
import com.todo.todo.payload.*;
import com.todo.todo.repository.CustomerRepository;

import java.util.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.junit.jupiter.api.DisplayName;

//https://www.baeldung.com/spring-security-integration-tests
//https://www.javaguides.net/2022/03/spring-boot-unit-testing-service-layer.html
@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    private Customer customer;

    @BeforeEach
    public void setup() {

        customer = new Customer();
        customer.setName("test name");
        customer.setUsername("testusername");
        customer.setEmail("test2@test.com");
        customer.setPassword("test");

        // customerRepository.save(customer);
        // this.customer = customer;
    }

    /**
     * Test of login method, of class AuthService.
     */
    @DisplayName("JUnit test for testLogin method")
    @Test
    public void testLogin() {
        /*
         * System.out.println("login");
         * LoginDto loginDto = null;
         * AuthService instance = new AuthServiceImpl();
         * Map<String, String> expResult = null;
         * Map<String, String> result = instance.login(loginDto);
         * assertEquals(expResult, result);
         * // TODO review the generated test code and remove the default call to fail.
         * fail("The test case is a prototype.");
         */
    }

    /**
     * Test of register method, of class AuthService.
     */
    @Test
    public void testRegister() {
        System.out.println("register");
        SignUpDto signupDto = null;
        AuthService instance = new AuthServiceImpl();
        String expResult = "";
        String result = instance.register(signupDto);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of logout method, of class AuthService.
     */
    @Test
    public void testLogout() {
        System.out.println("logout");
        AccessTokenDto accessToken = null;
        AuthService instance = new AuthServiceImpl();
        String expResult = "";
        String result = instance.logout(accessToken);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of GetRefreshtoken method, of class AuthService.
     */
    @Test
    public void testGetRefreshtoken() {
        System.out.println("GetRefreshtoken");
        AccessTokenDto accessToken = null;
        AuthService instance = new AuthServiceImpl();
        HashMap<String, String> expResult = null;
        HashMap<String, String> result = instance.GetRefreshtoken(accessToken);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of generateCookie method, of class AuthService.
     */
    @Test
    public void testGenerateCookie() {
        System.out.println("generateCookie");
        String user_id = "";
        AuthService instance = new AuthServiceImpl();
        Cookie expResult = null;
        Cookie result = instance.generateCookie(user_id);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of readServletCookie method, of class AuthService.
     */
    @Test
    public void testReadServletCookie() {
        System.out.println("readServletCookie");
        HttpServletRequest request = null;
        String name = "";
        AuthService instance = new AuthServiceImpl();
        Optional<String> expResult = null;
        Optional<String> result = instance.readServletCookie(request, name);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getUser method, of class AuthService.
     */
    @Test
    public void testGetUser() {
        System.out.println("getUser");
        String usernameOrEmail = "";
        AuthService instance = new AuthServiceImpl();
        HashMap<String, String> expResult = null;
        HashMap<String, Object> result = instance.getUser(usernameOrEmail);
        assertEquals(expResult, result);

        fail("The test case is a prototype.");
    }

    /**
     * Test of findAllEmail method, of class AuthService.
     */
    @Test
    public void testFindAllEmail() {
        System.out.println("findAllEmail");
        AuthService instance = new AuthServiceImpl();
        HashMap<String, List<String>> expResult = null;
        HashMap<String, List<String>> result = instance.findAllEmail();
        assertEquals(expResult, result);

        fail("The test case is a prototype.");
    }

    public class AuthServiceImpl implements AuthService {

        public Map<String, String> login(LoginDto loginDto) {
            return null;
        }

        public String register(SignUpDto signupDto) {
            return "";
        }

        public String logout(AccessTokenDto accessToken) {
            return "";
        }

        public HashMap<String, String> GetRefreshtoken(AccessTokenDto accessToken) {
            return null;
        }

        public Cookie generateCookie(String user_id) {
            return null;
        }

        public Optional<String> readServletCookie(HttpServletRequest request, String name) {
            return null;
        }

        public HashMap<String, Object> getUser(String usernameOrEmail) {
            return null;
        }

        public HashMap<String, List<String>> findAllEmail() {
            return null;
        }
    }

}
