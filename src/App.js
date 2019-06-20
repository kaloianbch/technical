import React, {Component} from 'react';
import './App.css';
import Banner from './components/Banner.jsx'
import SearchBar from './components/SearchBar';
import InfoCard from './components/InfoCard';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            missionList: null,      //list for storing API information
            selectedMission: null,  //the selected list item as per the search
        };
        this.search = this.search.bind(this);
        this.getBody = this.getBody.bind(this);
        this.getCard = this.getCard.bind(this);
    }

    /*
        On mounting the main App component it fetches the API information
     */
    componentDidMount() {
        fetch('https://api.spacexdata.com/v3/launches')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    isFetched: true,
                    missionList: responseJson,
                })
            })
    }

    search(query){  //TODO - fully implement
        this.setState({selectedMission: Number(query)})
    }

    /*
        This method provides a loading indicator for the app while it fetches the API data
        return: jsx main body of webapp
     */
    getBody(){
        if(this.state.missionList !== null) {
            return <div id='appBody' className='container-fluid'>
                <SearchBar searchCallback={this.search}/> {this.getCard()}</div>
        }
        else {
            return  <div id='appBody' className='container-fluid'>
                <div id='loading' className='d-flex justify-content-center'> Fetching SpaceX info...</div></div>
        }
    }

    /*
        This adds an info card if the search query has retrieved a valid mission selection
        return: jsx information card
     */
    getCard(){
        if(this.state.selectedMission !== null){
            return <InfoCard missionInfo={this.state.missionList[this.state.selectedMission]}/>
        }
        else  {
            return null
        }
    };

    render() {
        return (
            <div className='container-fluid'>
                <Banner/>
                <div id='appBody' className='container-fluid'>
                    {this.getBody()}
                </div>
                <footer id='footer' className='d-flex justify-content-center'>
                    Brought to you by&nbsp;<a id='gitHubLink' href='http://github.com/kaloianbch/'>Kal</a>
                </footer>
            </div>
        );
    }
}

export default App;
