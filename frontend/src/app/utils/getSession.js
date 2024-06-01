"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const getSession = () => {
    
  const cookieStore = cookies()
  const session = cookieStore.get("session")
  console.log({session})
  
  if(!session){
    redirect("/login")
  }
}