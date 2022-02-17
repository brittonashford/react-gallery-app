import React, { Component } from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

class PhotoContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const baseUrl = 'https://live.staticflickr.com';
        const photos = this.props.photos;
        let gallery = [];
        
        if (photos.length > 0){
            // console.log(this.props.query);
            // console.log(photos);
            // console.log(this.props.queryResults);
            gallery = photos.map(photo =>              
                <Photo photoUrl={`${baseUrl}/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
                    alt={photo.title}
                    key={photo.id}
                />             
            )
        } else {
            gallery = <NotFound />
        }

        return(
            <div class="photo-container">
                <h2>Results</h2>
                <ul>
                    {gallery}
                </ul>
            </div>
        )
    };
}


export default PhotoContainer;