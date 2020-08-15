import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Bandeiras from '../NavigationItems/Bandeiras/Bandeiras';


const navigationItems = (props) => {
    const language = props.language;

    //
    const burgerBuilderText = {
        'EN': ' Burger Builder ',
        'ES': ' Burger Builder ',
        'BR': ' Burger Builder ',
        'FR': ' Burger Builder ',
        'IT': ' Burger Builder ',
    }
    const ordersText = {
        'EN': ' Orders ',
        'ES': ' Pedidos ',
        'BR': ' Pedidos ',
        'FR': ' Demandes ',
        'IT': ' Richieste ',
    }
    const logoutText = {
        'EN': ' Logout ',
        'ES': ' Salir ',
        'BR': ' Sair ',
        'FR': ' Sortie ',
        'IT': ' Uscita '
    }
    const loginText = {
        'EN': ' Authenticate ',
        'ES': ' Autenticación ',
        'BR': ' Autenticação ',
        'FR': ' Authentification ',
        'IT': ' Autenticazione '
    }

    //
    return (
        <ul className={classes.NavigationItems}>
            <Bandeiras language={language} clicked={(lang) => props.changeLanguage(lang) } />

            <NavigationItem link="/" exact> {burgerBuilderText[language]} </NavigationItem>
            {props.isAuthenticated
                ? <NavigationItem link="/orders"> {ordersText[language]} </NavigationItem>
                : null }
            {props.isAuthenticated
                ? <NavigationItem link="/logout"> {logoutText[language]} </NavigationItem>
                : <NavigationItem link="/auth"> {loginText[language]} </NavigationItem>
            }
        </ul>
    )
}

export default navigationItems;