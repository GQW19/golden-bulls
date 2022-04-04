import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext"
import { getAuth, SignInMethod} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { render } from "@testing-library/react";
import ListGroup from 'react-bootstrap/ListGroup';








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

  function displayClients(){
        const clientNames = ["John Smith","Jane Doe"];

        // Generate JSX code for Display each item
        const RenderClients = clientNames.map((Client, index) => 
        <div key={index}><ListGroup.Item>{Client}</ListGroup.Item><Button variant="success">Send Message</Button>{' '}<Button variant="success">Recommend course</Button>{' '}</div>
     
        );
      
      return(
        <div className="app">
        <div>The List contains:</div>
        <br></br>
        <div>
        <ListGroup>
        {RenderClients} 
        </ListGroup>
        </div>
      
    </div>
      );
  }
 
  
  return (
    <>
     <div className="p-4 box mt-3 text-center">
        Welcome To The Case Worker Landing Page <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
        <br></br>
      <div className="d-grid gap-2">
      <Button variant="btn btn-success" onClick={handleToClasses}>View available courses</Button>
      </div>

        <br></br> <br></br>

        <h3>Current Mission clients for {userEmail}</h3>
        
       <>
       
       {displayClients()}
       </>

     

    </>
  );
};

export default HomeCaseWorker;