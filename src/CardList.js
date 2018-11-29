import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Card from "./Card";
import {users} from "./fixtures/users";


Card.propTypes = {
    name: PropTypes.string.isRequired
};

const CardList = ({cardList}) => (
    <div>
        {cardList.name}
        {users.map((user) => (
            <Card user={user} />
        ))}
    </div>
);

export default CardList;
