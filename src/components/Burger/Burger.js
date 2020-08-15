import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { getLanguage } from '../../shared/utility';

const burger = (props) => {
    // 
    const language = getLanguage();
    const messageText = {
        'EN': 'Please choose your ingredients!',
        'ES': 'Por favor, elija sus ingredientes!',
        'BR': 'Por favor, escolha seus ingredientes!',
        'FR': 'Veuillez choisir vos ingrédients!',
        'IT': 'Scegli i tuoi ingredienti!'
    }

    // Agora algo interessante.. vamos transformar o objeto ingredients de forma de poder gerar os ingredientes do burger
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( (_,i) => {
                return <BurgerIngredient key={igKey+i} type={igKey} />;
            } );
        })
        .reduce( (arr,el) => {   // Isto para eliminar elementos vazios..
            return arr.concat(el);
        }, [] );
    //
    // console.log( " --> ", transformedIngredients);

    if( transformedIngredients.length === 0 ){
        transformedIngredients = <p>{messageText[language]}</p>;
    }

    //
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;