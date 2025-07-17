package com.springProject.toDoListApp.service;

import com.springProject.toDoListApp.entity.ToDo;
import com.springProject.toDoListApp.entity.User;
import com.springProject.toDoListApp.repository.ToDoRepo;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class ToDoService {

    @Autowired
    private ToDoRepo toDoRepo;

    @Autowired
    private UserService userService;

    @Transactional
    public void saveEntry(ToDo myToDo, String username){
        try {
            User user = userService.findByUserName(username);
            myToDo.setDate(LocalDateTime.now());
            ToDo saveToDo = toDoRepo.save(myToDo);
            user.getToDoList().add(saveToDo);
            userService.saveUser(user);
        }catch (Exception e){
            throw new RuntimeException("An error occurred while saving the entry",e);
        }
    }

    public void saveEntry(ToDo myToDo){
        ToDo saveToDo = toDoRepo.save(myToDo);
    }

    public List<ToDo> getAllEntries(){
        return toDoRepo.findAll();
    }

    public Optional<ToDo> findEntryById(ObjectId id){
        return toDoRepo.findById(id);
    }

    @Transactional
    public boolean deleteToDoById(ObjectId id, String username){
        boolean removed = false;
        try {
            User user = userService.findByUserName(username);
            removed = user.getToDoList().removeIf(x ->x.getId().equals(id));
            if (removed){
                userService.saveUser(user);
                toDoRepo.deleteById(id);
            }
        }catch (Exception e){
            throw new RuntimeException("An error occurred while deleting the entry",e);
        }
        return removed;
    }
}
