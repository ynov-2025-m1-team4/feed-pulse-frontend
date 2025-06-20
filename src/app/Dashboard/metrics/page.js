"use client";

import Chart from "chart.js/auto";
import { useRef, useEffect, useState, useCallback } from "react";
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
  const [sentiment, setSentiment] = useState(null);
  const [corve, setCorv] = useState(null);
  const [critRate, setCritique] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction de chargement
  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [metricsRes, themeRes, dailyRes, sentimentRes] = await Promise.all([
        getMetricsChane(),
        getMetricsTheme(),
        getMetricsDailyRate(),
        getMetricsSentiment(),
      ]);

      setMetrics(metricsRes.metrics || []);
      setTheme(themeRes.metrics || []);
      setDaily(dailyRes.metrics);
      setSentiment(sentimentRes.metrics || {});
    } catch (err) {
      console.error("Erreur de chargement :", err);
      setError("Échec du chargement des données.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const destroyCharts = useCallback(() => {
    [...chartRefs, ...chartCommentRefs, ...TitredataRefs].forEach((ref) => {
      if (ref.current?.chart) {
        ref.current.chart.destroy();
        ref.current.chart = null;
      }
    });
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createCharts = () => {
    if (!sentiment) return;

    const channels = metrics.map((m) => m.channel);
    const feedbacksCounts = metrics.map((m) => m.feedbacks_count);

    const themes = theme.map((t) => t.theme);
    const feedThemCounts = theme.map((t) => t.feedbacks_count);

    const distribution = [];
    const feedThemSentiment = [];
    const average_scorevaleur = [];

    Object.entries(sentiment).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          distribution.push(subKey);
          feedThemSentiment.push(subValue);
          console.log(key);
        });
      } else {
        console.log("la valeur en else est", value);

        average_scorevaleur.push(value);
      }
    });

    if (average_scorevaleur.length > 0) {
      setCorv(average_scorevaleur[0]);
      setCritique(average_scorevaleur[1]);
    }

    destroyCharts();

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "top" } },
    };

    if (channels.length && chartRefs[0].current) {
      chartRefs[0].current.chart = new Chart(chartRefs[0].current, {
        type: "bar",
        data: {
          labels: channels,
          datasets: [
            {
              label: "Distribution des canaux",
              data: feedbacksCounts,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
          ],
        },
        options: {
          ...commonOptions,
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    if (themes.length && TitredataRefs[0].current) {
      TitredataRefs[0].current.chart = new Chart(TitredataRefs[0].current, {
        type: "bar",
        data: {
          labels: themes,
          datasets: [
            {
              label: "Distribution des thèmes",
              data: feedThemCounts,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#9966FF"],
            },
          ],
        },
        options: {
          ...commonOptions,
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    if (distribution.length && chartCommentRefs[0].current) {
      chartCommentRefs[0].current.chart = new Chart(
        chartCommentRefs[0].current,
        {
          type: "pie",
          data: {
            labels: distribution,
            datasets: [
              {
                label: "Sentiments",
                data: feedThemSentiment,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                ],
              },
            ],
          },
          options: commonOptions,
        }
      );
    }
  };

  useEffect(() => {
    if (!loading && sentiment) createCharts();

    return destroyCharts;
  }, [metrics, theme, sentiment, loading, createCharts, destroyCharts]);

  const handleRefresh = () => loadAllData();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Chargement des données...</p>
      </div>
    );
  }
  if (metrics.length <= 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Vous n&apos;avez pas de données </p>
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
    <div className={styles.chartParent}>
      <div className={styles.chart}>
        <div className={styles.chartFirst}>
          {chartRefs.map((ref, index) => (
            <div key={index} style={{ width: 300, height: 200 }}>
              <canvas ref={ref}></canvas>
            </div>
          ))}
        </div>
        <div>
          {TitredataRefs.map((ref, index) => (
            <div key={index} style={{ width: 300, height: 200 }}>
              <canvas ref={ref}></canvas>
            </div>
          ))}
        </div>
        <div>
          {chartCommentRefs.map((ref, index) => (
            <div key={index} style={{ width: 300, height: 200 }}>
              <canvas ref={ref}></canvas>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chart}>
        <div className={styles.chartScond}>
          {daily !== null && (
            <div>
              <div className={styles.Card}>
                <p>{daily.toFixed(2)} %</p>
              </div>
              <h1>Daily Rate</h1>
            </div>
          )}
          {corve !== null && (
            <div>
              <div className={styles.Card}>
                {corve ? <p>{corve.toFixed(2)} %</p> : ""}
              </div>
              <h1>Sentiment Score</h1>
            </div>
          )}
          {critRate !== null && (
            <div
              className={
                critRate >= 0 ? styles.critiqueCardMieux : styles.critiqueCard
              }
            >
              <div className={styles.Card}>
                <p>{critRate.toFixed(2)} %</p>
              </div>
              <h1>Feed Critique</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
