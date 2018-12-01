import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Card from "./Card";
import './CardList.css';
import {Droppable} from 'react-beautiful-dnd';

const CardList = ({users, name, step}) => (
    <Droppable droppableId={step} >
        {(provided) => (
            <div
                ref={provided.innerRef}
                className="cardList">
                {name}
                {users.map((user, index) => (
                    <Card firstname={user.firstname} step={user.step} id={user.id} key={user.id} index={index} />
                ))}
                {provided.placeholder}
            </div>
        )}


    </Droppable>
);
CardList.propTypes = {
    step: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
};

export default CardList;
