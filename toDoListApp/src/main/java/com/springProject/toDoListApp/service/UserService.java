package com.springProject.toDoListApp.service;

import com.springProject.toDoListApp.entity.User;
import com.springProject.toDoListApp.repository.UserRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class UserService {

    @Autowired
    private UserRepo userRepo;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void saveUser(User myUser){
            userRepo.save(myUser);
    }

    public void saveNewUser(User myUser){
        myUser.setPassword(passwordEncoder.encode(myUser.getPassword()));
        myUser.setRoles(Arrays.asList("USER"));
        userRepo.save(myUser);
    }

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public Optional<User> findUserById(ObjectId id){
        return userRepo.findById(id);
    }

    public void deleteUserByUserName(String username){
        userRepo.deleteByUserName(username);
    }

    public User findByUserName(String userName){return userRepo.findByUserName(userName);}
}
