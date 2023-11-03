package ecom.store.repository;

import ecom.store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Product, Long> {
}
