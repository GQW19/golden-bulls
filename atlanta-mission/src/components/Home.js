import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext"
import ProgressBar from 'react-bootstrap/ProgressBar';
import Nav from 'react-bootstrap/Nav'
import { render } from "@testing-library/react";
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card'
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


  function AlertDismissibleExample() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Message From: Daniel Carlson</Alert.Heading>
          <p>
            Fantastic work going through that Financial Literacy Course. You are doing great!
          </p>
        </Alert>
      );
    }
    
  }


  function MenuHandle(x){
    const selction = x.selectedKey;

    //conditional functionality of menu
    if(selction=="1"){
        render(<AlertDismissibleExample />);
        console.log("1");
    }else if(selction=="2"){
        console.log("2");
        handleToClasses();
    }else if(selction=="3"){
        console.log("3");
        handleLogout()
    }else{
        console.log("Bad Data");
    }
}



  return (
    <>
     <>
    <Nav
  variant="pills"
  activeKey="3"
  onSelect= {(selectedKey) => MenuHandle({selectedKey})}
>
  <Nav.Item>
    <Nav.Link eventKey="1">Get Messages</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="2">Courses</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="3">Log out</Nav.Link>
  </Nav.Item>
</Nav>
    </>


      <div className="p-4 box mt-3 text-center">
        Welcome To The Client Landing Page <br />
        {user && user.email}
      </div>
      <>
      <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Current Case Worker</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Daniel Carlson</Card.Subtitle>
    <Card.Text>
      use the button below to send messages or Schedule a one on one session with Daniel.
    </Card.Text>
    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Click to take Action
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Send Message</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Schedule Appointment</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  </Card.Body>
</Card>   
</>
<br></br><br></br>
<><h3>My Course Statuses</h3></>
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