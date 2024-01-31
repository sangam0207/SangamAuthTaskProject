import React, { useState } from "react";
import "./Form.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
const Login = () => {
  const navigate=useNavigate();
  const LoginUserData={

    email: "",
    password: "",
   
  }
    const[passShow,setPassShow]=useState(false);
    const [inpval, setInpval] = useState(LoginUserData);
    const setVal = (e) => {
      const { name, value } = e.target;
      setInpval(() => {
        return {
          ...inpval,
          [name]: value,
        };
      });
    };
    const loginUser=async(e)=>{
     e.preventDefault();
     const {email,password}=inpval;
     if(email===""){
      alert("Enter email please")
    }
    else if(!email.includes('@')){
   alert('enter valid Email')
    }
     else if(password===""){
      alert("enter your Password")
     }
     else if(password.length<6){
      alert("Password must be 6 char")
     }
     else{
      //console.log('login successful')
      const response=await axios.post('http://localhost:8000/login',inpval,{
        headers:{
          Accept:'application/json',
        }
      });
      console.log(response.data)
      const {status,result}=response.data;
      if(status===201){

        localStorage.setItem("userDataToken",result.token);
        navigate(`/dashboard/${result._id}`);
        setInpval(LoginUserData);
       
      }
     }
    }
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Login</h1>
            <p>Hi!! We are glad ,You are back Please Login</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={setVal}
                value={inpval.email}
                placeholder="Enter Your Email"
              ></input>
            </div>
            <div className="form_input">
              <label htmlFor="Password">Password</label>
             <div className="two">
             <input
                type={!passShow?'password':'text'}
                name="password"
                id="password"
                onChange={setVal}
                value={inpval.password}
                placeholder="Enter Your Password"
              ></input>
              <div className="showpass" onClick={()=>setPassShow(!passShow)}>
               {!passShow?'Show':'Hide'}
              </div>
             </div>
             
            </div>
            <button type="submit" className="btn" onClick={loginUser}>Login</button>
          <p>Don't have an account ? <NavLink to='/register'>Sign Up</NavLink></p>
          
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
