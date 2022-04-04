import React, { useState } from "react";
import { db } from "../firebase";
import Accordion from 'react-bootstrap/Accordion'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext"

/**
 * 
 * @author : Daniel Carlson
 */

 const Classes = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();


    const NavigateHome = async (e) => {

    
        e.preventDefault();
        setError("");
        try {
          
          //reseting variables
          const auth = getAuth();
          const user = auth.currentUser;
    
          //here we are instancing the collection and then querying the collection to get a row where uid ==s the uid of the currently signed in user
          const CaseWorkers = collection(db, "Usergroup");
          const q = query(CaseWorkers, where("UID", "==", user.uid));
         
          //actually executing the query and getting
          const querySnapshot = await getDocs(q);
          const result = []
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            result.push(doc.data().group_ID);
        
          });
    
          console.log(result);
    
          if ( result.length ===0){
            console.log("Client homepage")
            navigate("/home");
          }else{
            console.log("CaseWorker homepage")
            navigate("/HomeCaseWorker");
          }
          
    
    
        } catch (err) {
          setError(err.message);
        }
      };
    
    const GetCourses = async () => {
    //Create a constant to initialize the collection
    const querySnapshot = await getDocs(collection(db, "growth_classes"));
    const courseList = []


    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data().CourseName}, ${doc.data().CourseDescr}`);

        courseList.push(doc.data().CourseName);
    });
    //this.setState({ courseList: courseList });

    console.log(courseList);
    return courseList;


    };

    function test(){
        return(

<>

<Accordion defaultActiveKey="0" >
  <Accordion.Item eventKey="0">
    <Accordion.Header>Financial Literacy</Accordion.Header>
    <Accordion.Body>
      This is the course description. Here we will descibe what is going on 
      in this course or relevant content. We also have a button that
      will allow the client to enroll in the course.
      <br></br><br></br><Button variant="primary" type="Submit">Enroll</Button>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Healthy Relationships</Accordion.Header>
    <Accordion.Body>
    This is the course description. Here we will descibe what is going on 
      in this course or relevant content. We also have a button that
      will allow the client to enroll in the course.
      <br></br><br></br><Button variant="primary" type="Submit">Enroll</Button>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header>Dealing With Fear</Accordion.Header>
    <Accordion.Body>
    This is the course description. Here we will descibe what is going on 
      in this course or relevant content. We also have a button that
      will allow the client to enroll in the course.
      <br></br><br></br><Button variant="primary" type="Submit">Enroll</Button>
    </Accordion.Body>
  </Accordion.Item> <Accordion.Item eventKey="3">
    <Accordion.Header>Walk with Christ</Accordion.Header>
    <Accordion.Body>
    This is the course description. Here we will descibe what is going on 
      in this course or relevant content. We also have a button that
      will allow the client to enroll in the course.
      <br></br><br></br><Button variant="primary" type="Submit">Enroll</Button>
    </Accordion.Body>
  </Accordion.Item>
    </Accordion>
</>


        );
    }
    

    return (
<>
        <div>
       <h1>Course Menu</h1>
       </div>

       <div>
       <h3>Available courses</h3>
       </div>

            <>
            {test()}
            </>
            
            

            <>
            <Button 
            variant="danger" 
            type="Submit"
            onClick={NavigateHome}>Back to Home</Button>
            </>
       
            </>      
  );
};

export default Classes;