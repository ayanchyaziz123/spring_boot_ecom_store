package ecom.store.service;

import java.util.List;

import ecom.store.model.Product;

public interface ProductService {
    public List<Product> getAllProducts(); 
    public Product getProductById(Long id);
    public Product saveProduct(Product product);
    public void deleteProduct(Long id);
}