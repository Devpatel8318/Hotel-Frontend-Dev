import React, { useEffect,useContext } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { UserContext } from '../UserContext'
import PhotosSelectorDev from '../PhotosSelectorDev';
import PerksSelector from '../PerksSelector';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
function PlacesFormPage() {

    const { user} = useContext(UserContext);

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [price, setPrice] = useState(1000);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if (id === undefined) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setDescription(data.descriptions);
            setExtraInfo(data.extraInfo);
            setAddedPhotos(data.photos);
            setAddress(data.address);
            setPerks(data.perks);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id])

    async function savePlace(ev) {
        ev.preventDefault();

        const placeData = {
            title, address, addedPhotos,
            perks, description, extraInfo,
            checkIn, checkOut, maxGuests,price
        }


        if (id) {
            //update
            await axios.put('/places', {
                id, ...placeData
            }, { withCredentials: true });
            alert("Place Updated");
            setRedirect(true);


        } else {
            //new Place
            await axios.post('/places', placeData, { withCredentials: true });
            alert("Place added");
            setRedirect(true);
        }
    }

    if (user === "null") {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                <h2 className='mt-4 text-2xl'>Title</h2>
                <p className='text-sm text-gray-500'>Title for your place, Short and Unique</p>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Title, Example: My Lovely Apartment' />

                <h2 className='text-2xl mt- 4'>Address</h2>
                <p className='text-sm text-gray-500'>Address to your place</p>
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='Address' />

                {/* Photo Selector  */}
                <PhotosSelectorDev addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                <h2 className='mt-4 text-2xl'>Desctiption</h2>
                <p className='text-sm text-gray-500'>Detailed Description of your place</p>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} className='' />

                <h2 className='mt-4 text-2xl'>Perks</h2>
                <p className='text-sm text-gray-500'>Select all Perks of your Place</p>


                {/* Perks */}
                <PerksSelector selected={perks} onChange={setPerks} />

                <h2 className='mt-4 text-2xl'>Extra Info</h2>
                <p className='text-sm text-gray-500'>House Rules, etc..</p>
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />


                <h2 className='mt-4 text-2xl'>Check in&out times </h2>
                <p className='text-sm text-gray-500'>add check in and out times</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-4'>
                    <div>
                        <h3 className='mt-3'>Check in time</h3>
                        <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="number" className='in' placeholder='7' />
                    </div>
                    <div>
                        <h3 className='mt-3'>Check out time</h3>
                        <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="number" className='out' placeholder='17' />
                    </div>
                    <div>
                        <h3 className='mt-3'>Number of Guests</h3>
                        <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number" placeholder='5' />
                    </div>
                    <div>
                        <h3 className='mt-3'>Price per Night</h3>
                        <input value={price} onChange={ev => setPrice(ev.target.value)} placeholder='100' type="number" />
                    </div>
                </div>

                <div>
                    <button className='my-5 primary'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage    