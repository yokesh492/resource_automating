'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default async function logout() {
    cookies().set("session", "", { expires: new Date(0) });
    cookies().set("userinfo", "", { expires: new Date(0) });
    redirect('/login');
}