import React, {Component} from 'react';
import './InfoCard.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class InfoCard extends Component {

    setAll() {
        const {missionInfo} = this.props;
        this.setState({
            flightNumber: missionInfo.flight_number,
            payloadList: missionInfo.rocket.second_stage.payloads,
            staticFireTime: this.dateConvert(missionInfo.static_fire_date_unix),
            launchTime: this.dateConvert(missionInfo.launch_date_unix),
            launchZone: missionInfo.launch_site.site_name,
            launchSuccess: missionInfo.launch_site.launch_success,
            rocket: missionInfo.rocket.rocket_name + '(' + missionInfo.rocket.rocket_type + ')',
            coreList: missionInfo.rocket.first_stage.cores,
            description: missionInfo.details,
            linkList: [
                missionInfo.links.reddit_campaign,
                missionInfo.links.reddit_launch,
                missionInfo.links.reddit_recovery,
                missionInfo.links.reddit_media,
                missionInfo.links.presskit,
                missionInfo.links.article_link,
                missionInfo.links.wikipedia
            ],
            imgList: missionInfo.links.flickr_images
        });
    }

    imgLoad() {    //TODO - static div height; carousel
        const imgArr = this.props.missionInfo.links.flickr_images;
        if(imgArr[0] !== undefined) {
            return <div id='cardImgContrainer' className='col-md-4'>
                <img id='cardImg' className='rounded' alt='Failed to Load Image' src={imgArr[0]}/>
            </div>
        }
        else {
            return null
        }
    }

    stageTwoSection(){
        const missionInfo = {
            flightNumber: this.props.missionInfo.flight_number,
            tbd: this.props.missionInfo.tbd,
            payloadList: this.props.missionInfo.rocket.second_stage.payloads,
            staticFireTime: this.dateConvert(this.props.missionInfo.static_fire_date_unix),
            launchTime: this.dateConvert(this.props.missionInfo.launch_date_unix),
            launchZone: this.props.missionInfo.launch_site.site_name,
            launchSuccess: this.props.missionInfo.launch_site.launch_success,
        };
        return(
            <div className='container-fluid'>
                <div className='row'>
                    SpaceX Flight #{missionInfo.flightNumber}
                </div>
                <div className='row'>
                    <div className='col-md-5'>Payload:</div>
                    <div className='col-md-7'>{this.getPayloadItems(missionInfo.payloadList)}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>Launch Time:</div>
                    <div className='col-md-7'>{(missionInfo.launchTime !== null) ? <span>{missionInfo.launchTime}</span>
                        : <span>To Be Confirmed</span>}</div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>Static Fire Test:</div>
                    <div className='col-md-7'>{(missionInfo.staticFireTime !== null) ? <span>{missionInfo.staticFireTime}</span>
                        : <span>To Be Confirmed</span>}</div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>Launch Site:</div>
                    <div className='col-md-7'>{(missionInfo.launchZone !== null) ? <span>{missionInfo.launchZone}</span>
                        : <span>To Be Confirmed</span>}</div>
                </div>
            </div>
        )
    }

    stageOneSection(){
        const missionInfo = {
            rocketName: this.props.missionInfo.rocket.rocket_name,
            rocketType: this.props.missionInfo.rocket.rocket_type,
            coreList: this.props.missionInfo.rocket.first_stage.cores,
        };
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-5'>Rocket:</div>
                    <div className='col-md-7'>{(missionInfo.rocketName !== null) ?
                        <span>{missionInfo.rocketName}{
                            (missionInfo.rocketType !==null)? <span>({missionInfo.rocketType})</span>:
                                <span></span>
                        }</span>
                        : <span>To Be Confirmed</span>}
                    </div>
                </div>
                <div className='row'>
                    {this.getCoreItems(missionInfo.coreList)}
                </div>
            </div>
        )
    }

    getDescriptionAndLinks(){
        const missionInfo = {
            description: this.props.missionInfo.details,
            linkList: [
                this.props.missionInfo.links.reddit_campaign,
                this.props.missionInfo.links.reddit_launch,
                this.props.missionInfo.links.reddit_recovery,
                this.props.missionInfo.links.reddit_media,
                this.props.missionInfo.links.presskit,
                this.props.missionInfo.links.article_link,
                this.props.missionInfo.links.wikipedia
            ],
        };
        return(
            <div className='col-md-10'>
                {(missionInfo.description !== null) ?
                    <div className='row'>Description:<br/>{missionInfo.description}</div> : <span></span>}
                <div className='row'>
                    {(missionInfo.linkList !== undefined)?
                        <div className='container-fluid'>Links:<br/><ul>
                            {this.fillLinks(missionInfo.linkList)}</ul></div>
                            : <span></span>
                    }
                </div>
            </div>
        );
    }

    fillLinks(list){    //TODO
        return (
            list.map((linkItem) => (linkItem !== null) ? <li><a href={linkItem}>{linkItem}</a></li> : null)
        );
    }

    getPayloadItems(list){
        return (list !== undefined) ?
            list.map((payloadItem) => (payloadItem.payload_mass_kg !== null) ?
                <span>- {payloadItem.payload_id}({payloadItem.payload_type}) - {payloadItem.payload_mass_kg}kg</span>
                : <span>- {payloadItem.payload_id}({payloadItem.payload_type})</span>)
            : <span>No Information</span>
    }

    getCoreItems(list){
        let count = 1;
        return (list !== undefined) ?
            list.map((coreItem) => <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-5'>Core {count++}:</div>
                        <div className='col-md-7'>{(coreItem.core_serial !== null) ? coreItem.core_serial :
                            <span>No serial number information</span>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'> - Previous Flights:</div>
                        <div className='col-md-8'>TODO</div>
                    </div>
                    {coreItem.landing_intent ?
                        <div className='row'>
                            <div className='col-md-4'>Landing Site:</div>
                            <div className='col-md-8'>{coreItem.landing_vehicle}</div>
                        </div> :<span></span>
                    }
                </div>
            ): null
    }

    dateConvert(unixTimeStamp){
        if(unixTimeStamp !== null) {
            let date = new Date(unixTimeStamp * 1000);
            return date.toUTCString()   //TODO - override ToString
        } else {
            return null
        }
    }
    getPassCicle(checkBool, succsessMsg, failMsg){
        let successStyle = {color:'#77DD77'};
        let failureStyle = {color:'#FF033E'};
        return checkBool ? this.getFaCircle(<FontAwesomeIcon icon={faCheckCircle} style={successStyle}/>, succsessMsg) :
            this.getFaCircle(<FontAwesomeIcon icon={faTimesCircle} style={failureStyle}/>, failMsg)
    }
    getFaCircle(fontAwesomeIcon, msg){
        return <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>{msg}</Tooltip>}>
            {fontAwesomeIcon}
        </OverlayTrigger>
    }

    render() {
        return (
            <div id='infoCardContainer' className='d-flex justify-content-center'>
                <div id='infoCard' className='card col-11 justify-content-center'>
                    <div className='container-fluid'>
                        <div className='row'>
                            {this.imgLoad()}
                            <div id='infoRowOne' className='col-md-4 fa-border'>
                                {this.stageTwoSection()}
                            </div>
                            <div id='infoRowTwo' className='col-md-4 fa-border'>
                                {this.stageOneSection()}
                            </div>
                        </div>
                        <div className='row'>
                            {this.getDescriptionAndLinks()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoCard;