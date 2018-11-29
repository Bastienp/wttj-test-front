import React, { Component } from 'react';
import './App.css';
import CardList from "./CardList";
import {cardLists} from "./fixtures/cardLists";
import {users} from "./fixtures/users";

function filterUsersByStep(step) {
    return users.filter( user =>
        user.step === step

    );
}


class App extends Component {
  render() {
    return (
        <div>
            {cardLists.map((cardList) => (
                <CardList users={filterUsersByStep(cardList.step)} name={cardList.name} step={cardList.step} />
            ))}
        </div>
    );
  }
}

export default App;
