import React from 'react';
import Aux from '../../../hoc/Auxi/Auxi';   // Alguma coisa não permite usar o nome Aux.js
import Button from '../../UI/Button/Button';
import { getLanguage } from '../../../shared/utility';
 
const orderSummary = props => {
    // 
    const language = getLanguage();
    const titleText = {
        'EN': 'Your order',
        'ES': 'Su pedido',
        'BR': 'Seu pedido',
        'FR': 'Votre demande',
        'IT': 'La tua richiesta'
    }
    const subtitleText = {
        'EN': 'A delicious burger with the following ingredients',
        'ES': 'Una hamburguesa deliciosa con los siguientes ingredientes',
        'BR': 'Um hamburger delicioso com os seguintes ingredientes',
        'FR': 'Un délicieux hamburger avec les ingrédients suivants',
        'IT': 'Un delizioso hamburger con i seguenti ingredienti'
    }
    const priceText = {
        'EN': 'Total price:',
        'ES': 'Precio total:',
        'BR': 'Preço total:',
        'FR': 'Prix ​​total:',
        'IT': 'Prezzo totale:'
    }
    const questionText = {
        'EN': 'Continue to checkout?',
        'ES': 'Ir para el checkout?',
        'BR': 'Seguir para o checkout?',
        'FR': 'Continuer à payer?',
        'IT': 'Continuare al checkout?'
    }
    const cancelText = {
        'EN': 'CANCEL',
        'ES': 'CANCELAR',
        'BR': 'CANCELAR',
        'FR': 'ANNULER',
        'IT': 'ANNULLA'
    }
    const continueText = {
        'EN': 'CONTINUE',
        'ES': 'CONTINUAR',
        'BR': 'CONTINUAR',
        'FR': 'CONTINUER',
        'IT': 'CONTINUA'
    }

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
                <h3>{titleText[language]}</h3>
                <p>{subtitleText[language]}</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>{priceText[language]} {props.price.toFixed(2)} </strong></p>
                <p>{questionText[language]}</p>
                <Button btnType="Danger"  clicked={props.purchaseCancelled} >{cancelText[language]}</Button>
                <Button btnType="Success" clicked={props.purchaseContinued} >{continueText[language]}</Button>
            </Aux>            
        )
};

export default orderSummary;