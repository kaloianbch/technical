import React, {Component} from 'react';
import './InfoCard.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class InfoCard extends Component {  //TODO - lots of formatting and style changes
    /*
        Appends first available image to the info card, if available
        return jsx div with image
     */
    addImgContent() {    //TODO - static div height; carousel
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
    /*
        Appends the first row of information ot the card.
        return: jsx div with content dependent on availability
     */
    addRowOneContent(){
        const missionInfo = {
            flightNumber: this.props.missionInfo.flight_number,
            tbd: this.props.missionInfo.tbd,
            payloadList: this.props.missionInfo.rocket.second_stage.payloads,
            staticFireTime: this.dateConvert(this.props.missionInfo.static_fire_date_unix),
            launchTime: this.dateConvert(this.props.missionInfo.launch_date_unix),
            launchZone: this.props.missionInfo.launch_site.site_name,
            launchSuccess: this.props.missionInfo.launch_success,
        };
        return(
            <div className='container-fluid'>
                <div className='row'>
                    SpaceX Flight #{missionInfo.flightNumber}
                </div>
                <div className='row'>
                    <div className='col-md-5'>Payload:</div>
                    <div className='col-md-7'>{this.addPayloadInfo(missionInfo.payloadList)}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>Launch Time:</div>
                    <div className='col-md-7'>{(missionInfo.launchTime !== null) ? <span>{missionInfo.launchTime}</span>
                        : <span>No Information</span>}</div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>Static Fire Test:</div>
                    <div className='col-md-7'>{(missionInfo.staticFireTime !== null) ? <span>{missionInfo.staticFireTime}</span>
                        : <span>No Information</span>}</div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>Launch Site:</div>
                    <div className='col-md-7'>{(missionInfo.launchZone !== null) ?
                        <span>{missionInfo.launchZone} {(missionInfo.launchSuccess !== null) ?
                            this.addPassIcon(missionInfo.launchSuccess, 'The rocket launched successfully',
                                'The rocket failed to launch') :   <span></span>}
                        </span>
                        : <span>No Information</span>}</div>
                </div>
            </div>
        )
    }

    /*
       Appends the second row of information ot the card.
       return: jsx div with content dependent on availability
    */
    addRowTwoContent(){
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
                    {this.addCoreInfo(missionInfo.coreList)}
                </div>
            </div>
        )
    }

    /*
       Appends the last row, containing the description string and links list.
       return: jsx div with content dependent on availability
    */
    addDescriptionAndLinks(){
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
                            {this.addLinks(missionInfo.linkList)}</ul></div>
                            : <span></span>
                    }
                </div>
            </div>
        );
    }
    /*
        Creates list items for links retrieved from the mission information
        arg: list list of link items provided by the API
        return: jsx <li> elements
     */
    addLinks(list){
        return (
            list.map((linkItem) => (linkItem !== null) ? <li><a href={linkItem}>{linkItem}</a></li> : null)
        );
    }

    /*
        Creates list for the mission payload items
        arg: list list of payload items provided by the API
        return: jsx
     */
    addPayloadInfo(list){
        return (list !== undefined) ?
            list.map((payloadItem) => (payloadItem.payload_mass_kg !== null) ?
                <span>- {payloadItem.payload_id}({payloadItem.payload_type}) - {payloadItem.payload_mass_kg}kg</span>
                : <span>- {payloadItem.payload_id}({payloadItem.payload_type})</span>)
            : <span>No Information</span>
    }

    /*
        Creates list of information for the cores(first stage boosters) used/to be used in the missions.
        arg: list list of core items provided by the API
        return: jsx
     */
    addCoreInfo(list){
        let count = 1;
        return (list !== undefined) ?
            list.map((coreItem) => <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-5'>Core {count++}:</div>
                        <div className='col-md-7'>{(coreItem.core_serial !== null) ? coreItem.core_serial :
                            <span>No serial number information</span>}
                        </div>
                    </div>
                    {this.addOtherFlights(coreItem)}
                        {coreItem.landing_intent ?
                            <div className='row'>
                                <div className='col-md-5'>Landing Site:</div>
                                <div className='col-md-7'>{coreItem.landing_vehicle} {(coreItem.land_success !== null) ?
                                    this.addPassIcon(coreItem.land_success, 'The first stage booster landed successfully',
                                        'The first stage booster failed to land') :   <span></span>}
                                </div>
                            </div> :<span></span>
                        }
            </div>
            ): null
    }

    /*
        Creates list of other missions a given core was used in.
        arg: list list of core items provided by the API
        return: jsx
     */
    addOtherFlights(coreItem){
        console.log(coreItem.other_flights);
        return (coreItem.other_flights.length !== 0) ?
            <div className='row'>
                <div className='col-md-5'> - Previous Flights:</div>
                <div className='col-md-7'>
                    {coreItem.other_flights.map((flightItem) =>
                        <p>Flight #{flightItem.flight_number}({flightItem.mission_name})</p>)
                    }
                </div>
            </div>
            : null
    }

    /*
        Converts Unix timestamp to presentable format
        arg: unixTimeStamp provided by the API
        return: string translated UTC timestamp
     */
    dateConvert(unixTimeStamp){
        if(unixTimeStamp !== null) {
            let date = new Date(unixTimeStamp * 1000);
            return date.toUTCString()   //TODO - override ToString
        } else {
            return null
        }
    }
    /*
        Creates a pass or fail icon with a tooltip message.
        arg: checkBool boolean to be evaluated
        arg: successMsg string for if boolean is true
        arg: failMsg string for if boolean is false
        return: jsx icon with tooltip
     */
    addPassIcon(checkBool, succsessMsg, failMsg){
        let successStyle = {color:'#77DD77'};
        let failureStyle = {color:'#FF033E'};
        return checkBool ? this.addTooltip(<FontAwesomeIcon icon={faCheckCircle} style={successStyle}/>, succsessMsg) :
            this.addTooltip(<FontAwesomeIcon icon={faTimesCircle} style={failureStyle}/>, failMsg)
    }

    /*
        Adds a tooltip message to a given element
        arg: fontAwesomeIcon  jsx
        arg: msg string to display in the tooltip
     */
    addTooltip(fontAwesomeIcon, msg){
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
                            {this.addImgContent()}
                            <div id='infoRowOne' className='col-md-4 fa-border'>
                                {this.addRowOneContent()}
                            </div>
                            <div id='infoRowTwo' className='col-md-4 fa-border'>
                                {this.addRowTwoContent()}
                            </div>
                        </div>
                        <div className='row'>
                            {this.addDescriptionAndLinks()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoCard;