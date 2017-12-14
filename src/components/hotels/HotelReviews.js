import React, { Component } from 'react';
import FormHelpers from '../common/FormHelpers'
import HotelReviewForm from './HotelReviewForm'
import hotelActions from '../../actions/HotelActions'
import hotelStore from '../../stores/HotelStore'
import toastr from 'toastr'

class HotelReviews extends Component {
    constructor(props){
        super(props)

        this.state = {
            newReview: {
                rating: 0,
                comment: ''
            },
            reviews:[],
            error: ''
        }

        this.handleReviewsRetrieved = this.handleReviewsRetrieved.bind(this)
        this.handleReviewAdded = this.handleReviewAdded.bind(this)

        hotelStore.on(
            hotelStore.eventTypes.REVIEWS_RETRIEVED,
            this.handleReviewsRetrieved
        )

        hotelStore.on(
            hotelStore.eventTypes.REVIEW_ADDED,
            this.handleReviewAdded
        )
    }

    componentDidMount(){
        hotelActions.allReviews(this.props.hotelId)
    }

    componentWillUnmount(){
        hotelStore.removeListener(
            hotelStore.eventTypes.REVIEWS_RETRIEVED,
            this.handleReviewsRetrieved
        )
        hotelStore.removeListener(
            hotelStore.eventTypes.REVIEW_ADDED,
            this.handleReviewAdded
        )
    }

    handleReviewsRetrieved(reviews){
        this.setState({ reviews })
    }

    handleReviewAdded(data){
        if(!data.success){
            let error = FormHelpers.getFirstError(data)
            this.setState({ error })
        } else {
            const reviews = this.state.reviews
            reviews.push(data.review)
            this.setState({ reviews })
            toastr.success(data.message)
        }
    }

    handleReviewChange(event){
        FormHelpers.handleFormChange.bind(this)(event, 'newReview')
    }

    handleReviewSave(event){
        event.preventDefault()

        const rating = parseInt(this.state.newReview.rating, 10)

        if(!rating || rating < 1 || rating > 5){
            this.setState({
                error: 'Rating must be between 1 and 5'
            })
            return
        }

        hotelActions.addReview(this.props.hotelId, this.state.newReview)
    }

    render() {
        let reviews = ''
        if(this.state.reviews.length > 0){
            reviews = this.state.reviews.map((review, index) => (
                <div key={index}>{review.user} - {review.rating} {review.comment}</div>
            ))
        }

        return (
            <div>
                <h4>Share your opinion</h4>
                <HotelReviewForm 
                    review = {this.state.newReview}
                    error={this.state.error}
                    onChange={this.handleReviewChange.bind(this)}
                    onSave={this.handleReviewSave.bind(this)}
                />
                <div>{reviews}</div>
            </div>
        );
    }
}

export default HotelReviews;