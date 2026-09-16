"use client";
import React from "react";

import { login } from "../action/login";

const loginForm = () => {
  return (
    <form action={login}>
      <select name="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button>login</button>
    </form>
  );
};

export default loginForm;
