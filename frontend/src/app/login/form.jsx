"use client";
import { TextField, Button,CircularProgress } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { pink } from "@mui/material/colors";
import { toast } from "react-hot-toast";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "../utils/signIn";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValid = email && password;

  const formHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn(email, password);
    console.log(result,'result')

    if(result?.error){
      toast.error(result.error.message);
      setLoading(false);
      return;
    }
    
    toast.success("Signin successful");
    return router.push("/admin/site-survey-forms");
  }
   
  return (
    <div className="bg-white p-8 rounded shadow-lg w-96">
      <div className="text-center pb-4">
        <LockIcon sx={{ color: pink[500] }}>x</LockIcon>
        <h2 className="text-2xl font-bold pt-2"> Signin</h2>
      </div>

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
