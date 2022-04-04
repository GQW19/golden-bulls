import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext"
import { getAuth} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { type } from "@testing-library/user-event/dist/type";
import { render } from "@testing-library/react";
import React, { Component, Fragment } from 'react';


Component


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
    //   console.log("current userID: " ,user.uid);

      
    //   //instancing a collection of client-caseworker relationships and then writing a query to only pull clients associated with the current signed in cases workers ID
    //   const ClientAssignments = collection(db, "ClientAssignments");
    //   const q = query(ClientAssignments, where("associatedCaseWorkerID", "==", user.uid)); 
      
    //    //actually executing the query and getting
    //    const querySnapshot = await getDocs(q);
    //    const result = []
    //    querySnapshot.forEach((doc) => {
    //      // doc.data() is never undefined for query doc snapshots
    //      result.push(doc.data().clientEmail);
    //      });


  
    // const clientref = doc(db, "ClientAssignments", "7wDIDPl7hgovXQVxHz3G");
    // const docSnap = await getDoc(clientref);

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

      render( 
          <>
          <p>{clients}</p>
          </>)
     

        // return (
        //     this.state.clients.map((client) => {
        //         <>
        //         <p>{client}</p>
        //         </>
        //     })
        // );

    } catch (error) {
      console.log(error.message);
    }
  };

 


  
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

      <div className="d-grid gap-2">
      <Button variant="btn btn-success" onClick={ShowAssociatedClients}>run associated clients in console</Button>
      </div>
      <br></br>

        <h3>display data here</h3>
        
       

     

    </>
  );
};

export default HomeCaseWorker;