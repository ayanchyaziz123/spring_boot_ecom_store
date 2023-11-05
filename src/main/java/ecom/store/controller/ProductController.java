package ecom.store.controller;
import ecom.store.controller.controllerAdvice.ProductNotFoundException;
import ecom.store.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ecom.store.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping("/create")
    public Product createProduct(@RequestBody Product product) {
        System.out.println("Hello world....!!!!");
        String name = product.getName();
        System.out.println("name is here -->> " + name);
        if(name.length() < 5){
             throw new ProductNotFoundException("Name length sould be more than 5 character..!");
        }
        Product saveProduct =  productService.saveProduct(product);

        return saveProduct;
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        // Check if the product with the given ID exists, and then update it
        Product existingProduct = productService.getProductById(id);
        if (existingProduct != null) {
            product.setId(id); // Ensure the ID remains the same
            return productService.saveProduct(product);
        } else {
            // Handle the case where the product does not exist
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}

