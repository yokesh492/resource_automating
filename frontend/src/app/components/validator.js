'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function validator(){
    const userInfo = cookies().get('userinfo')?.value;
    if(userInfo === undefined ){
        console.log('User not logged in');
        return redirect('/login');
    }
    return userInfo;
}