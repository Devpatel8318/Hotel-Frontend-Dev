import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import BookingWidget from '../BookingWidget';
import { UserContext } from "../UserContext.jsx";


function SinglePlace() {


    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [name, setName] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);




    //Escape key handler  //stackoverflow
    const myFunction = () => {
        setShowAllPhotos(false);
    };

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.keyCode === 27) {
                event.preventDefault();
                myFunction();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
        

    }, []);


    //id fetcher
    useEffect(() => {
        if (!id) {
            return;
        }
        else {
            axios.get('/places/' + id).then(res => {
                setPlace(res.data);
                setLoading(false);
            });
        }

    }, [id]);

    if (loading) {
        //loader
        return <div>
            <div className="fixed top-0 right-0 z-50 flex items-center justify-center w-screen h-screen">
                <div className="w-32 h-32 border-t-2 border-b-2 rounded-full animate-spin border-rose-700"></div>
            </div>
        </div>
    }

    if (!place) {
        return '';

    }

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 min-h-screen text-white bg-black">
                <div className="grid pt-12 gap-4 p-8 sm:px-20 md:px-56 sm:py-8 bg-black">
                    <div>
                        <h2 className="sm:mr-48 text-xl md:mr-48 sm:text-2xl md:text-5xl">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed flex px-2 py-1 gap-1 items-center sm:px-4 sm:py-2 text-black bg-white shadow top-2 right-2 sm:right-12 sm:top-8 rounded-2xl shadow-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            <span className=' text-sm sm:text-base'>Close photos</span>
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div className='flex'>
                            <img className='grow w-full object-cover' src={photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }


    function PerksSelector(name) {
    
            const classes = "flex items-center gap-2 p-4 py-6 border cursor-pointer rounded-2xl";
            if(place.perks.includes(name)){
                
                return classes;
            }else{
                return "hidden";
            }

            
    }

        return (
            <div className='px-8 pt-8 mt-4 -mx-8 bg-gray-100 lg:px-40 md:px-10'>
                <h1 className='text-3xl '>{place.title}</h1>
                <a target="_blank" rel='noreferrer' href={'https://maps.google.com/?q=' + place.address} className='flex gap-1 my-3 font-semibold underline'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                    {place.address}
                </a>
                <div className="relative">
                    <div className="grid rounded-3xl shadow-lg shadow-gray-400 overflow-hidden gap-2 grid-cols-[2fr_1fr]">
                        <div>
                            {place.photos?.[0] && (
                                <div className='flex'>
                                    <img alt='' onClick={() => setShowAllPhotos(true)} className='object-cover cursor-pointer aspect-square grow' src={place.photos[0]} />
                                </div>
                            )}
                        </div>
                        <div className='grid'>
                            <div className="flex w-full">
                                {place.photos?.[1] && (
                                    <img alt='' onClick={() => setShowAllPhotos(true)} className='object-cover cursor-pointer grow aspect-square ' src={place.photos[1]} />
                                )}
                            </div>
                            <div className='overflow-hidden'>
                                {place.photos?.[2] && (
                                    <img alt='' onClick={() => setShowAllPhotos(true)} className='relative object-cover cursor-pointer aspect-square top-2' src={place.photos[2]} />
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowAllPhotos(true)} className='absolute  flex gap-1 px-4 py-2 bg-white shadow-md shadow-gray-500 bottom-2 right-2 rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hidden sm:block">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                        </svg>
                        <span className='text-xs sm:text-base'>Show more photos</span>

                    </button>
                </div>

                <div className='grid mb-8 mt-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
                    <div>
                        <div className="my-4">
                            <h2 className='text-2xl font-semibold'>Description</h2>
                            <div className="line-clamp-6">
                                {place.descriptions}

                            </div>
                        </div>
                        Check-in: {place.checkIn}<br />
                        Check-out: {place.checkOut}<br />
                        Max number of guests: {place.maxGuests}
                    </div>
                    {(user?.name !== undefined) ? (
                        <div>
                            <BookingWidget place={place} />
                        </div>
                    ) : (
                        <div className='p-4 bg-white shadow flex flex-col  justify-between rounded-2xl'>
                            <div className='text-2xl text-center'>
                                <span>Price: ₹{place.price}</span> / Night
                            </div>
                            <button className='text-center primary '>
                                Login to Book
                            </button>
                        </div>
                    )}

                </div>


                <div className='grid grid-cols-1 p-4 mb-4 shadow bg-white rounded-2xl sm:grid-cols-2 gap-2 mt-2 md:grid-cols-3 lg:grid-cols-6'>

                    <label name="wifi" className={PerksSelector("wifi")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                        </svg>

                        <span>Wifi</span>
                    </label>



                    <label name="parking" className={PerksSelector("parking")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>

                        <span>Free Parking</span>
                    </label>



                    <label name="tv" className={PerksSelector("tv")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <span>TV</span>
                    </label>



                    <label name="pets" className={PerksSelector("pet")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                        </svg>

                        <span>Pets</span>
                    </label>



                    <label name="entrance" className={PerksSelector("entrance")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>

                        <span>Private Entrance</span>
                    </label>



                    <label name="game" className={PerksSelector("game")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                        </svg>
                        <span>Game Room</span>
                    </label>
                </div>



                <div className="px-8 py-8 bg-white shadow rounded-xl">
                    <div>
                        <h2 id={user?.name} className='text-2xl font-semibold'>Extra Info</h2>
                    </div>
                    <div className='mt-2 mb-4 text-sm leading-5 text-gray-700'>{place.extraInfo}</div>
                </div>
            </div>
        )
    }

    export default SinglePlace  