import { Navigate,useParams } from 'react-router-dom';
import { UserContext } from '../UserContext'
import React, { useContext, useState } from 'react'
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';




function ProfilePage() {
    const { user, ready, setUser } = useContext(UserContext);
    const [toHomePage, setToHomePage] = useState(null);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile"
    }

    async function logout() {
        try {

            await fetch("http://localhost:4000/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            }).then((res) => res.json())
                .then((data) => {
                   console.log("Logged out");
                })
        }
        catch (e) {
            console.log(e);
        }
        alert("logged out")
        setUser(null);
        setToHomePage('/')

        //  const res=  await axios.post('/logout');
        //  console.log(res);
    }


    if (!ready) {
        //loader
        return <div>
            <div className="fixed top-0 right-0 z-50 flex items-center justify-center w-screen h-screen">
                <div className="w-32 h-32 border-t-2 border-b-2 rounded-full animate-spin border-rose-700"></div>
            </div>
        </div>
    }

    if (ready && user === "null" && !toHomePage) {
        return <Navigate to={'/login'} />
    }

    

    if (toHomePage) {
        return <Navigate to={toHomePage} />
    }

    return (
        <div>
            
            <AccountNav />

            {subpage === "profile" && (
                <div className='max-w-lg mx-auto text-center'>
                    logged in as {user.name} {user.email} <br />
                    <button onClick={logout} className='max-w-sm mt-2 primary'>Logout</button>

                </div>
            )}

            {subpage === "places" && (
                <PlacesPage />
            )}
        </div>
    )
}

export default ProfilePage;