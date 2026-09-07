"use server";

type formState = {
  success: boolean;
  message: string;
  error: string;
};

export const logEmail = async (
  prevState: formState,
  formData: FormData,
): Promise<formState> => {
  const email = formData.get("email") as string;
  if (!email || email.trim() === "") {
    return { success: false, message: "", error: "email is required" };
  }
  return { success: true, message: `thanks for submitting...`, error: "" };
};

export const passwordChecker = async (
  prevState: formState,
  formData: FormData,
): Promise<formState> => {
  const password = formData.get("password") as string;
  if (!password || password.length < 6) {
    return {
      success: false,
      message: "",
      error: "Password must be at least 6 characters",
    };
  }
  return { success: true, message: password, error: "" };
};

export const quessionare = async (
  prevState: formState,
  formData: FormData,
): Promise<formState> => {
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  if (!firstName.trim() || !lastName.trim()) {
    return {
      success: false,
      message: "",
      error: "first name and last name is required",
    };
  }
  return {
    success: true,
    message: `Hello ${firstName}, ${lastName}`,
    error: "",
  };
};
