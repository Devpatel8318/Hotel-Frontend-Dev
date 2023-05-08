import React, { useEffect, useContext,useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import AccountNav from '../AccountNav';
import axios from 'axios';
import { UserContext } from '../UserContext'


function PlacesPage() {

    const { user} = useContext(UserContext);
    const [places, setPlaces] = useState([]);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get('/userplaces', { withCredentials: true }).then(({ data }) => {
            setPlaces(data);
            setReady(true);
            setLoading(false);

        })
    }, [])

    if (user === "null") {
        return <Navigate to={'/login'} />
    }

    if (loading) {
        //loader
        return <div>
            <div className="fixed top-0 right-0 z-50 flex items-center justify-center w-screen h-screen">
                <div className="w-32 h-32 border-t-2 border-b-2 rounded-full animate-spin border-rose-700"></div>
            </div>
        </div>
    }


    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link to={'/account/places/new'} className='inline-flex gap-1 px-6 py-2 text-white rounded-full bg-primary' >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    Add new Places</Link>
                <div className='mt-4'>
                    {places.length > 0 && ready && Array.isArray(places) && places.map(place => (
                        <Link to={'/account/places/' + place._id} key={place._id} className='flex gap-4 p-4 text-left mb-6 bg-gray-100 cursor-pointer rounded-lg'>
                            <div className="hidden sm:flex w-36 h-36 bg-gray-300 rounded-lg shrink-0">
                                {place.photos.length > 0 ? (
                                    <img className='object-cover rounded-lg grow' src={place.photos[0]} alt="" />
                                ) :
                                    (
                                        <img className='object-cover' src={place.photos[0]} alt="" />
                                    )
                                }
                            </div>
                            <div className='overflow-hidden grow-0'>
                                <h2 className='text-xl'>{place.title}</h2>
                                <div>
                                    <p className='mt-2 text-sm overflow-ellipsis line-clamp-4'>{place.descriptions}</p>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default PlacesPage;   