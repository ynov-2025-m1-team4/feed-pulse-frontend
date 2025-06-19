"use server";
import { cookies } from "next/headers";


export const getFeed= async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')
  console.log("token: ", token);
  if (!token) {
    return null
  }
  try {
    let data = await fetch("https://feed-pulse-backend.onrender.com/api/feedbacks/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.value}`,
      },
    });
  
    
  
    let res = await data.json();
    console.log("resUserFeed: ", res);
    
    if (res.error) {
      return null
    } else {
      return {
        error: false,
        message: res.message,
        provider: res,
      };
    }
  } catch (error) {
    console.log("error: ", error);
    return null
  }

}
export const getFeedById= async (id) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')
  console.log("token: ", token);
  if (!token) {
    return null
  }
  try {
    let data = await fetch(`https://feed-pulse-backend.onrender.com/api/feedbacks?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.value}`,
      },
    });
  
    
  
    let res = await data.json();
    console.log("resUserFeedById: ", res);
    
    if (res.error) {
      return null
    } else {
      return {
        error: false,
        message: res.message,
        provider: res,
      };
    }
  } catch (error) {
    console.log("error: ", error);
    return null
  }

}