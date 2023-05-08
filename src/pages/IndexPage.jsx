import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage() {

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get('/places').then((response) => {
            setLoading(false);
            setPlaces(response.data);
        });

    }, [])


    if (loading) {
        //loader
        return <div>
            <div className="fixed top-0 right-0 z-50 flex items-center justify-center w-screen h-screen">
                <div className="w-32 h-32 border-t-2 border-b-2 rounded-full animate-spin border-rose-700"></div>
            </div>
        </div>
    }


    return (
        <div className="grid sm:px-2 md:px-10 lg:px-30 grid-cols-2 mt-8 gap-x-2 gap-y-8 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                // <Link to={'/place/'+place._id}>
                <Link to={'/place/' + place._id} key={place._id} >
                    <div className="flex mb-2 bg-gray-500 rounded-2xl">
                        {place.photos?.[0] && (
                            <img className="object-cover rounded-2xl aspect-square" src={place.photos?.[0]} alt="" />
                        )}
                    </div>
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-sm text-gray-500">{place.title}</h3>
                    <div className="mt-1">
                        <span className="font-bold">₹{place.price}</span> per Night
                    </div>
                </Link>
            ))}
        </div>
    )
}