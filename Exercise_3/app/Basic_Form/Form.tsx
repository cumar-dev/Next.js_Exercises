"use client";

import { useActionState } from "react";
import { logEmail } from "./Action";
const initialState = {
  success: false,
  message: "",
  error: "",
};
const Form = () => {
  const [state, formAction] = useActionState(logEmail, initialState);
  return (
    <>
      <form action={formAction}>
        <input type="email" name="email" />
        <button type="submit">submit</button>
      </form>
      {state.success && <p className="text-green-700">{state.message}</p>}
      {!state.success && state.error && <p>{state.error}</p>}
    </>
  );
};

export default Form;
