import React from 'react';
import logo from './logo.svg';
import masterList from './list';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: "",
            searchResults: masterList.dgvSongsMaster,
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

        if (Array.isArray(stepHolder) && !stepHolder.length) {
            this.setState({
                searchCriteria: event.target.value,
                searchResults: this.state.tempDatabase,
            });
        } else {
            this.setState({
                searchCriteria: event.target.value,
                searchResults: stepHolder,
            });
        }
    }



    render() {

        return (
            <div className="App">
                <SearchBar searchCriteria={this.state.searchCriteria} onChange={(i) => this.Search(i)} />
                <ResultsArea searchResults={this.state.searchResults} />
            </div>
        );
    }
}

function SearchBar(props) {

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

        
        <li className="searchItem" key={props.value.rowId}>
            <div className="itemVideo">
                
            </div>
            <div className="itemInfo">
                <p className="itemArtist">{props.value.colArtist}</p>
                <p className="itemTitle">{props.value.colTitle}</p>
                <p className="itemAlbum">{props.value.colAlbum}</p>
                <div className="availParts">
                    {props.value.colArrangements}
                </div>              
            </div>
        </li>
    );
}

function renderResults(props) {
    return (
        <SearchItem value={props}/>
    );
};

function ResultsArea(props) {

    let results = [];

    for (let i = 0; i < props.searchResults.length; i++) {
        results.push(renderResults(props.searchResults[i]));
    }

    return (
        <ul className="resultsArea">
            {results}
        </ul>
    );
}

export default App;
