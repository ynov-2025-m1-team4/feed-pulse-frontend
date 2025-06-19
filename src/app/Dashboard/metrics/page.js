"use client";

import Chart from "chart.js/auto";
import { useRef, useEffect, useState,useCallback } from "react";
import styles from "./style.module.scss";
import {
  getMetricsChane,
  getMetricsDailyRate,
  getMetricsSentiment,
  getMetricsTheme,
} from "../../action/metrics";


const GraphComponent = () => {
  const chartCommentRefs = [useRef(null)];
  const chartRefs = [useRef(null)];
  const TitredataRefs = [useRef(null)];

  const [metrics, setMetrics] = useState([]);
  const [theme, setTheme] = useState([]);
  const [daily, setDaily] = useState(null);
  const [sentiment, setSentiment] = useState([]);
  const [corve, setCorv] = useState(null);
  const [critRate, setCritique] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour charger toutes les APIs en parallèle
  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Exécution de toutes les requêtes en parallèle
      const [metricsResponse, themeResponse, dailyResponse, sentimentResponse] =
        await Promise.all([
          getMetricsChane().catch((err) => ({ error: err, data: null })),
          getMetricsTheme().catch((err) => ({ error: err, data: null })),
          getMetricsDailyRate().catch((err) => ({ error: err, data: null })),
          getMetricsSentiment().catch((err) => ({ error: err, data: null })),
        ]);

      // Mise à jour des états avec gestion d'erreurs
      if (metricsResponse.error) {
        console.error("Error fetching metrics data:", metricsResponse.error);
      } else {
        setMetrics(metricsResponse.metrics || []);
      }

      if (themeResponse.error) {
        console.error("Error fetching theme data:", themeResponse.error);
      } else {
        setTheme(themeResponse.metrics || []);
      }

      if (dailyResponse.error) {
        console.error("Error fetching daily data:", dailyResponse.error);
      } else {
        setDaily(dailyResponse.metrics);
      }

      if (sentimentResponse.error) {
        console.error(
          "Error fetching sentiment data:",
          sentimentResponse.error
        );
      } else {
        setSentiment(sentimentResponse.metrics || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial des données
  useEffect(() => {
    loadAllData();
  }, []);

  // Fonction pour nettoyer les graphiques
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const destroyCharts = useCallback(() => {
    [...chartRefs, ...chartCommentRefs, ...TitredataRefs].forEach((ref) => {
      if (ref.current?.chart) {
        ref.current.chart.destroy();
        ref.current.chart = null;
      }
    });
  });

  // Fonction pour créer les graphiques
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createCharts = () => {
    if (metrics.length === 0 && theme.length === 0 && !sentiment) return;

    // Préparation des données pour les graphiques
    const channels = metrics.map((item) => item.channel);
    const feedbacksCounts = metrics.map((item) => item.feedbacks_count);

    const themes = theme.map((item) => item.theme);
    const feedThemCounts = theme.map((item) => item.feedbacks_count);

    const distribution = [];
    const feedThemSentiment = [];
    const average_score = [];
    const average_scorevaleur = [];

    // Traitement des données de sentiment
    if (sentiment && typeof sentiment === "object") {
      Object.entries(sentiment).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            distribution.push(subKey);
            feedThemSentiment.push(subValue);
          });
        } else {
          average_score.push(key);
          average_scorevaleur.push(value);
        }
      });

      // Mise à jour des scores
      if (average_scorevaleur.length > 0) {
        setCorv(average_scorevaleur[0]);
        setCritique(average_scorevaleur[1]);
      }
    }

    // Nettoyage des graphiques existants
    destroyCharts();

    // Configuration commune pour les graphiques
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
    };

    // Création du graphique des canaux (Bar Chart)
    if (channels.length > 0 && chartRefs[0].current) {
      chartRefs[0].current.chart = new Chart(chartRefs[0].current, {
        type: "bar",
        data: {
          labels: channels,
          datasets: [
            {
              label: "Distribution des canaux",
              data: feedbacksCounts,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Création du graphique des thèmes (Bar Chart)
    if (themes.length > 0 && TitredataRefs[0].current) {
      TitredataRefs[0].current.chart = new Chart(TitredataRefs[0].current, {
        type: "bar",
        data: {
          labels: themes,
          datasets: [
            {
              label: "Distribution des thèmes",
              data: feedThemCounts,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Création du graphique des sentiments (Pie Chart)
    if (distribution.length > 0 && chartCommentRefs[0].current) {
      chartCommentRefs[0].current.chart = new Chart(
        chartCommentRefs[0].current,
        {
          type: "pie",
          data: {
            labels: distribution,
            datasets: [
              {
                label: "Distribution des sentiments",
                data: feedThemSentiment,
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(153, 102, 255)",
                ],
                hoverOffset: 4,
              },
            ],
          },
          options: commonOptions,
        }
      );
    }
  };

  // Effet pour créer les graphiques quand les données sont disponibles
  useEffect(() => {
    if (!loading && (metrics.length > 0 || theme.length > 0 || sentiment)) {
      createCharts();
    }

    // Nettoyage lors du démontage du composant
    return destroyCharts;
  }, [metrics, theme, sentiment, loading, destroyCharts, createCharts]);

  // Fonction pour recharger les données
  const handleRefresh = () => {
    loadAllData();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={handleRefresh} className={styles.retryButton}>
          Réessayer
        </button>
      </div>
    );
  }


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
                  <p>{corve && corve.toFixed(2)} %</p>
                </div>
                <h1>Sentiment Score</h1>
              </div>
            ) : (
              ""
            )}
            {critRate !== null ? (
              <div
                className={
                  critRate >= 0 ? styles.critiqueCardMieux : styles.critiqueCard
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
         
        </div>
      </div>
    </>
  );
};
export default GraphComponent;
