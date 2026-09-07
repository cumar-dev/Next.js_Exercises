"use client"
import React, { useActionState } from "react";
import { passwordChecker } from "./Action";
const initialState = {
  success: false,
  message: "",
  error: "",
};
const Password = () => {
  const [state, formAction] = useActionState(passwordChecker, initialState);
  return (
    <form action={formAction}>
      <input type="password" name="password" />
      <button type="submit">submit</button>
      {state.success && <p className="text-green-700">{state.message}</p>}
      {!state.success && state.error && <p>{state.error}</p>}
    </form>
  );
};

export default Password;
