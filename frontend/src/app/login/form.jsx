"use client";
import { TextField, Button,CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isValid = email && password;

  const formHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://localhost.com/data', {
        email,
        password,
      });

      if(response.status !== 200) {
        setLoading(false);
        return setError('Invalid credentials');
      }

      setLoading(false);
      router.push('../');
    } catch (error) {
      console.error('Axios error:', error);
    } 
  }
   
  return (
    <div className="bg-white p-8 rounded shadow-lg w-96">
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold pt-2"> Signin</h2>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={formHandler} className="text-center">
        <TextField
          label="Enter your email"
          variant="outlined"
          required
          fullWidth
          type="email"
          className="mb-4"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          className=""
          fullWidth
          type="submit"
          disabled={loading || !isValid}
        >
          {loading ? <CircularProgress /> : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Form;
