/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";
import styles from "./style.module.scss";

const GraphComponent = () => {
  const chartCommentRefs = [useRef(null)]; // Ajoutez autant de références que nécessaire
  const chartRefs = [useRef(null)]; // Ajoutez autant de références que nécessaire
  const TitredataRefs = [useRef(null)]; // Ajoutez autant de références que nécessaire

  useEffect(() => {

    // Détruisez les instances précédentes
    chartRefs.forEach((ref) => {
      if (ref.current && ref.current.chart) {
        ref.current.chart.destroy();
      }
    });
    chartCommentRefs.forEach((ref) => {
      if (ref.current && ref.current.chart) {
        ref.current.chart.destroy();
      }
    });
    TitredataRefs.forEach((ref) => {
      if (ref.current && ref.current.chart) {
        ref.current.chart.destroy();
      }
    });

    const chartCommentData = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "Theme distribution",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    chartCommentRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.chart = new Chart(ref.current, {
          type: "doughnut",
          data: chartCommentData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    });
    const chartData = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "Theme distribution",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    chartRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.chart = new Chart(ref.current, {
          type: "bar",
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    });

    const Titredata = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "Theme distribution",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    TitredataRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.chart = new Chart(ref.current, {
          type: "bar",
          data: Titredata,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    });

    // Nettoyez les instances des graphiques lorsque le composant est démonté
    return () => {
      chartRefs.forEach((ref) => {
        if (ref.current && ref.current.chart) {
          ref.current.chart.destroy();
        }
      });
      chartCommentRefs.forEach((ref) => {
        if (ref.current && ref.current.chart) {
          ref.current.chart.destroy();
        }
      });
      TitredataRefs.forEach((ref) => {
        if (ref.current && ref.current.chart) {
          ref.current.chart.destroy();
        }
      });
    };
  }, [TitredataRefs, chartCommentRefs, chartRefs]);

  return (
    <>
      <div className={styles.chartParent}>
        <div className={styles.chart}>
          <div className={styles.chartFirst}>
            {chartRefs.map((ref, index) => (
              <div
                key={index}
                style={{
                  width: "300px", // Resize as needed
                  height: "200px",
                  marginBottom: "20px",
                }}
              >
                <canvas ref={ref}></canvas>
              </div>
            ))}
          </div>
          <div>
            {TitredataRefs.map((ref, index) => (
              <div
                key={index}
                style={{
                  width: "300px", // Resize as needed
                  height: "200px",
                  marginBottom: "20px",
                }}
              >
                <canvas ref={ref}></canvas>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.chart}`}>
          <div className={styles.chartScond}>
            <div>
              <div className={styles.Card}>
                <p>6.8 %</p>
              </div>
              <h1>Daily Rate</h1>
            </div>
            <div>
              <div className={styles.Card}>
                <p>6.8 %</p>
              </div>
              <h1>Sentiment Score</h1>
            </div>
            <div className={styles.critiqueCard}>
              <div className={styles.Card}>
                <p>6%</p>
              </div>
              <h1>Feed Critique</h1>
            </div>
          </div>
          <div>
            {chartCommentRefs.map((ref, index) => (
              <div
                key={index}
                style={{
                  width: "300px", // Resize as needed
                  height: "200px",
                  marginBottom: "20px",
                }}
              >
                <canvas ref={ref}></canvas>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphComponent;
