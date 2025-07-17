// import { useState } from "react";
// import "./PostUser.css"
// import { Form, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";

// const PostUser = () =>{
//     const [formData, setFormData] = useState({
//         name : "",
//         password : ""
//     })

//     const handleInputChange = (event) =>{
//         const{name,value} = event.target;
//         setFormData({
//             ...formData,
//             [name]:value,
//         })
//     }

//     const navigate = useNavigate();

//     const handleSubmit = async (e) =>{
//         e.peventDefault();
//         console.log(formData);

//         try {
//             const response = await fetch("http://loacalhost:8080/public",{
//                 method : "POST",
//                 headers: {"Content-Type":"application/json"},
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();
//             console.log("Employee created: ", data);
//             navigate("/")
//         } catch (error) {
//             console.log("Error creating employee", error.message)
//         }
//     }


//     return(
//         <>
//         <div className="center-form">
//             <h1>Post New User</h1>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formBasicName">
//                     <Form.Control 
//                         type="text"
//                         name="name"
//                         placeholder="Enter the name"
//                         value={formData.name}
//                         onChange={handleInputChange}                      
//                         />
//                 </Form.Group>

//                 <Form.Group control="formBasicName">
//                     <Form.Control 
//                         type="text"
//                         name="password"
//                         placeholder="Enter the password"
//                         value={formData.password}
//                         onChange={handleInputChange}                      
//                         />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100">
//                     Post User
//                 </Button>
//             </Form>
//         </div>
//         </>
//     )
// }

// export default PostUser;


import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';

function PostUser() {
  const [user, setUser] = useState({
    userName: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/public', user,{
        headers: {
        'Content-Type': 'application/json'
      }});
      
      console.log('User created:', response.data);
      alert('User Created Successfully!');
      setUser({ userName: '', email: '', password: '' });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: '400px', padding: '20px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Create User</h2>
          <Form onSubmit={handleSubmit}>

            <Form.Group id="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Form.Group id="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Create User
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostUser;
