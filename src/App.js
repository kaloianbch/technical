import React, {Component} from 'react';
import './App.css';
import Banner from './components/Banner.jsx'
import SearchBar from './components/SearchBar';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            missionList: [],
            isFetched: false,
            selectedMission: null,
        };
        this.search = this.search.bind(this)
    }

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
    search(query){
        this.setState({selectedMission:Number(query)})
    }
    render() {
        let {isFetched, missionList, selectedMission} = this.state;
        if(!isFetched){
            return (
                <div className='container-fluid'>
                    <Banner/>
                    <div id='appBody' className='container-fluid'>
                        <div id='loading' className='d-flex justify-content-center'> Fetching SpaceX info...</div>
                    </div>
                    <footer id='footer' className='d-flex justify-content-center'>
                        Brought to you by&nbsp;<a id='gitHubLink' href='http://github.com/kaloianbch/'>Kal</a>
                    </footer>
                </div>
            );
        }
        else if(selectedMission !== null){
            return (
                <div className='container-fluid'>
                    <Banner/>
                    <div id='appBody' className='container-fluid'>
                        <SearchBar searchCallback={this.search}/>
                        <InfoCard missionInfo={missionList[selectedMission]}/>
                    </div>
                    <footer id='footer' className='d-flex justify-content-center'>
                        Brought to you by&nbsp;<a id='gitHubLink' href='http://github.com/kaloianbch/'>Kal</a>
                    </footer>
                </div>
            );
        }
        else{
            return (
                <div className='container-fluid'>
                    <Banner/>
                    <div id='appBody' className='container-fluid'>
                        <SearchBar searchCallback={this.search}/>
                    </div>
                    <footer id='footer' className='d-flex justify-content-center'>
                        Brought to you by&nbsp;<a id='gitHubLink' href='http://github.com/kaloianbch/'>Kal</a>
                    </footer>
                </div>
            );
        }
    }
}

export default App;
