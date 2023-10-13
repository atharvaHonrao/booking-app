import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShowList = () => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        fetch('https://api.tvmaze.com/search/shows?q=all')
            .then(response => response.json())
            .then(data => {
                setShows(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div className="row">
                {shows.map((show) => (
                    <div className="col-lg-4 mb-4" key={show.show.id}>
                        <div className="card">
                            <img
                                src={show.show.image?.medium || 'reactpractice\src\components\imgnotfound.png'}
                                className="card-img-top"
                                alt={show.show.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{show.show.name}</h5>
                                <p className="card-text">
                                    <b>Runtime:</b> {show.show.runtime} minutes
                                    <br />
                                    <b>Language:</b> {show.show.language}
                                    <br />
                                    <b>Average Rating:</b> {show.show.rating?.average || 'NA'}
                                </p>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 d-flex justify-content-start">
                                            <Link to={`/summary/${show.show.id}`} className="btn btn-primary mr-2">
                                                Book Now
                                            </Link>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-end">
                                            <a href={`${show.show.url}`} target="_blank" className="btn btn-secondary">
                                                More Info
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowList;
