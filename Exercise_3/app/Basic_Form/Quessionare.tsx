import React, { useActionState } from "react";
import { quessionare } from "./Action";

const initialState = {
  success: false,
  message: "",
  error: "",
};
const Quessionare = () => {
  const [state, formAction] = useActionState(quessionare, initialState);
  return (
    <>
      <form action={formAction}>
        <input type="text" name="first-name" />
        <input type="text" name="last-name" />
        <button type="submit">submit</button>
      </form>
      {state.success && <p className="text-green-700">{state.message}</p>}
      {!state.success && state.error && <p>{state.error}</p>}
    </>
  );
};

export default Quessionare;
