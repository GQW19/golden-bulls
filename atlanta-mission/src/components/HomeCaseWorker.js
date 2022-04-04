import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext"
import { getAuth, SignInMethod} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { render } from "@testing-library/react";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import { async } from "@firebase/util";
import Alert from 'react-bootstrap/Alert'





/**
 * 
 * @author : Daniel Carlson
 */

class App extends React.Component{
    state = {clients:null}
}

const HomeCaseWorker = () => {


  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const userEmail = user.email

  //This is a function that will log the user our from fire base and move them back to the root login page.
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
 
  //This function moves to the course selection/view page
  const handleToClasses = async () => {
    try {
      navigate("/Classes");
    } catch (error) {
      console.log(error.message);
    }
  };

//This function is pulling associated clients for the specfic caseworker amd returning as list
  const ShowAssociatedClients = async () => {
    try {
   
    const q = query(collection(db, "ClientAssignments"), where("associatedCaseWorkerID", "==","TiEBGx1grgPef0BXO5imIR0mJTj2" ));
    const querySnapshot = await getDocs(q);

    const clients = []

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        //clients.push(doc.data().clientEmail);
        render( 
            <>
            <p>{doc.data().clientEmail}</p>
            </>);
      });

      

    } catch (error) {
      console.log(error.message);
    }
  };

  function AlertDismissibleExample() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Message From: John Smith</Alert.Heading>
          <p>
            Hey I really enjoyed that Financial Literacy course. Do you have any other additional recommendations?
          </p>
        </Alert>
      );
    }
    
  }

//This function displays the current clients of the Caseworker
  function displayClients(){
        const clientNames = ["John Smith","Jane Doe"];

        // Generate JSX code for Display each item
        const RenderClients = clientNames.map((Client, index) => 
        

        <div key={index}>
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{Client}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Client Interests</Card.Subtitle>
    <Card.Text>
      Learning Budgeting, house/apartment hunting, Emotional support
    </Card.Text>
    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Click to take Action
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Send Message</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Recommend course</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Schedule Appointment</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  </Card.Body>
</Card>
</div>
        );
      
      return(
        <div className="app">
        
        <br></br>
        <div>
        <ListGroup>
        {RenderClients} 
        </ListGroup>
        </div>
      
    </div>
      );
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
  <Nav.Item >
    <Nav.Link eventKey="1" >Get Messages</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="2">View Courses</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="3">Log out</Nav.Link>
  </Nav.Item>
</Nav>
    </>

     <div className="p-4 box mt-3 text-center">
        <h2>Welcome To The Case Worker Landing Page</h2> <br />
        {user && user.email}
      </div>
    
        <br></br> <br></br>
        
        <h3>Current Mission Clients</h3>
        
        
        <div className="p-4 box mt-3 text-center">
        <>
       
       {displayClients()}
       </>


      </div>
      

     

    </>
  );
};

export default HomeCaseWorker;