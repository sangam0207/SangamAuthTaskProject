import React from "react";
import { useState } from "react";
import "./Form.css";
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate=useNavigate();
  const userData={
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  }
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);
  const [inpval, setInpval] = useState(userData);
  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };
  const AddUserData=async(e)=>{
    e.preventDefault();
    const {fname,email,password,cpassword}=inpval;
    if(fname===""){
      alert('Pleae Enter Your Name');
    }
    else if(email===""){
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
     else if(cpassword===""){
      alert("enter your Password")
     }
     else if(cpassword.length<6){
      alert("Confirm Password must be 6 char")
     }
     else if(password!==cpassword){
      alert("password and confirm password not match")
     }
     else{
      const response =await axios.post('http://localhost:8000/register',inpval,{
        headers:{
          Accept:'application/json'
        }
      });
      console.log(response.data.status);
      if(response.data.status===201){
        setInpval(userData);
        alert('Registration is successful')
        navigate('/')
      }
      else{
        alert('Registration is failed')
      }

     }
  }
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Signup</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project cloud to manage your
              tasks! <br />
              We hope you will get like it{" "}
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                value={inpval.fname}
                onChange={setVal}
                placeholder="Enter Your Name"
              ></input>
            </div>
            <div className="form_input">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                value={inpval.email}
                id="email"
                onChange={setVal}
                placeholder="Enter Your Email"
              ></input>
            </div>
            <div className="form_input">
              <label htmlFor="Password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  value={inpval.password}
                  onChange={setVal}
                  placeholder="Enter Your Password"
                ></input>
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="Password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  value={inpval.cpassword}
                  id="cpassword"
                  onChange={setVal}
                  placeholder="Enter Your confirm Password "
                ></input>
                <div
                  className="showpass"
                  onClick={() => setcPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button type="submit" className="btn" onClick={AddUserData}>SignUp</button>
            <p>
              {" "}
              Already Have an account? <NavLink to="/">Login</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
