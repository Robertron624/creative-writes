import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Post() {
  // Form state
  const [post, setPost] = useState({ description: "" });

  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  const updateData = router.query;

  const submitPost = async (e) => {
    e.preventDefault();


    // Checks before submitting

    if(!post.description){
        toast.error("Please enter a description 😅", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
        return;
    }

    if(post.description.length > 300){
        toast.error("Description is too long 😅", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
        return;
    }

    if(post?.hasOwnProperty('id')){
      const docRef = doc(db, 'post', post.id);
      const updatedPost = {...post, timestamp : serverTimestamp()};
      await updateDoc(docRef, updatedPost)
      return router.push('/')
    }
    else{
      // Post new post to database
      const collectionRef = collection(db, "post");
  
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
  
      setPost({
            description: "",
      });

      toast.success("Post submitted 🚀🚀🚀", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      })

      return router.push('/')
    }
  };

  const checkUser = () => {
      if(loading) return;
      if(!user) return router.push('/auth/login');
      if(updateData.id){
        setPost({description: updateData.description, id: updateData.id})
      }
  }

  useEffect(() => {
    checkUser()
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty('id') ? "Edit your post" : "Create a new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Post;
