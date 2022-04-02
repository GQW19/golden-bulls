import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext"
/**
 * 
 * @author : Daniel Carlson
 */
const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
 


  return (
    <>
      <div>
          <h1>Hello Case Worker !!!</h1>
      </div>
      
    </>
  );
};

export default Home;