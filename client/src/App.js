import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import Loading from "./components/Loading";
import { Route, Routes, useNavigate } from "react-router-dom";
import Error from "./components/Error";
import {LoginContext} from './components/ContextProvider/Context'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'
const App = () => {
  const {setLoginData,setUser,loading,setLoading}=useContext(LoginContext);
  const navigate=useNavigate();
  const DashboardValid=async()=>{
    let token=localStorage.getItem("userDataToken");
    //console.log(token);
    const response=await axios.get('http://localhost:8000/validUser',{
        headers:{
            Accept:'application/json',
            authorization:token
        }
    });
    //console.log(response.data);
    if(response.data.status === 401||!response.data){
         navigate("/")}
    else{
      console.log("user verify");
      setLoginData(response.data.validUserOne)
      setUser(response.data.validUserOne.email[0].toUpperCase());
      navigate(`/dashboard/${response.data.validUserOne._id}`)
    }
    }
    useEffect(()=>{
      setTimeout(()=>{
        DashboardValid();
        setLoading(false)
      
      },2000);
    
      
    },[])
    if(loading){
      return (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>
      )
    }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="*" element={<Error/>}/>
      </Routes>
    </>
  );
};

export default App;
