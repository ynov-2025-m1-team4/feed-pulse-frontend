"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as Sentry from "@sentry/nextjs";


export const register = async (start, formData) => {
  const cookieStore = await cookies();
  const pseudo = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");

  if (!pseudo || !email || !email || !password || !confirmPassword) {
    return {
      error: true,
      message: "Please fill in all fields.",
    };
  }
  if (password !== confirmPassword) {
    return {
      error: true,
      message: "Passwords do not match.",
    };
  }

  console.log(
    typeof pseudo,
    pseudo,
    typeof email,
    email,
    typeof password,
    password,
    confirmPassword
  );
  const sendData = new FormData();
  sendData.append("pseudo", pseudo);
  sendData.append("email", email);
  sendData.append("password", password);

  console.log(
    "sendData",
    JSON.stringify({
      pseudo,
      email,
      password,
    })
  );

  try {
    let data = await fetch(
      "https://feed-pulse-backend.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pseudo,
          email,
          password,
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
      cookieStore.set({
        name: "token",
        value: res.accessToken,
        httpOnly: true,
        path: "/",
      });
      return {
        error: false,
        message: "Registration successful",
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
};

export const login = async (start, formData) => {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: true,
      message: "Please fill in all fields.",
    };
  }

  console.log(email, password);

  try {
    let data = await fetch(
      "https://feed-pulse-backend.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    console.log("data: ", data);

    let res = await data.json();
    console.log("le resutat", res.accessToken);

    if (res.error) {
      return {
        error: true,
        message: res.message,
      };
    } else {
      cookieStore.set({
        name: "token",
        value: res.accessToken,
        httpOnly: true,
        path: "/",
      });
      return {
        error: false,
        message: "Login successful",
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
export const logout = async () => {
  const cookieStore = await cookies();
  console.log("cookieStore: ", cookieStore.get("token"));

  cookieStore.delete("token");

  redirect("/auth/login");
};

export const getUser = async () => {
  const transaction = Sentry.startTransaction({
    name: "Fetch Feedbacks",
    op: "http.client",
  });
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return null;
  }
  try {
    let data = await fetch(
      "https://feed-pulse-backend.onrender.com/api/users/me",
      {
        method: "GET",
        headers: {
          "Sentry-Trace": transaction,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    let res = await data.json();
    console.log("resUser: ", res);

    if (res.error) {
      Sentry.captureException(res.error)
      return null;
    } else {
      return {
        error: false,
        message: res.message,
        user: res,
      };
    }
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
