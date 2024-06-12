"use client";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import authenticate from "../../utils/serverActions/login";
import VizdaleLogo from "../shared/vizdaleLogo";
import DraftsIcon from "@mui/icons-material/Drafts";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isValid = name && password;

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
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col w-full md:w-3/5 text-center md:text-start justify-center">
        <div className="mt-10 m-auto mb-10 md:mb-0 md:ml-56">
          <VizdaleLogo />
        </div>

        <div className="m-auto md:text-start w-full md:w-1/2 px-4">
          <h2 className="font-bold text-3xl"> Login</h2>
          <hr className="mb-6 mt-4" />
          {error && 
          <p className="text-red-500 text-center font-bold p-1 pb-2">{error}</p>
        }
          <form action={formHandler} onSubmit = {() => setLoading(true)} >
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

          <p className="w-full md:w-1/4 my-4 flex justify-center md:justify-end text-gray-300">OR</p>
          <Button
            variant="outlined"
            className="w-2/3 font-semibold text-xs md:text-base py-3"
            type="submit"
          >
            SIGN UP WITH GOOGLE{" "}
            <span className="pl-1">
              <DraftsIcon color="blue" />{" "}
            </span>
          </Button>
        </div>
      </div>

      <div className="w-0 md:w-2/5">
        <Image
          className="w-full h-full"
          src="/Hand.jpg"
          alt="hand"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

//   return (
//     <div className="bg-white mx-auto rounded p-2 shadow-lg w-96">
//       <h2 className="text-blue-600 text-3xl font-bold pt-2 text-center">
//         {" "}
//         Vizdale
//       </h2>
//       <div className="p-6 pt-3">
//         <div className={`text-center ${error ? "pb-2" : "pb-4"}`}>
//           <h2 className="text-black text-2xl font-bold pt-2"> Signin</h2>
//         </div>
//         <hr />
//         {error && (
//           <p className="text-red-500 text-center font-bold p-1 pb-2">{error}</p>
//         )}

//         <form action={formHandler} onSubmit = {() => setLoading(true)} className="text-center">
//           <TextField
//             label="Enter your username"
//             variant="outlined"
//             required
//             fullWidth
//             type="text"
//             name="name"
//             className="mb-4"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <TextField
//             label="Enter your password"
//             variant="outlined"
//             required
//             fullWidth
//             type="password"
//             className="mb-4"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             className=""
//             fullWidth
//             type="submit"
//             disabled={loading || !isValid}
//           >
//             {loading ? <CircularProgress /> : "Login"}
//           </Button>
//         </form>

//         <div className="text-center pt-4">
//           <p>
//             Do not have an account?
//             <a href="/signup" className="text-blue-500 hover:underline">
//               Signup
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

export default LoginForm;
