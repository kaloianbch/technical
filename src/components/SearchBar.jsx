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
        this.keyInputHandler = this.keyInputHandler.bind(this);
        this.callbackHandler = this.callbackHandler.bind(this);
        this.searchBarInputHandler = this.searchBarInputHandler.bind(this);
    }


    searchBarInputHandler(event){
        event.preventDefault();
        this.setState({searchQuery: event.target.value});
    }

    keyInputHandler(pressed) {
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
                <div id='searchBar' className='input-group col-10'>
                    <input type='text' className='form-control' placeholder='Search...' value={this.state.searchQuery}
                           onKeyUp={this.keyInputHandler} onChange={this.searchBarInputHandler}/>
                    <button type='button' className='btn btn-light' id='searchButton' onClick={this.callbackHandler}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchBar;