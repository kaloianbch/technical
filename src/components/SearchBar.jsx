import React, {Component} from 'react';
import './SearchBar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

class SearchBar extends Component {
    render() {
        return (
            <div class='d-flex justify-content-center'>
                <div class='input-group col-5'>
                <input type='text' class='form-control' placeholder='Search..'/>
                <button type='button' className='btn btn-light' id='searchButton'>
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
                </div>
            </div>
        );
    }
}

export default SearchBar;