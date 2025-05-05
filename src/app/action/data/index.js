"use server";


export const addData = async (start, formData) => {

  const data = formData.get("data");

  if (!data) {
    return {
      error: true,
      message: "Please fill in all fields.",
    };
  }
  

  console.log(data);

  return {
    error: false,
    message: "Registration successful",
  };

  // ... rest of the code remains the same
};

