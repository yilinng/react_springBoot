package com.todo.todo.repository;

import com.todo.todo.entity.Customer;

import org.junit.jupiter.api.Test;
//import org.junit.Test;
import org.junit.jupiter.api.*;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.beans.factory.annotation.Autowired;
import static org.assertj.core.api.Assertions.assertThat;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

//https://stackoverflow.com/questions/36427868/failed-to-execute-goal-org-apache-maven-pluginsmaven-surefire-plugin2-12test
//https://www.javaguides.net/2018/09/spring-data-jpa-repository-testing-using-spring-boot-datajpatest.html
//https://netbeans.apache.org/kb/docs/java/junit-intro.html
//https://www.javaguides.net/2022/03/spring-boot-unit-testing-crud-rest-api-with-junit-and-mockito.html
//https://www.baeldung.com/introduction-to-assertj
//https://www.baeldung.com/checkstyle-java
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CustomerRepositoryTest {

	@Autowired
	private CustomerRepository customerRepository;

	private Customer customer;

	@BeforeEach
	public void setup() {

		Customer customer = new Customer();
		customer.setName("test name");
		customer.setUsername("testusername");
		customer.setEmail("test2@test.com");
		customer.setPassword("test");

		customerRepository.save(customer);
		this.customer = customer;
	}

	// JUnit test for save employee operation
	// @DisplayName("JUnit test for save employee operation")
	@Test
	public void givenCustomereObject_whenSave_thenReturnSavedCustomer() {

		Customer customer = new Customer();
		customer.setName("test name1");
		customer.setUsername("testusername1");
		customer.setEmail("test1@test.com");
		customer.setPassword("test");

		// when - action or the behaviour that we are going test
		Customer savedCustomer = customerRepository.save(customer);

		// then - verify the output
		assertThat(savedCustomer).isNotNull();
		assertThat(savedCustomer.getId()).isGreaterThan(0);
	}

	/**
	 * Test of findByEmail method, of class CustomerRepository.
	 */
	@Test
	public void testFindByEmail() {
		System.out.println("findByEmail");
		String email = "test2@test.com";

		Customer result = customerRepository.findByEmail(email);
		assertThat(result).isNotNull();

		// assertThat(customer).isEqualTo(result);
		System.out.println("findByEmail result");

		System.out.println(result);

	}

	/**
	 * Test of findByUsernameOrEmail method, of class CustomerRepository.
	 */
	@Test
	public void testFindByUsernameOrEmail() {
		System.out.println("findByUsernameOrEmail");
		String username = "testusername";
		String email = "test2@test.com";

		Customer result = customerRepository.findByUsernameOrEmail(username, email);
		assertThat(result).isNotNull();
		System.out.println("check customer");
		System.out.println(this.customer);
	}

	/**
	 * Test of findByUsername method, of class CustomerRepository.
	 */
	@Test
	public void testFindByUsername() {
		System.out.println("findByUsername");
		String username = "testusername";

		Customer result = customerRepository.findByUsername(username);
		assertThat(result).isNotNull();

	}

	/**
	 * Test of existsByUsername method, of class CustomerRepository.
	 */
	@Test
	public void testExistsByUsername() {
		System.out.println("existsByUsername");
		String username = "testusername";

		Boolean result = customerRepository.existsByUsername(username);
		assertThat(result).isTrue();
	}

	/**
	 * Test of existsByEmail method, of class CustomerRepository.
	 */
	@Test
	public void testExistsByEmail() {
		System.out.println("existsByEmail");
		String email = "test2@test.com";

		Boolean result = customerRepository.existsByEmail(email);
		assertThat(result).isTrue();
	}

}
