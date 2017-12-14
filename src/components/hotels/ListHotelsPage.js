import React, { Component } from 'react';
import hotelActions from '../../actions/HotelActions'
import HotelStore from '../../stores/HotelStore'
import HotelListing from './HotelListing'
import queryString from 'query-string'

class ListHotelsPage extends Component {
    constructor(props){
        super(props)
        
        const query = queryString.parse(this.props.location.search)
        const page = parseInt(query.page, 10) || 1

        this.state = {
            page,
            hotels: []
        }
        
        this.handleHotelsRetrieved = this.handleHotelsRetrieved.bind(this)

        HotelStore.on(
            HotelStore.eventTypes.HOTELS_RETRIEVED,
            this.handleHotelsRetrieved)
    }

    componentDidMount(){
        hotelActions.all(this.state.page)
    }

    componentWillUnmount(){
        HotelStore.removeListener(
            HotelStore.eventTypes.HOTELS_RETRIEVED,
            this.handleHotelsRetrieved
        )
    }

    handleHotelsRetrieved(hotels){
        this.setState({ hotels })
    }

    goToPrevPage(){
        let page = this.state.page
        if(page === 1){
            return
        }
        page--
        this.setState({ page })

        hotelActions.all(page)
        this.props.history.push(`/?page=${page}`)
    }

    goToNextPage(){
        let page = this.state.page
        if(this.state.hotels.length === 0){
            return
        }
        page++
        this.setState({ page })

        hotelActions.all(page)
        this.props.history.push(`/?page=${page}`)
    }

    render() {
        let hotels = 'No hotels found'

        if(this.state.hotels.length > 0){
            hotels = this.state.hotels.map(hotel => (
            <HotelListing key={hotel.id} {...hotel} />
        ))
        }
        return (
        <div>
            <div className="all-hotels">All hotels</div>
            <div>
                <button onClick={this.goToPrevPage.bind(this)} >Prev</button>
                <button onClick={this.goToNextPage.bind(this)}>Next</button>
            </div>
            <ul>
                {hotels}
            </ul>
            <div>
                <button onClick={this.goToPrevPage.bind(this)} >Prev</button>
                <button onClick={this.goToNextPage.bind(this)}>Next</button>
            </div>
        </div>
        );
    }
}

export default ListHotelsPage;