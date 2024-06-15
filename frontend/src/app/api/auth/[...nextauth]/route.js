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
    async signIn(user, account, profile) {

        const resp = await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION}/signup_with_google`, {
            email: user.email,
            username: user.name,
            image:user.image,
        });
        console.log(resp.data);

        // const resp = {data:{userid:1, username:'test', error:null,image:'https://unsplash.com/photos/woman-with-dslr-camera-e616t35Vbeg'}, status:200};

        if (resp.data.error || resp.status !== 200) {
            console.log('error in signin');
            return false;
        }
        await setUserCookies('userinfo', {userid:resp.data.userid, username:resp.data.username});
        await setJWTCookies('session', {userid:resp.data.userid, username:resp.data.username});
        return true;
    },
},
 session: {
  strategy: 'jwt',
 },
};

const handler =NextAuth(authOptions) 
export { handler as POST, handler as GET};
