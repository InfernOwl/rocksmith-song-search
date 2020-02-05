import React from 'react';
import logo from './logo.svg';
import masterList from './list';
import './App.css';
import Slider from 'react-slick'

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
                <ResultsArea searchResults={this.state.searchResults}/>
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
        <div className="searchItem">
            <div className="itemVideo">
                
            </div>
            <div className="itemInfo">
                <p className="itemArtist">{props.colArtist}</p>
                <p className="itemTitle">{props.colTitle}</p>
                <p className="itemAlbum">{props.colAlbum}</p>
                <div className="availParts">
                    {props.colArrangements}
                </div>
            </div>
        </div>
    );
}

class ResultsArea extends React.Component {

    constructor(props) {
        super(props);
        this.scrollCheck = this.scrollCheck.bind(this);
    }


    scrollCheck(event) {

        console.log(this.slider.current);
        if (event.deltaY > 0) {
            console.log("Mouse Wheel Changed");
            this.slider.slickNext();
        } else {
            console.log("Mouse Wheel Chonged");
            this.slider.slickPrev();

        }
    }

    render() {

        const settings = {
            slidesToShow: 3,
            speed: 50,
            swipetoSlide: true,
            touchMove: true,
            infinite: true,
            centerMode: true,
            className: "middle",
            centerPadding: "60px",
        };

        let results = [];

        for (let i = 0; i < this.props.searchResults.length; i++) {
            results.push(SearchItem(this.props.searchResults[i]));
        }

        return (
            <div className="container" onWheel={(i) => this.scrollCheck(i)}>
                <Slider ref={c=>(this.slider = c)} {...settings}>
                    {results}
                </Slider>
            </div>
        );
    }
}

export default App;