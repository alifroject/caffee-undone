import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLists from "./HomePage/Components/ComponentTS/UserLists";
import AddUser from './HomePage/Components/ComponentTS/AddUser';
import EditUser from './HomePage/Components/ComponentTS/EditUser';
import LoginPage from './HomePage/Components/ComponentTS/LoginPage';
import Layout from './HomePage/Pages/Layout';
import Home_Page from './HomePage/Pages/Home_Page';
import Menu2 from './HomePage/Pages/Menu2';
import Career2 from './HomePage/Pages/Career2';
import FindJobs from './HomePage/Components/ComponentTS/FindJobs';

const App: React.FC = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home_Page/>} />
          <Route path="/menu" element={<Menu2/>}></Route>
          <Route path="/career" element={<Career2/>}></Route>
          <Route path="/findjobs" element={<FindJobs/>}></Route>
   


          <Route path="/userList" element={<UserLists />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/EditUser/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
