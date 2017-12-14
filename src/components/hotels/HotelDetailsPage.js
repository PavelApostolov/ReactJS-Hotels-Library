import React, { Component } from 'react';
import hotelActions from '../../actions/HotelActions'
import hotelStore from '../../stores/HotelStore'
import HotelReviews from './HotelReviews'

class HotelDetailsPage extends Component {
    constructor(props){
        super(props)

        const id = this.props.match.params.id

        this.state = {
            id,
            hotel: {}
        }
        
        this.handleHotelRetrieved = this.handleHotelRetrieved.bind(this)

        hotelStore.on(
            hotelStore.eventTypes.HOTEL_DETAILS_RETRIEVED,
            this.handleHotelRetrieved
        )
    }

    componentDidMount(){
        hotelActions.byId(this.state.id)
    }

    componentWillUnmount(){
        hotelStore.removeListener(
            hotelStore.eventTypes.HOTEL_DETAILS_RETRIEVED,
            this.handleHotelRetrieved
        )
    }

    handleHotelRetrieved(hotel){
        this.setState({ hotel })
    }

    render() {
        let hotel = this.state.hotel
        return (
            <div className='hotel-details'>
                <h1>{hotel.name} - {hotel.location}</h1>
                <h3>{hotel.numberOfRooms} rooms ({hotel.parkingSlots} parking slots)</h3>
                <div>
                    <img src={hotel.image} alt={hotel.description} />
                    <p>{hotel.description}</p>
                </div>
                <div>
                    <HotelReviews hotelId={this.state.id}/>
                </div>
            </div>
        );
    }
}

export default HotelDetailsPage;