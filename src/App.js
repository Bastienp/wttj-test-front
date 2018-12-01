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

const isDraggableMoved = (destination, source) => {
    let moved = (destination.droppableId === source.droppableId && destination.index === source.index) ? false : true;
    return moved
};

const orderList = (newList, cardMoving, sourceIndex, destinationIndex) => {
    newList.splice(sourceIndex, 1);
    newList.splice(destinationIndex, 0, cardMoving);
    return newList

};

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


        if (!isDraggableMoved(destination, source)) {
            return;
        }

        const newCardsList = orderList(
            Array.from(this.state[source.droppableId]),
            users.find(user => user.id === draggableId),
            source.index,
            destination.index
        );

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
