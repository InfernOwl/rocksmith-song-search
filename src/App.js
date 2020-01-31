import React from 'react';
import logo from './logo.svg';
import masterList from './list';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: "",
            searchResults: [{}],
            tempDatabase: masterList,
        };
    }

    Search(event) {

        let stepHolder = [];

        //console.log("VIBETH CHECKETH: " + JSON.stringify(this.state.tempDatabase.dgvSongsMaster));

        const searchResults = this.state.tempDatabase.dgvSongsMaster.map((data, count) => {

            if ((data.colArtist.toLowerCase()).includes(event.target.value.toLowerCase())) {
                stepHolder.push(data);
            } else if ((data.colTitle.toLowerCase()).includes(event.target.value.toLowerCase())) {
                stepHolder.push(data);
            } else if ((data.colAlbum.toLowerCase()).includes(event.target.value.toLowerCase())) {
                stepHolder.push(data);
            }
        });


        this.setState({
            searchCriteria: event.target.value,
            searchResults: stepHolder,
        });

        //console.log(event.target.value);
        console.log(JSON.stringify(stepHolder));
    }

    render() {
        return (
            <div className="App">
                <SearchBar searchCriteria={this.state.searchCriteria} onChange={(i) => this.Search(i)} />
                <ResultsArea />
            </div>
        );
    }
}

function SearchBar(props) {

    /*constructor(props) {
        super(props);
        this.state = {
            searchCriteria: "",
            searchResults: [{}],

            tempDatabase: masterList,
        };

        this.Search = this.Search.bind(this);
    }*/
    return (
        <div className="searchBar">
            <input type="text" placeholder="Search"
                value={props.searchCriteria}
                onChange={props.onChange} />
        </div>
    );
}

function SearchItem(props) {
    return (
        <div className="searchItem">
            <div className="itemVideo">
                <video className="video" controls>
                    <source src={props.video} type="video/mp4" />
                    Your browser does not support the video tag
                </video>
            </div>
            <div className="itemInfo">
                <p className="itemArtist">{props.artist}</p>
                <p className="itemTitle">{props.title}</p>
                <div className="availParts">
                    {props.parts}
                </div>              
            </div>
        </div>
    );
}

class ResultsArea extends React.Component {

    renderResults(i) {
        return (
            <SearchItem value={this.props.item[i]} />
        )
    };

    render() {
        return (
            <div className="resultsArea">

            </div>
        );
    }
}

export default App;
