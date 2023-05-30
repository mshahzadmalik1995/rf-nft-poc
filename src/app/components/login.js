

//import connectToDatabase from "../lib/mongodb"
/*export default function Login () {

    /*async function dbcheck() {
        const client = await connectToDatabase()
        console.log(`client ${client}`);
    }*/
    /*const dbCheck = async() => {
        const client = await connectToDatabase()
        console.log(`client ${client}`)
    }*/
    /*return (
        <div>
            Hi Login Page
            <button >Click this</button>
        </div>
    )
}*/

"use client";

import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const checker = () => {
        alert("hi shahzad")
        router.push("/components/home")
    }
    return (
        <div>
            hi login
            <button className="border bg-gray-500 text-white rounded-md p-2 m-2" onClick={checker}>Click me</button>
        </div>
    )
}

export default Login;