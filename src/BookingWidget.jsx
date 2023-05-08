
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);


    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        const data = {
            checkIn, checkOut, name, phone, numberOfGuests,
            place: place._id, price: numberOfNights * place.price,
        };
        await axios.post('/bookings', data, { withCredentials: true });
        // const response = await axios.post('/bookings', data, { withCredentials: true });
        // const bookingId = response.data._id;
        // setRedirect(`/account/bookings/${bookingId}`);
        setRedirect('/account/bookings');
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className='p-4 bg-white shadow rounded-2xl'>
            <div className='text-2xl text-center'>
                Price: ₹{place.price} / Night
            </div>

            <div className="border rounded-2xl">
                <div className="flex flex-col border-b sm:border-b sm:flex-row">
                    <div className="px-4 py-3 border-b sm:border-none">
                        <label>Check in:</label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="px-4 py-3  sm:border-l ">
                        <label>Check out:</label>
                        <input type="date" value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="px-4 py-3">
                    <label>Number of guests:</label>
                    <input type="number"
                        value={numberOfGuests}
                        onChange={ev => {
                            const value = ev.target.value;
                            if (value >= 1 && value <= place.maxGuests) {
                                setNumberOfGuests(value);
                            } else if (value < 0) {
                                setNumberOfGuests(0);
                            } else {
                                setNumberOfGuests(3);
                            }
                        }} />
                </div>
                {numberOfNights > 0 && (
                    <div className="px-4 py-3 border-t">
                        <label>Your full name:</label>
                        <input type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)} placeholder="Dev Patel" />
                        <label>Phone number:</label>
                        <input type="tel"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)} placeholder="87658 43253" />
                    </div>
                )}
            </div>


            <button onClick={bookThisPlace} className="mt-4 primary">Book this Place
                {numberOfNights > 0 && (
                    <span> ₹{numberOfNights * place.price}</span>
                )}
            </button>

        </div>
    )
}

export default BookingWidget