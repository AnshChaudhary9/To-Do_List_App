package com.springProject.toDoListApp.controller;

import com.springProject.toDoListApp.entity.ToDo;
import com.springProject.toDoListApp.entity.User;
import com.springProject.toDoListApp.service.ToDoService;
import com.springProject.toDoListApp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RequestMapping("/todo")
@RestController
//@CrossOrigin(origins = "http://localhost:3000")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllEntriesOfUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);
        List<ToDo> allEntries = user.getToDoList();
        if (allEntries!=null && !allEntries.isEmpty()){
            return new ResponseEntity<>(allEntries, HttpStatus.OK);
        }
        return new ResponseEntity<>(allEntries, HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<ToDo> createEntry(@RequestBody ToDo mytoDo){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userName = authentication.getName();
            toDoService.saveEntry(mytoDo,userName);
            return new ResponseEntity<>(mytoDo, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/id/{myId}")
    public ResponseEntity<?>  deleteEntryById(@PathVariable ObjectId myId){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userName = authentication.getName();
            boolean removed = toDoService.deleteToDoById(myId, userName);
            if (removed){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
    }

    @PutMapping("/id/{myId}")
    public ResponseEntity<?> updateEntryById(@PathVariable ObjectId myId,@RequestBody ToDo newToDo){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);
        List<ToDo> collect = user.getToDoList().stream().filter(x -> x.getId().equals(myId)).collect(Collectors.toList());
        if(!collect.isEmpty()){
            Optional<ToDo> toDo = toDoService.findEntryById(myId);
            if (toDo.isPresent()){
                ToDo oldtoDo = toDo.get();
                oldtoDo.setTitle(newToDo.getTitle());
                oldtoDo.setDescription(newToDo.getDescription()!=null && !newToDo.getDescription().isEmpty() ? newToDo.getDescription() : oldtoDo.getDescription());
                toDoService.saveEntry(oldtoDo);
                return new ResponseEntity<>(oldtoDo, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("id/{myId}")
    public ResponseEntity<ToDo> getEntryById(@PathVariable ObjectId myId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);
        List<ToDo> collect = user.getToDoList().stream().filter(x -> x.getId().equals(myId)).collect(Collectors.toList());
        if(!collect.isEmpty()){
            Optional<ToDo> toDo = toDoService.findEntryById(myId);
            if (toDo.isPresent()){
                return new ResponseEntity<>(toDo.get(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
