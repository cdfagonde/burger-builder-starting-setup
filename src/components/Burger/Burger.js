import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // console.log(props);
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
        transformedIngredients = <p>Please choose your ingredients!</p>;
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