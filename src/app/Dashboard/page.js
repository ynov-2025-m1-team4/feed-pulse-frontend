"use client";

import { useEffect, useState } from "react";
import { getFeed } from "../action/dashbord";
import styles from "./style.module.scss";

export default function SimpleFeedPulseDashboard() {
  const [providers, setProviders] = useState([]);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  useEffect(() => {
    getFeed()
      .then((response) => {
        if (Array.isArray(response.provider)) {
          setProviders(response.provider);
        } else {
          console.error("Invalid provider data:", response.provider);
        }
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, []);

  return (
    <div>
      <div>
        <h1>Dashbord</h1>
      </div>
      <div className={styles.parent}>
      {providers.length > 0 ? (
        <div className={styles.list}>
          {providers.map((item, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.cell}>
                <strong>Channel:</strong> {item.channel}
              </div>
              <div className={styles.cell}>
                <strong>Texte:</strong> {item.text}
              </div>
              <div className={styles.cell}>
                <strong>Date:</strong> {formatDate(item.date)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.parentNone}>
          <p>Vous n&apos;avez pas de données. Ajoutez des données.</p>
        </div>
      )}
    </div>
    </div>
  );
}
