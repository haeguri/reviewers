import React from 'react';
import PropTypes from 'prop-types';

const Review = (props) => {
    return (
        <div 
            className="review-form"
        >
            <h1>This is Review Component!</h1>
            <button onClick={() => props.onCancelClick()}>Close Button</button>
        </div>            
    )
}

export default Review;

Review.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    onCancelClick: PropTypes.func
};