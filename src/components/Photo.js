import React from 'react';

const Photo = props => {
    <li>
        <img src={ props.photoUrl } alt={ props.alt } />
    </li>
}

export default Photo;