import React, {Component} from 'react';
import './InfoCard.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons/faTimesCircle";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";

class InfoCard extends Component {
    imgLoad(imgSource) {    //TODO - add null alternative
        return <img id='cardImg' className='rounded' alt='Failed to Load Image' src={imgSource}/>
    }
    dateConvert(unixTimeStamp){
        let date = new Date(unixTimeStamp * 1000);
        return date.toUTCString()   //TODO - override ToString
    }
    getSuccessInfo(didIt, successMsg, failureMsg){   //TODO - Add tooltip; make Icons slightly bigger
        let green = {color:'#77DD77',};
        let red = {color:'#FF033E'};
     return didIt ?
         <FontAwesomeIcon icon={faCheckCircle} style={green} />
         : <FontAwesomeIcon icon={faTimesCircle} style={red}/>
    }
    getBoosterInfo(coreId){
        return <FontAwesomeIcon icon={faInfoCircle}/>
    }
    fillLinks(hrefList){    //TODO
        return <li></li>
    }
    render() {
        const {missionInfo} = this.props;
        return (
            <div id='infoCardContainer' className='d-flex justify-content-center'>
                <div id='infoCard' className='card col-11 justify-content-center'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-4'>
                               {this.imgLoad(missionInfo.links.flickr_images[0])}
                            </div>
                            <div id='infoRowOne' className='col-md-4 fa-border'>
                                <ul>
                                    <li>Payload: {missionInfo.rocket.second_stage.payloads[0].payload_id}
                                        ({missionInfo.rocket.second_stage.payloads[0].payload_type})
                                    </li>
                                    <li>Flight Number: {missionInfo.flight_number}</li>
                                    <li>Launch Time: {this.dateConvert(missionInfo.launch_date_unix)}</li>
                                    <li>Static Fire Test: {
                                        this.dateConvert(missionInfo.static_fire_date_unix)}</li>
                                </ul>
                            </div>
                            <div id='infoRowTwo' className='col-md-4 fa-border'>
                                <ul>
                                    <li>Rocket Type: {missionInfo.rocket.rocket_name}</li>
                                    <li>Stage 1 Booster:&nbsp;
                                        {missionInfo.rocket.first_stage.cores[0].core_serial}&nbsp;
                                        {this.getBoosterInfo(missionInfo.rocket.first_stage.cores[0]
                                            .core_serial
                                        )}
                                    </li>
                                    <li>Launch Site: {missionInfo.launch_site.site_name}&nbsp;
                                        {this.getSuccessInfo(missionInfo.launch_site.launch_success,
                                        'Launch was successful', 'Launch failed')}
                                    </li>
                                    <li>Landing Zone:&nbsp;
                                        {missionInfo.rocket.first_stage.cores[0].landing_vehicle}&nbsp;
                                        {this.getSuccessInfo(
                                            missionInfo.rocket.first_stage.cores[0].land_success,
                                            'Stage 1 successfully landed', 'Stage 1 failed to land'
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='row'>
                            <div id='missionDesc' className='col-md-10 fa-border'>
                                {missionInfo.details}
                                <div>
                                    Articles and Threads:
                                    {this.fillLinks(missionInfo.links)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoCard;