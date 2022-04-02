import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext"
/**
 * 
 * @author : Chirag Dara 
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
  const handleToClasses = async () => {
    try {
      navigate("/Classes");
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>

      <div className="d-grid gap-2">
      <Button variant="btn btn-success" onClick={handleToClasses}>View available courses</Button>
      </div>

      <div className="d-grid gap-2">
      <Button variant="btn btn-success" onClick={handleToClasses}>View Chat</Button>
      </div>

      <div className="d-grid gap-2">
      <Button variant="btn btn-success" onClick={handleToClasses}>Schedule appointment</Button>
      </div>
      
    </>
  );
};

export default Home;