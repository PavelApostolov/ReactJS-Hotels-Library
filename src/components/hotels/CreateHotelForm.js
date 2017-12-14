import React from 'react';
import Input from '../common/input'

const CreateHotelForm = (props) => (
    <form>
        <div>{props.error}</div>
        <Input name='name'
                placeholder='Name' 
                value={props.hotel.name} 
                onChange={props.onChange}/>
        <br />
        <Input name='location'
                placeholder='Location' 
                value={props.hotel.location} 
                onChange={props.onChange}/>
        <br />
        <Input name='description'
                placeholder='Description' 
                value={props.hotel.description} 
                onChange={props.onChange}/>
        <br />
        <Input name='numberOfRooms'
                type='number'
                placeholder='Number of rooms' 
                value={props.hotel.numberOfRooms} 
                onChange={props.onChange}/>
        <br />
        <Input name='image'
                placeholder='Image' 
                value={props.hotel.image} 
                onChange={props.onChange}/>
        <br />
        <Input name='parkingSlots'
                placeholder='Parking Slots' 
                value={props.hotel.parkingSlots} 
                onChange={props.onChange}/>
        <br />
        <input type='submit' onClick={props.onSave} value="Add hotel"/>
    </form>
)

export default CreateHotelForm;