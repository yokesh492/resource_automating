"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.NEXT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3 days from now")
    .sign(key);
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export const authenticate = async (formData) => {
    const data = {
        username: formData.get('name'),
        password:formData.get('password'),
      };
    try {
        const response = await axios.post('http://91.108.104.64:8001/login', data);
        const userInfo = response.data;
        const serializedUserInfo = JSON.stringify(userInfo);


        const expires = new Date(Date.now() + 60 * 60 * 24 * 3 * 1000);
        const session = await encrypt({ data, expires });

      if (response.status === 200 && !response.data.error) {
            cookies().set('session',session,{
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 3, 
                path: '/',
            })
            cookies().set('userinfo',serializedUserInfo,{
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 3, 
                path: '/',
            })
            return {response:'s',error:null}
        }
        else{
            return {response: null, error: response.data.error || 'Login failed'};
        }
        
      } catch (error) { 
          console.error('Axios error: authenticatoin', error);
          return {response: null, error: error.response?.data?.detail || 'Login failed'};
      }
    };
      
      export async function logout() {
        cookies().set("session", "", { expires: new Date(0) });
      }
      
      export async function getSession() {
        const session = cookies().get("session")?.value;
        if (!session) return null;
        return await decrypt(session);
      }

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 24 * 3 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
