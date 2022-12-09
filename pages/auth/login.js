import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/router';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react';
import { auth } from '../../utils/firebase';

export default function Login(){

    const router = useRouter();

    const [user, loading] = useAuthState(auth);

    // Sign in with Google 
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
        try{
            const result = await signInWithPopup(auth, googleProvider);
            router.push('/')


        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if(user){
                    router.push('/')
                }
        else{
            console.log("login")
        }
    }, [user, router]);

    return(
        <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
            <h2 className="text-2xl font-me">Join today</h2>
            <div className="py-4">
                <h3 className="py-4">Sign in with one of the providers</h3>
                <button onClick={googleLogin} className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2">
                    <FcGoogle className='text-2xl'/>
                    Sign in with google
                </button>
            </div>
        </div>
    )
}