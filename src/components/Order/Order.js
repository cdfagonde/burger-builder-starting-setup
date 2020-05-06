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

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>U$D {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;