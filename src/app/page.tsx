'use client'
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="">
      Hello
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
}
