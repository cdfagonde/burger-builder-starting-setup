import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for ( let ingredientName in props.ingredients ){
        // incluimos cada ingrediente com a sua quantidade
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    const ingredientOutput = ingredients.map( ig => {
        return <span 
                    style={{ 
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 6px',
                        border: '1px solid #ccc',
                        backgroundColor: '#eee',
                        padding: '3px'
                    }}
                    key={ig.name}>{ig.name} ({ig.amount}) <br/></span>
    });

    // Vamos formatar a data do pedido..
    const orderDate = new Date(props.date);
    const yyyy = orderDate.getFullYear();
    const mm = orderDate.getMonth() < 9 ? "0" + (orderDate.getMonth() + 1) : (orderDate.getMonth() + 1); // getMonth() is zero-based
    const dd = orderDate.getDate() < 10 ? "0" + orderDate.getDate() : orderDate.getDate();
    const hh = orderDate.getHours() < 10 ? "0" + orderDate.getHours() : orderDate.getHours();
    const min = orderDate.getMinutes() < 10 ? "0" + orderDate.getMinutes() : orderDate.getMinutes();
    const orderDateFormatted = "".concat(dd).concat("/").concat(mm).concat("/").concat(yyyy).concat(" ").concat(hh).concat(":").concat(min);

    // Go..
    return (
        <div className={classes.Order}>
            <p>Name: <b>{props.name}</b> [{props.email}]</p>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>U$D {props.price.toFixed(2)}</strong></p>
            <p>Date: {orderDateFormatted}</p>
        </div>
    );
};

export default order;