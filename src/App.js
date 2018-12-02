import React, { Component } from 'react';
import './App.css';
import CardList from "./CardList";
import {cardLists} from "./fixtures/cardLists";
import {DragDropContext} from "react-beautiful-dnd";
import axios from 'axios';
import Cable from "actioncable";


const isDraggableMoved = (destination, source) => {
    return (!(destination.droppableId === source.droppableId && destination.index === source.index));

};

const orderList = (newList, sourceIndex, destinationIndex) => {
    const [cardMoving] = newList.splice(sourceIndex, 1);
    newList.splice(destinationIndex, 0, cardMoving);
    return newList
};

const moveBetweenList = (newSource, newDestination, droppableSource, droppableDestination) => {
    const [cardMoving] = newSource.splice(droppableSource.index, 1);
    newDestination.splice(droppableDestination.index, 0, cardMoving);
    const newLists = {};
    newLists[droppableSource.droppableId] = newSource;
    newLists[droppableDestination.droppableId] = newDestination;

    return newLists;
};

class App extends Component {
    setStateOnUpdate(users) {
        this.setState({
            to_meet: users.filter(user => user.list_id === 1),
            interview: users.filter(user => user.list_id === 2)
        })
    }
    componentWillMount() {
        let cable = Cable.createConsumer('http://localhost:3001/cable');

        cable.subscriptions.create({channel: "BoardsChannel"}, {
            connect: () => { },
            received: (response) => {
                this.setStateOnUpdate(response.users)
            }
        })
    }

    componentDidMount() {
        axios.get('http://localhost:3001/users')
            .then(response => {
                this.setStateOnUpdate(response.data)
            })
            .catch(error => console.log(error));

        axios.get('http://localhost:3001/lists')
            .then(response => {
                this.setState({
                    cardLists: response.data
                })
            })
            .catch(error => console.log(error));
    }

    state = {
        cardLists: [],
        to_meet: [],
        interview: [],
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
            const users = newCardsList;
            axios.put('http://localhost:3001/users_positions', {
                users
            });

            this.setState(state)
        } else {
            const newLists = moveBetweenList(
                Array.from(this.state[source.droppableId]),
                Array.from(this.state[destination.droppableId]),
                source,
                destination
            );
            this.setState({
                to_meet: newLists.to_meet,
                interview: newLists.interview
            });

            axios.put('http://localhost:3001/users/' + draggableId, {
                user: {
                    list_id: cardLists.find(cardList => cardList.step === destination.droppableId).id
                }
            })
                .then(response => {
                    this.setState({
                        to_meet: response.data.filter(user => user.list_id === 1),
                        interview: response.data.filter(user => user.list_id === 2)
                    })
                })
                .catch(error => console.log(error))

        }
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.cardLists.map((cardList) => (
                    <CardList users={this.state[cardList.step]} name={cardList.title} step={cardList.step} id={cardList.id} key={cardList.id} />
                ))}
            </DragDropContext>
        );
    }
}

export default App;
