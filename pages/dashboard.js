import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { useEffect, useState} from 'react'
import { collection, query, deleteDoc, doc, onSnapshot, where } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai'
import Message from '../components/message';
import { async } from '@firebase/util';

function Dashboard(){
    const router = useRouter()
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    const getData = () => {
        if(loading) return;
        if(!user) return router.push('/auth/login')

        const collectionRef = collection(db, 'post');
        const q = query(collectionRef, where('user', '==', user.uid))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })

        return unsubscribe;
    }

    useEffect(() => {
            getData();
    }, [user, loading])

    const logOut = () => {
        auth.signOut();
    }

    // Delete post
    const deletePost = async (id) => {
        const docRef = doc(db, 'post', id);
        await deleteDoc(docRef);
    }

    return(
        <div>
            <h1 className='text-5xl mx-7 mb-5'>Your posts!</h1>
            <div>
                {posts?.map((post) => {
                    return(
                        <Message key={post.id} {...post}>
                            <div className='flex gap-4'>
                                <button onClick={() => deletePost(post.id)} className='text-pink-600 flex items-center justify-center gap-2 py-2 text-sm'><BsTrash2Fill className='text-2xl'/>Delete</button>
                                <button className='text-teal-600 flex items-center justify-center gap-2 py-2 text-sm'><AiFillEdit className='text-2xl'/>Edit</button>
                            </div>
                        </Message>
                    )
                })}
            </div>
            <button className='font-medium text-white bg-gray-800 py-2 px-4 my-6 ml-4' onClick={logOut}>Sign out</button>
        </div>
    )
}

export default Dashboard;

