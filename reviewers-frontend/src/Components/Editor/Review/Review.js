import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Review extends Component {
    componentWillUnmount() {
        console.log('Review will be unmount!');
    }

    render() {
        console.log(this.props);
        return (
            <div className="review-container" style={{height: this.props.height, width: this.props.width}}>
                <h1>This is Review Component!</h1>
                <button onClick={() => this.props.onCancelClick()}>Close Button</button>
            </div>            
        )
    }
}

// export default function Review(props) {
//     console.log(props);
//     return (
//         <div className="review-container" style={{height: props.height}}>
//             <h1>This is Review Component!</h1>
//             <button onClick={props.onCancelClick}>Close Button</button>
//         </div>            
//     );
// }

Review.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    onCancelClick: PropTypes.func
};