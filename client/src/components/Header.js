import React, { useContext } from "react";
import "./header.css";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate=useNavigate();
  const { user,setUser,loginData,setLoginData} = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goError=()=>{
    navigate('*');
  }
  const handleLogout=async()=>{
    let token=localStorage.getItem("userDataToken");
    //console.log(token);
    const response=await axios.get('http://localhost:8000/logout',{
        headers:{
            Accept:'application/json',
            authorization:token,
           
        },
        credentials:"include"
    });
    //console.log(response.data);
    if(response.data.status === 201){
      console.log("user logout");
      localStorage.removeItem("userDataToken")
      navigate('/')
      setUser("👨");
      setLoginData(null);}
    else{
     console.log("error")
    }
  }
  const handleProfile=()=>{
   navigate("/dashboard");
  }
  return (
    <>
      <header>
        <nav>
          <h1>Sangam-Task-App</h1>

          <div className="avtar">
            <Avatar style={{ backgroundColor: "blue" }} onClick={handleClick}>
              {user}
            </Avatar>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData ? (
              <>
                {" "}
                <MenuItem onClick={()=>{
                  handleProfile()
                  handleClose()
                }}>Profile</MenuItem>
                <MenuItem onClick={()=>{
                   handleLogout()
                   handleClose()
                   }}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={()=>{
                   goError()
                   handleClose()
                   }}>Profile</MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
