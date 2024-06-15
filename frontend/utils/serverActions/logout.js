'use server';
import { cookies } from 'next/headers';

export default async function logout() {
    cookies().set("session", "", { expires: new Date(0) });
    cookies().set("userinfo", "", { expires: new Date(0) });
}