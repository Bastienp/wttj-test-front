import React, { Component } from 'react';
import './App.css';
import CardList from "./CardList";
import {cardLists} from "./fixtures/cardLists";

class App extends Component {
  render() {
    return (
        <div>
            {cardLists.map((cardList) => (
                <CardList cardList={cardList} />
            ))}
        </div>
    );
  }
}

export default App;
