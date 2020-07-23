import React from 'react';
import Aux from '../../../hoc/Auxi/Auxi';   // Alguma coisa não permite usar o nome Aux.js
import Button from '../../UI/Button/Button';
 
const orderSummary = props => {
    // Este aqui poderia ser um functional, só virou class para poder usar 
    // componentDidUpdate para debugging
    /* componentDidUpdate () {
        console.log('[OrderSummary] Did Update');
    } */

    //
        const ingredientSummary = Object.keys(props.ingredients)
            .map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>)
            });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)} </strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger"  clicked={props.purchaseCancelled} >CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued} >CONTINUE</Button>
            </Aux>            
        )
};

export default orderSummary;