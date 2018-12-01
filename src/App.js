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

const moveBetweenList = (newSource, newDestination, cardMoving, droppableSource, droppableDestination) => {
    newSource.splice(droppableSource.index, 1);
    newDestination.splice(droppableDestination.index, 0, cardMoving);
    const newLists = {};
    newLists[droppableSource.droppableId] = newSource;
    newLists[droppableDestination.droppableId] = newDestination;

    return newLists;
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

        if (source.droppableId === destination.droppableId) {
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
        } else {
            const newLists = moveBetweenList(
                Array.from(this.state[source.droppableId]),
                Array.from(this.state[destination.droppableId]),
                users.find(user => user.id === draggableId),
                source,
                destination
            );
            this.setState({
                to_meet: newLists.to_meet,
                interview: newLists.interview
            })
        }
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
