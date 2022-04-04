import React, { useState } from "react";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../UserAuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
/**
 * 
 * @author : Chirag Dara 
 */
// const auth = getAuth();
// const user = auth.currentUser;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {

    const auth = getAuth();
    const user = auth.currentUser;
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);

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

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  
  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Helping Hand Login</h2>
        <p>*** Note this is an application that has 2 differnt user groups</p>
        <hr></hr>
        <p>1) Mission Client: Create a new account or sign in as</p>
        <p>user: testClient@gmail.com</p>
        <p>pass: password</p>
        
        <hr></hr>
        <p>1) Mission Case Worker: sign in as</p>
        <p>user: danieljeffcarlson@gmail.com</p>
        <p>pass: password</p>
        <hr></hr>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
