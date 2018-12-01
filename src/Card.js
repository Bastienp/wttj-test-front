import React, { Component } from 'react';
import './Card.css';
import PropTypes from 'prop-types'
import {Draggable} from "react-beautiful-dnd";



const Card = ({firstname, id, index}) => (
    <Draggable
        key={id}
        draggableId={id}
        index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className='card'>
                {firstname}
            </div>
        )}

    </Draggable>


);
Card.propTypes = {
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    step: PropTypes.string.isRequired,
};

export default Card;
