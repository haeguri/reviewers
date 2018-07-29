import React from 'react';

class Review extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div className="review-container" style={{height: this.props.height}}>
            <h1>This is Review Component!</h1>
        </div>            
        )
    }
}

export default Review;