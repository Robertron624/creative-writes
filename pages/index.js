import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import App from 'next/app'
import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Message from '../components/message';
import { db } from '../utils/firebase'

function Home() {

  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, 'post');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
    });
    return unsubscribe;
  }

  useEffect(() => {
    getPosts()
  }, [])


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='my-12 text-lg font-medium'>
          <h2 className=' mb-6 text-5xl'>See what other users are posting</h2>
          {allPosts.map((post) => {
            return(
              <Message key={post.id} {...post}>
                <Link href={{pathname: `/${post.id}`, query: {...post}}}>
                  <button>{post.comments?.length > 0 ? post.comments?.length : 0} Comments</button>
                </Link>
              </Message>
            )
          })}
      </div>

    </div>
  )
}

export default Home;