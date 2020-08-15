import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { getLanguage } from '../../../shared/utility';


const buildControls = (props) => {
    // Vejamos qual eh o idioma no localStorage
    const language = getLanguage();

    // Nomes dos ingredientes
    const saladText = {
        'EN': 'Salad',
        'ES': 'Lechuga',
        'BR': 'Alface',
        'FR': 'Salade',
        'IT': 'Lattuga'
    }
    const meatText = {
        'EN': 'Meat',
        'ES': 'Carne',
        'BR': 'Carne',
        'FR': 'Du boeuf',
        'IT': 'Manzo'
    }
    const cheeseText = {
        'EN': 'Cheese',
        'ES': 'Queso',
        'BR': 'Queijo',
        'FR': 'Fromage',
        'IT': 'Formaggio'
    }
    const baconText = {
        'EN': 'Bacon',
        'ES': 'Tocino',
        'BR': 'Bacon',
        'FR': 'Bacon',
        'IT': 'Bacon'
    }
    const priceText = {
        'EN': 'Current Price',
        'ES': 'Subtotal',
        'BR': 'Subtotal',
        'FR': 'Total',
        'IT': 'Totale parziale',
    }
    const orderText = {
        'EN': 'Order Now',
        'ES': 'Efectuar Pedido',
        'BR': 'Fazer o Pedido',
        'FR': 'Passer la commande',
        'IT': 'Invia ordine'
    }
    const signinText = {
        'EN': 'Signin to Order',
        'ES': 'Entrar para Pedir',
        'BR': 'Acessar para Pedir',
        'FR': 'Accès à la commande',
        'IT': "Accesso all'ordine"
    }
    const dolarText = {
        'EN': 'U$D',
        'ES': '$$',
        'BR': 'R$',
        'FR': '€',
        'IT': '€'
    }


    //
    const controls = [
        { label: saladText[language] , type: 'salad'  },
        { label: meatText[language]  , type: 'meat'   },
        { label: cheeseText[language], type: 'cheese' },
        { label: baconText[language] , type: 'bacon'  }
    ];
    
    return (
        <div className={classes.BuildControls} >
            <p>{priceText[language]} <strong>{ dolarText[language] + ' ' + props.price.toFixed(2)}</strong></p>
            {controls.map( ctrl => (
                <BuildControl 
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            ))}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered} >{props.isAuth ? orderText[language] : signinText[language] }</button>
        </div>
    )
};

export default buildControls;