'use client';

import { useEffect, useState } from 'react';
import { getProviders } from "../action/dashbord";
import styles from "./style.module.scss"

export default function SimpleFeedPulseDashboard() {
  const [providers,setProvider]=useState([])
  useEffect(()=>{
    getProviders()
          .then((response) => {
            console.log("user data4:", response.provider);
            setProvider(response.provider);
          })
          .catch((error) => {
            console.error("Error fetching event data:", error);
          });
      },[])
    
  return (
    <div className={styles.parent}>
      {providers.length > 0 ? (
        providers.map(()=>{
        })
      ):(
<div className={styles.parentNone}>
<p>vous n&apos;avez pas de données ajouter des données maisnt </p>
  
</div>      )}
     
    </div>
  );
}