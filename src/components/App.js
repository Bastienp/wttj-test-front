import React, { Component } from 'react';
import './App.css';
import CardList from '../components/cardList/CardList';
import {cardLists} from '../fixtures/cardLists';
import {DragDropContext} from 'react-beautiful-dnd';
import Cable from 'actioncable';
import {isDraggableMoved, isSameSourceAndDestination, orderList, moveBetweenList} from './dragAndDropUtils'
import {getUsers, getLists, updateUsersPositions, updateUser} from '../api/api'

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
        getUsers().then(response => {
            this.setStateOnUpdate(response.data)
        })
            .catch(error => console.log(error));

        getLists().then(response => {
            this.setState({
                cardLists: response.data
            })
        })
            .catch(error => console.log(error));
    }


    movingBewteenLists(source, destination, draggableId) {
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
        const list_id = cardLists.find(cardList => cardList.step === destination.droppableId).id;
        const list_users = newLists[destination.droppableId];

        updateUser(draggableId, list_id, list_users).then(response => {
            this.setState({
                to_meet: response.data.filter(user => user.list_id === 1),
                interview: response.data.filter(user => user.list_id === 2)
            })
        })
            .catch(error => console.log(error))
    }

    reorderingList(source, destination) {
        const newCardsList = orderList(
            Array.from(this.state[source.droppableId]),
            source.index,
            destination.index
        );

        let state = {};
        if (source.droppableId === 'interview') {
            state = {interview: newCardsList};
        }
        if (source.droppableId === 'to_meet') {
            state = {to_meet: newCardsList}
        }
        updateUsersPositions(newCardsList);

        this.setState(state)
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

        if (!isDraggableMoved(source, destination)) {
            return;
        }

        if (isSameSourceAndDestination(source, destination)) {
            this.reorderingList(source, destination);
        } else {
            this.movingBewteenLists(source, destination, draggableId);

        }
    };



    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="board">
                    {this.state.cardLists.map((cardList) => (
                        <CardList users={this.state[cardList.step]} name={cardList.title} step={cardList.step} id={cardList.id} key={cardList.id} />
                    ))}
                </div>

            </DragDropContext>
        );
    }
}

export default App;
