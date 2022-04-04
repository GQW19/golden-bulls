import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext"
import ProgressBar from 'react-bootstrap/ProgressBar';
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
        Welcome To The Client Landing Page <br />
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
      
<br></br><br></br><br></br><br></br>
<><h3>Course Status</h3></>
<br></br><br></br>
      <div>
        <hr></hr>
        <p>Financial Literacy</p>
        <ProgressBar striped variant="success" now={100} label={"100%"} animated={true} /><p align="center">&#x2B50; &#x2B50; &#x2B50; Completed &#x2B50; &#x2B50; &#x2B50;</p>
        <hr></hr>
        <p>Walk with Christ</p>
        <ProgressBar striped variant="info" now={20} label={"20%"} animated={true}/>
        <hr></hr>
        <p>Healthy Relationships</p>
        <ProgressBar striped variant="warning" now={60} label={"60%"} animated={true}/>
        <hr></hr>
        <p>Dealing With Fear</p>
        <ProgressBar striped variant="danger" now={80} label={"80%"} animated={true}/>
        <hr></hr>
      </div>

    </>
  );
};

export default Home;