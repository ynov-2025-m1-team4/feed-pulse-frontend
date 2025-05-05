"use server";
import { cookies } from "next/headers";


export const getMetricsChane = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')
  console.log("token: ", token);
  if (!token) {
    return null
  }
  try {
    let data = await fetch("https://feed-pulse-backend.onrender.com/api/metrics/channels", {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Authorization": `Bearer ${token.value}`,
      // },
    });
  
    
  
    let res = await data.json();
    console.log("resUser: ", res);
    
    if (res.error) {
      return null
    } else {
      return {
        error: false,
        message: res.message,
        metrics: res,
      };
    }
  } catch (error) {
    console.log("error: ", error);
    return null
  }

}
export const getMetricsTheme = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')
  console.log("token: ", token);
  if (!token) {
    return null
  }
  try {
    let data = await fetch("https://feed-pulse-backend.onrender.com/api/metrics/themes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.value}`,
      },
    });
  
    
  
    let res = await data.json();
    console.log("resUser: ", res);
    
    if (res.error) {
      return null
    } else {
      return {
        error: false,
        message: res.message,
        metrics: res,
      };
    }
  } catch (error) {
    console.log("error: ", error);
    return null
  }

}
export const getMetricsDailyRate = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')
  console.log("token: ", token);
  if (!token) {
    return null
  }
  try {
    let data = await fetch("https://feed-pulse-backend.onrender.com/api/metrics/daily-rate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.value}`,
      },
    });
  
    
  
    let res = await data.json();
    console.log("resUser: ", res.rate);
    
    if (res.error) {
      return null
    } else {
      return {
        error: false,
        message: res.message,
        metrics: res.rate,
      };
    }
  } catch (error) {
    console.log("error: ", error);
    return null
  }

}
export const getMetricsSentiment = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')
  console.log("token: ", token);
  if (!token) {
    return null
  }
  try {
    let data = await fetch("https://feed-pulse-backend.onrender.com/api/metrics/sentiments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.value}`,
      },
    });
  
    
  
    let res = await data.json();
    console.log("resUserSentiment: ", res);
    
    if (res.error) {
      return null
    } else {
      return {
        error: false,
        message: res.message,
        metrics: res,
      };
    }
  } catch (error) {
    console.log("error: ", error);
    return null
  }

}