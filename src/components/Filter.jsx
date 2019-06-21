import React, {Component} from 'react';
import './Filter.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch'
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
/*
    Dropdown Toggle override component that replaces default button with a missionSelect bar.
 */
class FilterBar extends React.Component { //TODO - add filter options
    constructor(props) {
        super(props);
        this.state = {
            filterQuery: ''
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    clickHandler(event) {
        event.preventDefault();
        this.props.onClick(event);
    }
    /*
        The change handler passes the input value back to the parent Filter component.
     */
    changeHandler(event) {
        event.preventDefault();
        this.setState({filterQuery: event.target.value.toLowerCase().trim()}, ()=>{
            if(this.props.callback !== undefined){
                this.props.callback(this.state.filterQuery);
            }
        })
    }
    render() {
        return (
            <a id='filterBarParent' href="" onClick={this.clickHandler}>
                <InputGroup>
                    <input type='text' className='form-control' placeholder='Search...' value={this.state.filterQuery}
                           onChange={this.changeHandler}/>
                    <InputGroup.Append>
                        <InputGroup.Text id='basic-addon1'><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                {this.props.children}
            </a>
        );
    }
}

/*
    Dropdown menu override component that produces a list only of elements containing the provided string prop
 */
class FilterMenu extends React.Component {  //TODO - stylize
    constructor(props) {
        super(props);
    }

    render() {
        const {
            children,
            style,
            className,
            'aria-labelledby': labeledBy,
            filterQuery,
        } = this.props;

        return (
            <div style={style} className={className} aria-labelledby={labeledBy}>
                <ul id='dropDownList' className='list-unstyled'>
                    {React.Children.toArray(children).filter(
                        child =>
                            !filterQuery || child.props.children.toLowerCase().includes(filterQuery),
                    )}
                </ul>
            </div>
        );
    }
}

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state ={
            missionList: null,      //list for storing API information
            filterQuery : ''
        };
        this.setFilterText = this.setFilterText.bind(this);
        this.getBody = this.getBody.bind(this);
        this.getDropdownItems = this.getDropdownItems.bind(this);
        this.passSelectedMission = this.passSelectedMission.bind(this);
    }

    /*
        On mounting the main App component it attempts fetches the API information
     */
    componentDidMount() {
        fetch('https://api.spacexdata.com/v3/launches')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    missionList: responseJson,
                })
            })
    }

    setFilterText(text){
        this.setState({filterQuery: text})
    }

    /*
        Populates the Dropdown menu with items derived from the API list.
     */
    getDropdownItems(){
        return this.state.missionList.map((missionListItem) =>
            <Dropdown.Item key={missionListItem.flight_number} onClick={() => this.passSelectedMission(missionListItem)}>
                <div id='dropDownItem'className='container-fluid'>{missionListItem.mission_name}</div>
            </Dropdown.Item>
        );
    }

    passSelectedMission(missionInfo){
        if(this.props.filterCallback !== undefined){
            missionInfo.rocket.first_stage.cores.forEach((coreItem) =>{
                coreItem.other_flights = this.findOtherFlights(coreItem.core_serial, missionInfo.flight_number);
            });
            console.log(missionInfo);
            this.props.filterCallback(missionInfo);
        }
    }

    findOtherFlights(serial, missionId){
        let otherFlights = [];
        this.state.missionList.forEach((missionItem) =>{
            missionItem.rocket.first_stage.cores.forEach((coreItem) =>{
                if(coreItem.core_serial === serial && missionItem.flight_number !== missionId){
                    otherFlights.push({flight_number: missionItem.flight_number, mission_name: missionItem.mission_name})
                }
            })
        });
        return otherFlights;
    }

    /*
        This method provides a loading indicator for the app while it fetches the API data
        return: jsx main body of the filter component
     */
    getBody() {
        if (this.state.missionList !== null) {
            return (
                <div id='filter' className='input-group col-10'>
                    <Dropdown className='container-fluid'>
                        <Dropdown.Toggle as={FilterBar} id='dropdown-custom-components' callback={this.setFilterText}>
                        </Dropdown.Toggle>
                        <Dropdown.Menu id='dropdownMenu' className='container-fluid' as={FilterMenu}
                                       filterQuery={this.state.filterQuery}>
                            {this.getDropdownItems()}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )
        } else {
            return (
                <div id='appBody' className='container-fluid'>
                    <div id='loading' className='d-flex justify-content-center'> Fetching data from SpaceX API...</div></div>
            )
        }
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                {this.getBody()}
            </div>
        );
    }
}

export default Filter;