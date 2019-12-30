import React, { Component } from 'react';
import Aux from '../../../hoc/Auxi/Auxi';   // Alguma coisa não permite usar o nome Aux.js
import Button from '../../UI/Button/Button';
 
class OrderSummary extends Component {
    // Este aqui poderia ser um functional, só virou class para poder usar 
    // componentDidUpdate para debugging
    /* componentDidUpdate () {
        console.log('[OrderSummary] Did Update');
    } */

    //
    render () {
        //
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>)
            });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)} </strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger"  clicked={this.props.purchaseCancelled} >CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued} >CONTINUE</Button>
            </Aux>            
        )
    }
};

export default OrderSummary;