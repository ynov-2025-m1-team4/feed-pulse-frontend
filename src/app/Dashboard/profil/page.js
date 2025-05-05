"use client";

import { useEffect,useState } from "react";
import ProfilCompo from "../../../components/profilCompo/index"
import { getUser } from "../../action/auth";

export default function Profile() {
  const [currentUser, setCurrentUsers] = useState([]);
    useEffect(()=>{
         getUser()
        .then((response) => {
          console.log("user data4:", response.user);
          setCurrentUsers(response.user);
        })
        .catch((error) => {
          console.error("Error fetching event data:", error);
        });
    },[])
    return (
       <ProfilCompo userName={currentUser?.pseudo} email={currentUser?.email} />
    );
}