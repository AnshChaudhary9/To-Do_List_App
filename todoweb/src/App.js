// import './App.css';
// import { AuthProvider } from './context/authcontext/AuthContext';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from '../../pages/header/Header';
// import Dashboard from '../../pages/dashboard/Dashboard';
// import NoMatch from '../../pages/noMatch/NoMatch';
// import PostUser from '../../pages/user/PostUser';
// import Login from '../../pages/login/Login';


// function App() {
//   return (
//     <>
//       <AuthProvider>
//         <Header>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/user" element={<PostUser />} />
//           <Route path="*" element={<NoMatch />} />
//         </Routes>
//       </Router>
//       </Header>
//     </AuthProvider>
//     </>
//   );
// }

// export default App;

// App.js
import {Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext/AuthContext';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import PostUser from './pages/user/PostUser';
import NoMatch from './pages/noMatch/NoMatch';
import Header from './pages/header/Header';

function App() {
  return (
    <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<PostUser />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;


