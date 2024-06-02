"use client";
import { TextField, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Signup } from "./Signup";

const Form = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  let isValid = name && password && confirmPassword && email;

  const formHandler = async (formData) => {

    if (password !== confirmPassword) {
      isValid = false;
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const { response, error } = await Signup(formData);
    setLoading(false);

    if (error) {
      setError(error);
    }
    if (response) {
      console.log("check this", response);
      router.push("/login");
    }
  };

  return (
    <div className="bg-white rounded p-2 shadow-lg w-96">
      <h2 className="text-blue-600 text-3xl font-bold pt-2 text-center">
        {" "}
        Vizdale
      </h2>
      <div className="p-6 pt-3">
        <div className={`text-center ${error ? "pb-2" : "pb-4"}`}>
          <h2 className="text-black text-2xl font-bold pt-2"> Signup</h2>
        </div>
        {error && (
          <p className="text-red-500 text-center font-bold p-1 pb-2">{error}</p>
        )}
        <form action={formHandler} className="text-center">
          <TextField
            label="Enter your name"
            variant="outlined"
            required
            fullWidth
            type="text"
            name="name"
            className="mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Enter your email"
            variant="outlined"
            required
            fullWidth
            type="email"
            className="mb-4"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Enter your password"
            variant="outlined"
            required
            fullWidth
            type="password"
            className="mb-4"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm your password"
            variant="outlined"
            required
            fullWidth
            type="password"
            className="mb-4"
            name="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading || !isValid}
          >
            {loading ? <CircularProgress /> : "SignUp"}
          </Button>
        </form>
        <div className="text-center pt-4">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
