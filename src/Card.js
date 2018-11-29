import React, { Component } from 'react';
import './Card.css';
import PropTypes from 'prop-types'


const Card = ({firstname}) => (
    <div className='card'>
        {firstname}
    </div>
);
Card.propTypes = {
    firstname: PropTypes.string.isRequired,
    step: PropTypes.string.isRequired,
};

export default Card;
