import React from 'react';
import {isDraggableMoved, isSameSourceAndDestination} from "./dragAndDropUtils";


describe('isDraggableMoved', () => {
    it('returns true if the card change position on the list', () => {
        const source = [];
        const destination = [];
        source.droppableId = 1;
        source.index = 1;
        destination.droppableId = 1;
        destination.index = 2;
        expect(isDraggableMoved(source, destination)).toEqual(true);
    });
    it('returns true if the card go to another list', () => {
        const source = [];
        const destination = [];
        source.droppableId = 1;
        source.index = 1;
        destination.droppableId = 2;
        destination.index = 1;
        expect(isDraggableMoved(source, destination)).toEqual(true);
    });
    it('returns false if the card doesnt change his position and doesnt switch to another list', () => {
        const source = [];
        const destination = [];
        source.droppableId = 1;
        source.index = 1;
        destination.droppableId = 1;
        destination.index = 1;
        expect(isDraggableMoved(source, destination)).toEqual(false);
    })
});

describe('isSameSourceAndDestination', () => {
    it('returns true if the card change position on the list', () => {
        const source = [];
        const destination = [];
        source.droppableId = 1;
        destination.droppableId = 1;
        expect(isSameSourceAndDestination(source, destination)).toEqual(true);
    });
    it('returns false if the card go to another list', () => {
        const source = [];
        const destination = [];
        source.droppableId = 1;
        destination.droppableId = 2;
        expect(isDraggableMoved(source, destination)).toEqual(true);
    })
});