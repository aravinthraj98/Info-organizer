import React from "react"
import firebase from "../Database/firebase"
const db =firebase.firestore();


async function addNewCompany(companyName,companyEmail,password,companyDescription){
   try{
       await db.collection("company").add(companyName,companyEmail,password,companyDescription);
   }
   catch(error){
        console.log(error);
   }
   
}



export {
    addNewCompany
}