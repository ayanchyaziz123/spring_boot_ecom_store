package ecom.store.controller;

import ecom.store.config.JwtTokenProvider;
import ecom.store.config.mail.EmailService;
import ecom.store.model.User;
import ecom.store.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*") // Replace with the origin of your frontend
public class UserController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private EmailService emailService;

    @Autowired
    public UserController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }


    public String sendEmail(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String text) {

        try {
            emailService.sendSimpleEmail(to, subject, text);
            return "Email sent successfully!";
        } catch (MailException e) {
            // Log the exception or handle it as needed
            return "Failed to send email. Error: " + e.getMessage();
        }
    }

    public Optional<User> getOptionalUserData(String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyURL(@RequestParam("token") String token)
    {
        try{
            String userEmail = jwtTokenProvider.getEmailFromToken(token);
            Optional<User> user = getOptionalUserData(userEmail);
            if(user == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token is not valid");
            }
            User newUser = user.get();
            newUser.setIsVerified(true);
            Map<String, Object> responseBody = new HashMap<String, Object>();
            responseBody.put("user", newUser);
            responseBody.put("token", token);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody String email){
        Optional<User> optionalUser = userService.getUserByEmail(email);
        if(optionalUser.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email was not matched..!");
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Email matched..!");
    }

    @GetMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody User user){
        Optional<User> optionalUser = userService.getUserByEmail(user.getEmail());
        String enterdPassword = user.getPassword();
        String storedPassword = optionalUser.get().getPassword();
        if(enterdPassword != storedPassword){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords are not matched..!");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Password matched");
    }

    @PostMapping(value="/create", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createUser(@RequestBody User user) {
        System.out.println("hello world");
        try {
            if (user.getFirstName().length() < 3) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error creating user: First name length must be at least 3 characters.");
            }
            Optional<User> existingUser = userService.getUserByEmail(user.getEmail());
            if(!existingUser.isEmpty()){
               return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error creating user: Email already existed"); 
            }

            // Hash the password before saving the user
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            User createUser = userService.createUser(user);
            String token = jwtTokenProvider.generateToken(user.getEmail());
            String baseURL = "http://localhost:8080"; // Update this with your actual base URL
            // Create the verification URL by appending the token
            String verificationURL = baseURL + "/user/verify?token=" + token;
            String emailSent = sendEmail(user.getEmail(), "Email for verification", verificationURL);
            return ResponseEntity.status(HttpStatus.CREATED).body("Email was sent..!");
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
                System.out.print("Matched..!");
                String token = jwtTokenProvider.generateToken(user.getEmail());
                System.out.println("Token " + token);
                return ResponseEntity.status(HttpStatus.CREATED).body(token);
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
}
