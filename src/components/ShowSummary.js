import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowSummary = () => {
    const { showId } = useParams();
    const [show, setShow] = useState(null);
    const [newString, setNewString] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        showName: '',
    });
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${showId}`)
            .then(response => response.json())
            .then(data => {
                setShow(data);
                setFormData({ ...formData, showName: data.name });
            })
            .catch(error => {
                console.log("There is an error while fetching data from api");
                console.error(error);
            });
    }, [showId]);

    useEffect(() => {
        if (show && show.summary) {
            const regex = /(<([^>]+)>)/gi;
            const cleanSummary = show.summary.replace(regex, "");
            setNewString(cleanSummary);
        }
    }, [show]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        console.log("hhhhhhhhiiiiiiiiiiiiiiii")
        localStorage.setItem('userData', JSON.stringify(formData));
        setBookingSuccess(true);
    };

    if (!show) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={show.image?.medium || 'reactpractice\src\components\imgnotfound.png'} className="card-img" alt={show.name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title">{show.name}</h1>
                            <p className="card-text">
                                <b>Type:</b> {show.type}
                                <br />
                                <b>Language:</b> {show.language}
                                <br />
                                <b>Genres:</b> {show.genres.join(', ')}
                                <br />
                                <b>Status:</b> {show.status}
                                <br />
                                <b>Runtime:</b> {show.runtime} minutes
                                <br />
                                <b>Average Rating:</b> {show.rating?.average || 'NA'}
                                <br />
                                <b>Premiere Date:</b> {show.premiered}
                                <br />
                                <b>Scheduled Time:</b> {show.schedule?.time || 'NA'}
                                <br />
                                <b>Broadcast Days:</b> {show.schedule?.days.join(', ') || 'NA'}
                            </p>
                            <b>Show Summary:</b>
                            <p className="card-text">{newString}</p>
                        
                            {bookingSuccess ? (
                                <div className="alert alert-success p-3 mt-3">
                                    <h2 className="text-green">Booking Successful!</h2>
                                    <p className="text-green">Thank you for booking.</p>
                                    <br />
                                    <h4 className="text-green">Booking Details:</h4>
                                    <p className="text-green">Show Name: {show.name}</p>
                                    <p className="text-green">Premiere Date: {show.premiered}</p>
                                    <p className="text-green">Scheduled Time: {show.schedule?.time || 'NA'}</p>
                                    <p className="text-green">Broadcast Days: {show.schedule?.days.join(', ') || 'NA'}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleBookingSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-danger btn-lg">Book Now</button>
                                    </div>
                                </form>
                            )}
                            
                            <div className="d-grid gap-2 mt-3">
                                <a href={show.officialSite} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Official Site</a>
                                <a href={show.url} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">More Info</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowSummary;
