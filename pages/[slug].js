import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Message from "../components/message";
import { auth, db } from "../utils/firebase";
import {
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    Timestamp,
    updateDoc,
} from "firebase/firestore";

function Details() {
    const router = useRouter();
    const routerData = router.query;
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    const submitMessage = async () => {
        if (!auth.currentUser) return router.push("/auth/login");

        if (!message) {
            toast.error("Please enter a message 😅", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        const docRef = doc(db, "post", routerData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                username: auth.currentUser.displayName,
                timestamp: Timestamp.now(),
            }),
        });
        setMessage("");
    };

    const getCommments = async () => {
        const docRef = doc(db, "post", routerData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAllMessages(snapshot.data().comments);
        });
        return unsubscribe;
    };

    useEffect(() => {
        if (!router.isReady) return;
        getCommments();
    }, [router.isReady]);

    return (
        <div>
            <Message {...routerData}>
                {" "}
                <div className="my-4">
                    <div className="flex justify-center">
                        <input
                            className="bg-gray-800 w-full p-2 text-white text-sm"
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            value={message}
                            placeholder="Write your comment here 😀."
                        />
                        <button
                            onClick={submitMessage}
                            className="bg-cyan-500 text-white py-2 px-4 text-sm"
                        >
                            Submit
                        </button>
                    </div>
                    <div className="py-6">
                        <h2 className="font-bold mb-7">{allMessages.length} Comments</h2>
                        {allMessages.map((comment, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-4 my-4 border-2"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <img
                                            src={comment.avatar}
                                            alt="user icon"
                                            className=" w-10 rounded-full"
                                        />
                                        <h2 className=" mx-1 text-sm font-bold">
                                            {comment.username}
                                        </h2>
                                    </div>
                                    <h2>{comment.message}</h2>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Message>
        </div>
    );
}

export default Details;
