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
            const req = await fetch("https://hotel-dev-backend.onrender.com/login", {
                method: "POST",
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
            console.log(req.status);

            const data = await req.json();
            console.log(data);
            if (data.mymessage === "ok") {
                const userDoc = data.userDoc;
                alert("Logged In")
                setUser(userDoc);
                setRedirect(true);
            }
            else {
                alert(data.mymessage);
            }
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