import { render } from '@testing-library/react';
import React, { Component } from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

class PhotoContainer extends Component {
    render() {
        const queryResults = this.props.queryResults;
        let photos = [];
        const baseUrl = 'https://live.staticflickr.com';

        if (queryResults){
            photos = queryResults.map(photo =>
                <Photo photoUrl={`${baseUrl}/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
                    alt={ photo.title }
                    key={ photo.id }
                />
                )
        } else {
            photos = <NotFound />
        }

        return(
            <div class="photo-container">
                <h2>Results</h2>
                <ul>
                    { photos }
                </ul>
            </div>
        )
    };
}


export default PhotoContainer;