"use server";
import { cookies } from "next/headers";
export const addData = async (start, formData) => {
   const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const url = formData.get("data");
  const name = "data"

  if (!url) {
    return {
      error: true,
      message: "Please fill in all fields.",
    };
  }
 

  try {
    let data = await fetch(
      "https://feed-pulse-backend.onrender.com/api/providers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          name,
          url
        }),
      }
    );

    console.log("data: ", data.body);

    let res = await data.json();
    console.log(res);

    if (res.error) {
      return {
        error: true,
        message: res.message,
      };
    } else {
      return {
        error: false,
        message: "Data add successful",
        redirect: "/",
      };
    }
  } catch (error) {
    console.log("error: ", error);
    return {
      error: true,
      message: `Error: ${error}`,
    };
  }

  // ... rest of the code remains the same
};
