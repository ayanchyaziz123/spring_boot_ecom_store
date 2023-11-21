package ecom.store.controller;

import ecom.store.config.JwtTokenProvider;
import ecom.store.model.User;
import ecom.store.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            if (user.getFirstName().length() < 3) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error creating user: First name length must be at least 3 characters.");
            }

            // Hash the password before saving the user
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);

            User createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating user: " + e.getMessage());
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody User user){
        try{
            Optional<User> optionalUser = userService.getUserByEmail(user.getEmail());
            String enteredPassword = user.getPassword();
            String storedPassword = optionalUser.get().getPassword();
            System.out.println(enteredPassword + storedPassword);

            if(passwordEncoder.matches(enteredPassword, storedPassword)){
                return ResponseEntity.status(HttpStatus.CREATED).body("Password match");
            }
            else{
                return ResponseEntity.status(HttpStatus.CREATED).body("Not");
            }
            
        }
        catch(Exception e)
        {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating user: " + e.getMessage());
        }
    }

    // Add exception handlers if needed
}
