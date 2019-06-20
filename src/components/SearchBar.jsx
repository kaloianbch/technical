import React, {Component} from 'react';
import './SearchBar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch'

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchQuery: '',
        };
        this.keyHandler = this.keyHandler.bind(this);
        this.callbackHandler = this.callbackHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    changeHandler(event){
        event.preventDefault();
        this.setState({searchQuery: event.target.value});
    }
    keyHandler(pressed) {
        if (pressed.key === 'Enter') {
            this.callbackHandler()
        }
    }
    callbackHandler(event){
        event.preventDefault();
        if(this.props.searchCallback !== undefined){
            this.props.searchCallback(this.state.searchQuery);
        }
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <div id='searchBar' className='input-group col-5'>
                    <input type='text' className='form-control' placeholder='Search...' value={this.state.searchQuery}
                           onKeyUp={this.keyHandler} onChange={this.changeHandler}/>
                    <button type='button' className='btn btn-light' id='searchButton' onClick={this.callbackHandler}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchBar;