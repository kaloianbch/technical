import React, {Component} from 'react';
import './Video.css'

    class Video extends Component{ //TODO - Add scroll down indicator
    render() {
        return (
            <div className='d-flex justify-content-center'>
                <div id='video' className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={this.props.link} allowFullScreen>

                    </iframe>
                </div>
            </div>
        );
    }
}

export default Video;