package com.springProject.toDoListApp.repository;

import com.springProject.toDoListApp.entity.ToDo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ToDoRepo extends MongoRepository<ToDo, ObjectId> {

}
