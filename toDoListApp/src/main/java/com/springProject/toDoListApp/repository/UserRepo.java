package com.springProject.toDoListApp.repository;

import com.springProject.toDoListApp.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, ObjectId> {
    User findByUserName(String username);
    User deleteByUserName(String username);
}
