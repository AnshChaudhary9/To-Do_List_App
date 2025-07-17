package com.springProject.toDoListApp.controller;

import com.springProject.toDoListApp.service.JWTService; // ADD THIS IMPORT
import com.springProject.toDoListApp.entity.User;
import com.springProject.toDoListApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "http://localhost:3000")
public class PublicController {

    @Autowired
    private UserService userService;

    // @Autowired
    // private JwtUtil jwtUtil; // REMOVE THIS LINE

    @Autowired
    private JWTService jwtService; // ADD THIS LINE

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping
    public void createUser(@RequestBody User user){
        userService.saveNewUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        User user = userService.findByUserName(loginRequest.getUserName());

        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Use JWTService to generate the token
            // You'll need to create a UserDetails object for the generateToken method
            // Or modify JWTService.generateToken to accept a username directly if you prefer
            // For now, let's assume you can get UserDetails from userService or create a simple one
            // A better approach would be to pass the UserDetails object from UserDetailsServiceImpl
            // For simplicity, let's adapt JWTService.generateToken to accept a String username
            // (or ensure you have a UserDetails object available here)

            // Option 1: Adapt JWTService.generateToken to accept String username (less ideal for Spring Security context)
            // String jwt = jwtService.generateToken(user.getUserName());

            // Option 2: Create a simple UserDetails object (better)
            org.springframework.security.core.userdetails.User userDetails =
                    new org.springframework.security.core.userdetails.User(
                            user.getUserName(),
                            user.getPassword(), // Password is not used for token generation, but required by UserDetails constructor
                            user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role)).collect(Collectors.toList()) // Assuming SimpleGrantedAuthority
                    );
            String jwt = jwtService.generateToken(userDetails);


            return ResponseEntity.ok(jwt);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
    