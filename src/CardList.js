import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Card from "./Card";
import './CardList.css';

const CardList = ({users, name}) => (
    <div className="cardList">
        {name}
        {users.map((user) => (
            <Card firstname={user.firstname} step={user.step} key={user.id} />
        ))}
    </div>
);
CardList.propTypes = {
    users: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
};

export default CardList;
