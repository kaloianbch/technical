import React, {Component} from 'react';
import './SearchBar.css'

class SearchBar extends Component {
    render() {
        return (
            <div class='d-flex justify-content-center'>
                <div class='input-group col-5'>
                <input type='text' class='form-control' placeholder='Search..'/>
                <button type="button" class="btn btn-light" id='searchButton'><i className="fa fa-search"></i></button>
                </div>
            </div>
        );
    }
}

export default SearchBar;