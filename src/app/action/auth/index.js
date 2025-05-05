"use server";

export const register = async (start, formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");

  if (!name || !email || !email || !password || !confirmPassword) {
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

  console.log(name, email, password, confirmPassword);

  return {
    error: false,
    message: "Registration successful",
  };

  // ... rest of the code remains the same
};

export const login = async (start, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: true,
      message: "Please fill in all fields.",
    };
  }

  console.log(email, password);

  return {
    error: false,
    message: "Login successful",
  };

  // ... rest of the code remains the same
};
