'use server';
import { cookies } from 'next/headers';
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

export async function setJWTCookies(name, data) {
    const expires = new Date(Date.now() + 60 * 60 * 24 * 3 * 1000);
    const session = await encrypt({ data, expires });
    
    cookies().set(name, session, {
        maxAge: 60 * 60 * 24 * 3, 
        path: '/',
    });
}

export async function setUserCookies(name, data) {
    const serializedData = JSON.stringify(data);
    cookies().set(name, serializedData, {
        maxAge: 60 * 60 * 24 * 3, 
        path: '/',
    });
}
