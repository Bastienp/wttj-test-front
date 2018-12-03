export const isDraggableMoved = (source, destination) => {
    return (!(destination.droppableId === source.droppableId && destination.index === source.index));

};

export const isSameSourceAndDestination = (source, destination) => {
    return source.droppableId === destination.droppableId
};

export const orderList = (newList, sourceIndex, destinationIndex) => {
    const [cardMoving] = newList.splice(sourceIndex, 1);
    newList.splice(destinationIndex, 0, cardMoving);
    return newList
};

export const moveBetweenList = (newSource, newDestination, droppableSource, droppableDestination) => {
    const [cardMoving] = newSource.splice(droppableSource.index, 1);
    newDestination.splice(droppableDestination.index, 0, cardMoving);
    const newLists = {};
    newLists[droppableSource.droppableId] = newSource;
    newLists[droppableDestination.droppableId] = newDestination;

    return newLists;
};