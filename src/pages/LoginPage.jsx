import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(null);
    const { setUser } = useContext(UserContext)

    async function userLogin(ev) {
        try {
            ev.preventDefault();
            //     const data = await axios.post('/login', {
            //         email, password
            //     }, {
            //         headers: {
            //             "Content-Type": "application/json",
            //             Accept: "application/json",
            //             "Access-Control-Allow-Origin": "*",
            //         }
            //     })
            //     document.cookie = `token=${data.data.data};path=/;expires=${new Date(Date.now() + 15 * 60 * 1000).toUTCString()}`;
            //     console.log(data.data);
            //     const userData = data.data.userDoc;
            //     console.log(userData)
            //     setUser(userData);
            //     setRedirect(true)
            //     alert('Login successful');


            const req = await fetch("http://localhost:4000/login", {
                method: "POST",
                // credentials:false,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            const data = await req.json();
            const userDoc = data.userDoc;
            // console.log(userDoc);
            setUser(userDoc);
            setRedirect(true)
            
            
            alert('Login successful');

        }
        catch (e) {
            alert("Login Failed");
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }

    return (
        <div className="flex items-center justify-around mt-4 grow">
            <div className="mb-64">
                <h1 className="mb-4 text-4xl text-center">Login</h1>
                <form onSubmit={ev => userLogin(ev)} className="max-w-md mx-auto">
                    <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="your@gmail.com" />
                    <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="password" />
                    <button className="mt-3 primary">Login</button>
                    <div className="py-2 text-center text-gray-500">Don't have an Account yet?    <Link to={"/register"} className="text-black underline">Regsiter Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}