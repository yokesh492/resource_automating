"use client";
import { TextField, Button,CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate } from "./authentication";

const Form = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isValid = name && password;

  const formHandler = async(formData) => {
    setLoading(true);
    const {response,error} = await authenticate(formData); 
    setLoading(false);

    if(error){
      setError(error);
    }
    if(response){
      console.log(response);
      router.push('/');
    }


  }
   
  return (
    <div className="bg-white rounded p-2 shadow-lg w-96">
        <h2 className="text-blue-600 text-3xl font-bold pt-2 text-center"> Vizdale</h2>
        <div className="p-6 pt-3">
      <div className="text-center pb-4">
        <h2 className="text-black text-2xl font-bold pt-2"> Signin</h2>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <form action={formHandler} className="text-center">
        <TextField
          label="Enter your email / username"
          variant="outlined"
          required
          fullWidth
          type="string"
          name="name"
          className="mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          
        </div>
  );
};

export default Form;
