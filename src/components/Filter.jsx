import React, {Component} from 'react';
import './Filter.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch'
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';

/*
    Dropdown Toggle override component that replaces default button with a search bar.
 */
class FilterBar extends React.Component {
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
class FilterMenu extends React.Component {
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
            filterQuery : ''
        };
        this.setFilterText = this.setFilterText.bind(this);
    }

    setFilterText(text){
        this.setState({filterQuery: text})
    }

    /*
        Populates the Dropdown menu with items derived from the API list.
     */
    getDropdownItems(){
        return <Dropdown.Item onClick={() => console.log('selected')}>Placeholder</Dropdown.Item>
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
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
            </div>
        );
    }
}

export default Filter;