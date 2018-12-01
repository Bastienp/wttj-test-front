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

    state = {
        to_meet: filterUsersByStep("to_meet"),
        interview: filterUsersByStep("interview"),
    };

    onDragEnd = result => {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const cardMoving = users.find(user => user.id === draggableId);
        const newCardsList = Array.from(this.state[source.droppableId]);
        newCardsList.splice(source.index, 1);
        newCardsList.splice(destination.index, 0, cardMoving);

        let state = {};
        if (source.droppableId === 'interview') {
            state = {interview: newCardsList };
        }
        if (source.droppableId === 'to_meet') {
            state = {to_meet: newCardsList}
        }

        this.setState(state)
    };

  render() {
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
            {cardLists.map((cardList) => (
                <CardList users={this.state[cardList.step]} name={cardList.name} step={cardList.step} key={cardList.id} />
            ))}
        </DragDropContext>
    );
  }
}

export default App;
