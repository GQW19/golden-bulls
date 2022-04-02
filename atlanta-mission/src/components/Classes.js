import React from "react";

import { getDocs , collection } from "firebase/firestore"; 
import { db } from "../firebase";


import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext"

/**
 * 
 * @author : Daniel Carlson
 */

 const Classes = () => {

    
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

    return (

        <div className="d-grid gap-2">
            <Button variant="btn btn-success" onClick={GetCourses}>Show classes in Log</Button>
        </div>

/*        <div>
        {GetCourses.map(data => (
        <p>{data}</p>
            ))}
    </div>
  */      
  );
};

export default Classes;