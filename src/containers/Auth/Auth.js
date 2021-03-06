import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { checkValidity, getLanguage } from '../../shared/utility';

const auth = props => {

    // Identificação do idioma..
    let language = getLanguage();
    //
    const emailText = {
        'EN': 'E-mail Address',
        'ES': 'Correo Electrónico',
        'BR': 'Endereço Eletrônico',
        'FR': 'Adresse e-mail',
        'IT': 'Indirizzo email'
    }
    const passwordText = {
        'EN': 'Password',
        'ES': 'Seña',
        'BR': 'Senha',
        'FR': 'Mot de passe',
        'IT': "Parola d'ordine"
    }
    const signInButtonText = {
        'EN': 'Sign In',
        'ES': 'Entrar',
        'BR': 'Entrar',
        'FR': "S'identifier",
        'IT': 'Accesso'
    }
    const signUpButtonText = {
        'EN': 'Sign Up',
        'ES': 'Registrar',
        'BR': 'Cadastrar',
        'FR': "S'inscrire",
        'IT': 'Registrati'
    }
    const switchText = {
        'EN': 'Switch to',
        'ES': 'Alterar para',
        'BR': 'Mudar para',
        'FR': 'Changer pour',
        'IT': 'Cambia in'
    }

    const [controls,setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: emailText[language]   // 'E-mail address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: passwordText[language]   // 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignup,setIsSignup] = useState(true);

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== "/"){
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath ]);


    const inputChangedHandler = ( event,controlName ) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value,controls[controlName].validation),
                touched: true
            }
        };
        // this.setState({ controls: updatedControls });
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        // console.log("Dentro do submitHandler");
        // Isto é para não disparar comportamento default do submit..
        event.preventDefault();
        // Agora sim..
        props.onAuth( controls.email.value, controls.password.value, isSignup );
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }


    // No lugar do render..
        const formElementsArray = [];

        // Nesta forma de for, cada key corresponde a cada uma das chaves.
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }

        let form = formElementsArray.map( formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                changed={ (event) => inputChangedHandler(event,formElement.id)}
                invalid={!formElement.config.valid && formElement.config.validation && formElement.config.touched}
                value={formElement.config.value} />
        ));
        if(props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(props.error){
            errorMessage = (
                <p>{props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(props.isAuthenticated){
            // O destino do redirect dependerá de se temos ou não um hamburger, e se estamos ou não conectados
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success" > { isSignup ? signUpButtonText[language] : signInButtonText[language] } </Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={switchAuthModeHandler}> {switchText[language]} { isSignup 
                                                                                ? signInButtonText[language]
                                                                                : signUpButtonText[language] } </Button>
            </div>
        );
};


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch( actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath('/'))
    };
};

export default connect( mapStateToProps,mapDispatchToProps )(auth);