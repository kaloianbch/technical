import React, {Component} from 'react';
import './App.css';
import Banner from './components/Banner.jsx'
import Filter from './components/Filter';
import InfoCard from './components/InfoCard';

/*
    The main App component renders the banner and footer, and after the API fetch is complete also a filter bar for the
    list provided by the API. When an item is selected it passed to an InfoCard component.
 */
class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedMission: null,  //the selected list item as per the missionSelect
        };
        this.missionSelect = this.missionSelect.bind(this);
        this.getCard = this.getCard.bind(this);
    }

    setSelectedMission(missionInfo){
        this.setState({selectedMission: missionInfo});
    }

    /*
        This adds an info card if the missionSelect filterQuery has retrieved a valid mission selection
        return: jsx information card
     */
    getCard(){
        if(this.state.selectedMission !== null){
            return <div>
                <InfoCard missionInfo={this.state.selectedMission}/>
            </div>
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
                    <div id='appBody' className='container-fluid'>
                        <Filter filterCallback={this.missionSelect}/>{this.getCard()}
                    </div>
                </div>
                <footer id='footer' className='d-flex justify-content-center'>
                    Brought to you by&nbsp;<a id='gitHubLink' href='http://github.com/kaloianbch/'>Kal</a>
                </footer>
            </div>
        );
    }
}

export default App;
