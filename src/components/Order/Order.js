import React from 'react';
import classes from './Order.css';
import { getLanguage } from '../../shared/utility';

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
    //
    const language = getLanguage();
    const nameText = {
        'EN': 'Name: ',
        'ES': 'Nombre: ',
        'BR': 'Nome: ',
        'FR': 'Nom: ',
        'IT': 'Nome: '
    }
    const ingredientsText = {
        'EN': 'Ingredients: ',
        'ES': 'Ingredientes: ',
        'BR': 'Ingredientes: ',
        'FR': 'Ingrédients: ',
        'IT': 'ingredienti: '
    }
    const priceText = {
        'EN': 'Price: ',
        'ES': 'Precio: ',
        'BR': 'Preço: ',
        'FR': 'Prix: ',
        'IT': 'Prezzo: '
    }
    const dolarText = {
        'EN': 'U$D',
        'ES': '$$',
        'BR': 'R$',
        'FR': '€',
        'IT': '€'
    }
    const dateText = {
        'EN': 'Date: ',
        'ES': 'Fecha: ',
        'BR': 'Data: ',
        'FR': 'Date: ',
        'IT': 'Data: '
    }

    // Go..
    return (
        <div className={classes.Order}>
            <p>{nameText[language]}<b>{props.name}</b> [{props.email}]</p>
            <p>{ingredientsText[language]} {ingredientOutput}</p>
            <p>{priceText[language]} <strong>{dolarText[language]} {props.price.toFixed(2)}</strong></p>
            <p>{dateText[language]} {orderDateFormatted}</p>
        </div>
    );
};

export default order;