package ecom.store.controller;
import ecom.store.config.JwtTokenProvider;
import ecom.store.model.User;
import ecom.store.service.UserService;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/create_user")
    public User createUser(@RequestBody User user)
    {
        return UserService.createUser(user);
    }
    
}
