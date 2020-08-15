import React, { useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

import classes from './ContactData.css';
import { getLanguage } from '../../../shared/utility';

const contactData = props => {
    // Precisamos identificar o idioma..
    const language = getLanguage();

    // Os textos dos campos dependerão do idioma
    const nameText = {
        'EN': 'Your name',
        'ES': 'Tu nombre',
        'BR': 'Seu nome',
        'FR': 'Votre nom',
        'IT': 'Il tuo nome',
    }
    const streetText = {
        'EN': 'Your street',
        'ES': 'Tu calle',
        'BR': 'Sua rua',
        'FR': 'Votre rue',
        'IT': 'La tua strada'
    }
    const zipCodeText = {
        'EN': 'Your zip code',
        'ES': 'Tu código postal',
        'BR': 'Seu CEP',
        'FR': 'Ton code postal',
        'IT': 'Il tuo codice postale',
    }
    const countryText = {
        'EN': 'Your country',
        'ES': 'Tu pais',
        'BR': 'Seu pais',
        'FR': 'Votre pays',
        'IT': 'Il tuo paese'
    }
    const emailText = {
        'EN': 'Your e-mail',
        'ES': 'Tu e-mail',
        'BR': 'Seu e-mail',
        'FR': 'Votre email',
        'IT': 'Il tuo e-mail'
    }
    const deliveryMethodText = {
        'EN': { 'standard': 'Standard',
                'fastest': 'Fastest',
                'cheapest': 'Cheapest' },
        'ES': { 'standard': 'Normal',
                'fastest': 'Más rápido',
                'cheapest': 'Más barato' },
        'BR': { 'standard': 'Padrão',
                'fastest': 'Mais rápido',
                'cheapest': 'Mais barato' },
        'FR': { 'standard': 'Standard',
                'fastest': 'plus rapide',
                'cheapest': 'Moins cher' },
        'IT': { 'standard': 'Padrão',
                'fastest': 'Più veloce',
                'cheapest': 'Più economico' },
    }
    const buttonText = {
        'EN': 'ORDER',
        'ES': 'PEDIR',
        'BR': 'SOLICITAR',
        'FR': 'DEMANDE',
        'IT': 'RICHIESTA',
    }
    const titleText = {
        'EN': 'Enter your contact data',
        'ES': 'Informe sus datos para contacto',
        'BR': 'Informe seus dados de contato',
        'FR': 'Entrez vos coordonnées',
        'IT': 'Inserisci i tuoi dati di contatto'
    }

    //
    const [orderForm,setOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: nameText[language]   // 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: streetText[language]   // 'Your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: zipCodeText[language]   // 'Your zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: countryText[language]   // 'Your country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: emailText[language]   // 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'standard', display: deliveryMethodText[language]['standard']   /* 'Standard' */ },
                        {value: 'fastest' , display: deliveryMethodText[language]['fastest']   /* 'Fastest' */ },
                        {value: 'cheapest', display: deliveryMethodText[language]['cheapest']   /* 'Cheapest' */ }
                    ]
                },
                value: 'standard',
                valid: true
            },
        });
    const [formIsValid,setFormIsValid] = useState(false);


    const orderHandler = (event) => {
        event.preventDefault();
        //
        const formData = {};
        // Formamos nome:valor com os elementos do formulário
        for(let elemID in orderForm){
            formData[elemID] = orderForm[elemID].value;
        }

        // Defino a hora atual para guardar junto com o pedido
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

        // Este será o nosso pedido
        const order = {
            ingredients: props.ings,
            price: props.tprc,
            orderData: formData,
            userId: props.userId,
            timestamp: dateTime
        }

        // 
        props.onOrderBurger( order,props.token );

    }

    const inputChangedHandler = (event,inputIdentifier) => {
        // Primeiramente vou clonar o orderForm do state.
        const updatedOrderForm = {
            ...orderForm
        }
        // Essa clonagem só funciona no primeiro núvel. Os elementos que eram objetos, nao foram clonados. Ainda são uma referencia
        // assim como o anterior. Por este motivo, precisamos clonar novamente o elemento que desejamos 
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        // Agora que já temos o que queriamos (value), podemos atulizar..
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;   // Agora sabemos que este item foi tocado..
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // Vamos definir se o formulário inteiro eh valido ou nao
        let formIsValid = true;
        for (let anInput in updatedOrderForm) {
            formIsValid = updatedOrderForm[anInput].valid && formIsValid;
        }
        
        // Só nos resta atualizar o state. Tudo isto só para atualizar o valor !!!
        // this.setState({ 
        //     orderForm: updatedOrderForm,
        //     formIsValid: formIsValid
        //  });
         setOrderForm(updatedOrderForm);
         setFormIsValid(formIsValid);
    }


    // No lugar do render..
        const formElementsArray = [];

        // Nesta forma de for, cada key corresponde a cada uma das chaves.
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }

        let form = (
            <form onSubmit={orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        changed={ (event) => inputChangedHandler(event,formElement.id)}
                        invalid={!formElement.config.valid && formElement.config.validation && formElement.config.touched}
                        value={formElement.config.value} />
                ))}

                <Button btnType="Success" disabled={!formIsValid}>{buttonText[language]}</Button>
            </form>
        );
        if(props.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>{titleText[language]}</h4>
                {form}
            </div>
        );

}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        tprc: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: ( orderData,token ) => dispatch( actions.purchaseBurger( orderData,token ))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactData,axios));