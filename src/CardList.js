import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Card from "./Card";
import './CardList.css';
import {Droppable} from 'react-beautiful-dnd';

const CardList = ({users, name}) => (
    <Droppable droppableId={name} >
        {(provided) => (
            <div
                ref={provided.innerRef}
                className="cardList">
                {name}
                {users.map((user) => (
                    <Card firstname={user.firstname} step={user.step} id={user.id} key={user.id} />
                ))}
                {provided.placeholder}
            </div>
        )}


    </Droppable>
);
CardList.propTypes = {
    users: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
};

export default CardList;
