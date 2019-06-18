import React, {Component} from 'react';
import './Banner.css'
import bannerImg from '../res/bannerImg.png'

class Banner extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center" id='banner'>
                <img id='bannerImg' src={bannerImg} alt="SpaceX Explore" width="500rem"/>
            </div>

        );
    }
}

export default Banner;