"use client";
import React from "react";
import VizdaleLogo from "../shared/vizdaleLogo";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import authenticate from "../../utils/serverActions/login";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Signup } from "../../utils/serverActions/Signup";
import { signIn, useSession } from "next-auth/react";

const LoginForm = () => {
  const [page, setPage] = React.useState("login");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const {data: session} = useSession();

  const router = useRouter();
  let isValid = name && password;

  const formHandler = async (formData) => {
    setLoading(true);
    const { response, error } = await authenticate(formData);
    setLoading(false);
    if (error) {
      setError(error);
    }
    if (response) {
      console.log("check this", response);
      router.push("/");
    }
  };

  const signupHandler = async () => {
    try {
      if (session && session.user) {
        console.log("user is already logged in", session);
        console.log(session.user);
        return router.push("/");
      }
      await signIn("google", {
        callbackUrl: `${process.env.NEXT_PUBLIC_PRODUCTION}/`,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const signupFormHandler = async (formData) => {
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
    <div className="min-h-screen">
      <div className="float-left w-2/6 ml-5 m-auto">
        <VizdaleLogo />
        <h1 className="my-48 ml-24 font-bold text-7xl">Automata</h1>
      </div>
      <div className="flex flex-col mt-8">
        <div className="pl-16 mt-8"> 
          <p className="text-lg font-semibold">Discover and Curate the Web Like Never Before!</p>
          <p className="text-lg font-semibold">Login in to explore</p>
        </div>
        <div
          className={"m-16 w-2/3 " + (page === "signup" ? "mt-6" : "mt-12")}
        >
          <div className="flex flex-row mb-8">
            <button
              className={
                "font-bold w-1/2 ml-4 " +
                (page === "login"
                  ? "bg-black  text-white"
                  : "bg-white  text-black ")
              }
              onClick={() => setPage("login")}
            >
              {" "}
              LOGIN
            </button>
            <button
              className={
                "font-bold py-4 w-1/2 ml-4 " +
                (page === "signup"
                  ? "bg-black  text-white "
                  : "bg-white  text-black ")
              }
              onClick={() => setPage("signup")}
            >
              {" "}
              SIGNUP
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-center font-bold p-1 pb-2">
              {error}
            </p>
          )}
          {page === "login" && (
            <form action={formHandler} onSubmit={() => setLoading(true)}>
              <TextField
                label="Enter your Email"
                variant="outlined"
                required
                placeholder="Enter Your Email"
                type="text"
                name="name"
                className="mb-4 w-3/4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Enter your Password"
                variant="outlined"
                required
                placeholder="Enter Your password"
                type="password"
                className="mb-14 w-3/4"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                className="w-1/2 font-bold py-3"
                type="submit"
                disabled={loading || !isValid}
              >
                {loading ? <CircularProgress /> : "Login"}
              </Button>
            </form>
          )}
          {page === "signup" && (
            <form action={signupFormHandler} onSubmit={() => setLoading(true)}>
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
                className="w-1/2 font-bold py-3"
                type="submit"
                disabled={loading || !isValid}
              >
                {loading ? <CircularProgress /> : "SignUp"}
              </Button>
            </form>
          )}

          <p className="w-full md:w-1/4 my-4 flex justify-center md:justify-end text-gray-300">
            OR
          </p>

          {/* <LoginDescription /> */}
          <Button
            variant="outlined"
            className="w-2/3 font-semibold text-xs md:text-base py-3"
            onClick={signupHandler}
          >
            SIGN UP WITH GOOGLE{" "}
            <span className="pl-1">
              <DraftsIcon color="blue" />{" "}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
