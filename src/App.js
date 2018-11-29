import React, { Component } from 'react';
import './App.css';
import CardList from "./CardList";
import {cardLists} from "./fixtures/cardLists";
import {users} from "./fixtures/users";
import {DragDropContext} from "react-beautiful-dnd";

function filterUsersByStep(step) {
    return users.filter( user =>
        user.step === step

    );
}


class App extends Component {

    onDragEnd = () => {

    };

  render() {
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
            {cardLists.map((cardList) => (
                <CardList users={filterUsersByStep(cardList.step)} name={cardList.name} key={cardList.id} />
            ))}
        </DragDropContext>
    );
  }
}

export default App;
