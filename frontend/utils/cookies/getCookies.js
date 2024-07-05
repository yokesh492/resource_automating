'use server'
import { cookies } from 'next/headers';

export async function getCookies(name) {
    const resp = JSON.parse(cookies().get(name)?.value ?? 'null');
    
    if (resp === null) return false;
    return resp;
}
