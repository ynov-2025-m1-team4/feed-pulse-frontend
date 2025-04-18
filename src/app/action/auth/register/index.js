"use server";

export const register = async (start, formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");

  if (!name || !email || !email || !password || !confirmPassword) {
    return { message: "Please fill in all fields." };
  }
  if (password !== confirmPassword) {
    return { message: "Passwords do not match." };
  }

  console.log(name, email, password, confirmPassword);

  // ... rest of the code remains the same
};
