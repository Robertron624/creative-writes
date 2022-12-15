import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function Nav() {
  const [user, loading] = useAuthState(auth);

//   console.log(user)

  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="text-7xl">Creative minds</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <button className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
              Join now
            </button>
          </Link>
        )}
        {user && (
            <li className="flex items-center gap-6">
                <Link href={"/post"}>
                  <button className="font-medium rounded-md py-2 px-14 text-sm text-white bg-cyan-500">Post</button>
                </Link>
                <Link href={"/dashboard"}>
                  <img className="rounded-full w-9 cursor-pointer" alt="user profile icon" src={user.photoURL}/>
                </Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
}

export default Nav;