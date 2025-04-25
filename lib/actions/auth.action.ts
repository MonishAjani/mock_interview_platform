'use server';

import {db, auth} from "@/firebase/admin";
import {cookies} from "next/headers";

const ONE_WEEK = 60 * 60 * 24;

export async function signUp(params: SignUpParams) {
     const {uid, name, email} = params;

     try{
         const userRecord = await db.collection('users').doc(uid).get();

         if(userRecord.exists){
             return{
                 success: false,
                 message:"Email already exists.Please sign in instead"
             }
         }

         await db.collection('users').doc(uid).set({
             name,email
         })

         return{
             success: true,
             message:'Account successfully registered.Please sign in.'
         }
     }catch(e: any){
         console.error('Error creating a user',e);

         if(e.code === 'auth/email-already-exists'){
             return {
                 success: false,
                 message: `User already exists`,
             }
         }

         return {
             success: false,
             message : ' Failed creating user',
         }
     }
}

export async function signIn(params: SignInParams) {
    const {email, idToken} = params;

    try{
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return {
                success: false,
                message:'User Does not exist. Create user',
            }
        }

        await setSessionCookie(idToken);
    }catch (e) {
        console.log(e);

        return {
            success: false,
            message: 'Failed to login'
        }
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore =await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn: ONE_WEEK * 1000,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}