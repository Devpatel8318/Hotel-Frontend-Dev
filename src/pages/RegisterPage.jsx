import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post("/register", {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            })
            alert("User registration Successfull!");
            setNavigate(true);
        }
        catch (e) {
            alert("User registration Failed!");
        }
    }

    if(navigate){
        return <Navigate to={'/login'}/>
    }

    return (
        <div className="flex items-center justify-around mt-4 grow">
            <div className="mb-64">
                <h1 className="mb-4 text-4xl text-center">Register</h1>
                <form onSubmit={ev => registerUser(ev)} className="max-w-md mx-auto">
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="Dev Patel" />
                    <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="your@gmail.com" />
                    <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="password" />
                    <button className="mt-3 primary">Register</button>
                    <div className="py-2 text-center text-gray-500">Already a member?    <Link to={"/login"} className="text-black underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}