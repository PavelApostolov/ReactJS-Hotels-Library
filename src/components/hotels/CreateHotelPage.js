import React, { Component } from 'react';
import CreateHotelForm from './CreateHotelForm'
import FormHelpers from '../common/FormHelpers'
import hotelActions from '../../actions/HotelActions'
import HotelStore from '../../stores/HotelStore'
import toastr from 'toastr'

class CreateHotelPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            hotel: {
                name: 'My hotel',
                location: 'Sofia',
                description: 'The best hotel',
                numberOfRooms: 100,
                image: 'https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Mahal_Delhi/images/4x3/HotelFacade4x3.jpg',
                parkingSlots: 100
            },
            error: ''
        }

    this.handleHotelCreated = this.handleHotelCreated.bind(this)

    HotelStore.on(
            HotelStore.eventTypes.HOTEL_CREATED,
            this.handleHotelCreated)
    }

    componentWillUnmount(){
        HotelStore.removeListener(
            HotelStore.eventTypes.HOTEL_CREATED,
            this.handleHotelCreated
        )
    }

    handleHotelCreated(data){
        if(!data.success){
            let error = FormHelpers.getFirstError(data)
            this.setState({ error })
        } else {
            const id = data.hotel.id
            toastr.success(data.message)
            this.props.history.push(`/hotels/details/${id}`)
        }
    }

    handleHotelChange(event){
        FormHelpers.handleFormChange.bind(this)(event, 'hotel')
    }

    handleHotelSave(event){
        event.preventDefault()
        //validatate form

        let formIsValid = true
        let error = ''
        if(!this.state.hotel.name){
            error = 'Name is required'
            formIsValid = false
        }
        if(!formIsValid){
            this.setState({ error })
            return
        }

        hotelActions.createHotel(this.state.hotel)
    }

    render() {
        return (
            <div>
                <h1>Create hotel</h1>
                <CreateHotelForm 
                    hotel={this.state.hotel}
                    error={this.state.error}
                    onChange={this.handleHotelChange.bind(this)}
                    onSave={this.handleHotelSave.bind(this)}
                />
            </div>
        );
    }
}

export default CreateHotelPage;