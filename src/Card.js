import React, { Component } from 'react';
import './Card.css';
import PropTypes from 'prop-types'
import {Draggable} from "react-beautiful-dnd";



const Card = ({firstname, lastname, job, id, index}) => (
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
                {firstname} {lastname}
                <div className='job'>{job}</div>
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
