import React from 'react';
import { Link } from 'react-router-dom'

const HotelListing = (props) => (
    <li className='hotel-listing'>
        <p>{props.name}</p>
        <img src={props.image} alt={props.name + ' hotel'} />       
        <br />
        <Link to={`/hotels/details/${props.id}`}>More Details</Link>
    </li>
)

export default HotelListing;