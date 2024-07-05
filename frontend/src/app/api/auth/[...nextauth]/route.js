import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { setJWTCookies, setUserCookies } from '../../../../../utils/cookies/setCookies';

const authOptions = {
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_ID,
   clientSecret: process.env.GOOGLE_SECRET,
  }),
 ],
 callbacks:{
    async signIn(user) {
        console.log('Querying signin')
        console.log(user,'user');
        console.log(user.user,'account, profile');
        const data = {
            email: user.user.email,
            username: user.user.name,
        }
        console.log(data);
        try{
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION}/signup_with_google`,data);
            
            console.log(resp.data,'response from backend');
    
            // const resp = {data:{userid:1, username:'test', error:null,image:'https://unsplash.com/photos/woman-with-dslr-camera-e616t35Vbeg'}, status:200};
    
            if (resp.data.error || resp.status !== 200) {
                console.log('error in signin');
                return false;
            }

            console.log('Setting cookies')
            await setUserCookies('userinfo', {userid:resp.data.userid, username:resp.data.username});
            await setJWTCookies('session', {userid:resp.data.userid, username:resp.data.username});
            console.log('Cookies set')
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },
},
 session: {
  strategy: 'jwt',
  maxAge: 3*24*60*60, 
 },
 jwt:{
    maxAge: 3*24*60*60,
 }
};

const handler =NextAuth(authOptions) 
export { handler as POST, handler as GET};
