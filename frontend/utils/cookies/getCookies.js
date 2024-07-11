'use server'
import { cookies } from 'next/headers';

export async function getCookies(name) {
    const val = (cookies().get(name)?.value);
    if (val === '') return false;
    const resp = JSON.parse(val ?? 'null');
    
    return resp;
}
