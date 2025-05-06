"use client";

import Chart from "chart.js/auto";
import { useRef, useEffect, useState } from "react";
import styles from "./style.module.scss";
import {
  getMetricsChane,
  getMetricsDailyRate,
  getMetricsSentiment,
  getMetricsTheme,
} from "../../action/metrics";

const GraphComponent = () => {
  const chartCommentRefs = [useRef(null)]; // Ajoutez autant de références que nécessaire
  const chartRefs = [useRef(null)]; // Ajoutez autant de références que nécessaire
  const TitredataRefs = [useRef(null)]; // Ajoutez autant de références que nécessaire
  const [metrics, setMetrics] = useState([]);
  const [theme, setTheme] = useState([]);
  const [daily, setDaily] = useState();
  const [sentiment, setSentiment] = useState([]);
  const [corve, setCorv] = useState();
  const [critRate, setCritique] = useState();

  useEffect(() => {
    getMetricsChane()
      .then((response) => {
        setMetrics(response.metrics); // Mets à jour metrics
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
    getMetricsTheme()
      .then((response) => {
        setTheme(response.metrics); // Mets à jour metrics
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
    getMetricsDailyRate()
      .then((response) => {
        setDaily(response.metrics); // Mets à jour metrics
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
    getMetricsSentiment()
      .then((response) => {
        setSentiment(response.metrics); // Mets à jour metrics
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, []);

  useEffect(() => {
    if (metrics.length === 0) return;

    const channels = [];
    const feedbacksCounts = [];

    const themes = [];
    const feedThemCounts = [];
    const feedThemSentiment = [];
    const distribution = [];
    const average_score = [];
    const average_scorevaleur = [];

    metrics.forEach((item) => {
      channels.push(item.channel);
      feedbacksCounts.push(item.feedbacks_count);
    });
    theme.forEach((item) => {
      themes.push(item.theme);
      feedThemCounts.push(item.feedbacks_count);
    });
    // Parcours du premier niveau
    Object.entries(sentiment).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        console.log(`Clé : ${key}, valeur ${value} :`);

        Object.entries(value).forEach(([subKey, subValue]) => {
          console.log(`   ${subKey} : ${subValue}`);
          distribution.push(subKey);
          feedThemSentiment.push(subValue);
        });
      } else {
        console.log(`Clé : ${key}, valeur : ${value}`);
        average_score.push(key);
        average_scorevaleur.push(value);
      }
    });
    console.log(`le corver est`, average_scorevaleur[0]);

    setCorv(average_scorevaleur[0]);
    setCritique(average_scorevaleur[1]);
    console.log(`la distribution est `, average_score);
    console.log(`le feede est `, average_scorevaleur);

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
      labels: distribution,
      datasets: [
        {
          label: "Channels distribution",
          data: feedThemSentiment,
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
          type: "pie",
          data: chartCommentData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    });
    const chartData = {
      labels: channels,
      datasets: [
        {
          label: "Channels distribution",
          data: feedbacksCounts,
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
      labels: themes,
      datasets: [
        {
          label: "Theme distribution",
          data: feedThemCounts,
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
  }, [metrics, theme, daily, sentiment, corve, critRate, chartRefs, chartCommentRefs, TitredataRefs]);

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
            {daily !== null ? (
              <div>
                <div className={styles.Card}>
                  <p>{daily} %</p>
                </div>
                <h1>Daily Rate </h1>
              </div>
            ) : (
              ""
            )}
            {corve !== null ? (
              <div>
                <div className={styles.Card}>
                  <p>{corve.toFixed(2)} %</p>
                </div>
                <h1>Sentiment Score</h1>
              </div>
            ) : (
              ""
            )}
            {critRate !== null ? (
              <div
                className={
                  critRate >= 0 ? styles.critiqueCard : styles.critiqueCardMieux
                }
              >
                <div className={styles.Card}>
                  <p>{critRate} %</p>
                </div>
                <h1>Feed Critique</h1>
              </div>
            ) : (
              ""
            )}
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
