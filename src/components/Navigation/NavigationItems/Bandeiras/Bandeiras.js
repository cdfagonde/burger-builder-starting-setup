import React from 'react';
import classes from '../NavigationItem/NavigationItem.css';

// Bandeiras disponíveis
import Uk from './Bandeira/Uk';
import Spain from './Bandeira/Spain';
import Brasil from './Bandeira/Brasil';
import France from './Bandeira/France';
import Italy from './Bandeira/Italy';


const flag = (props) => {

    // Mostraremos todas as bandeiras exceto a do idioma atual
    const bandeiras = (
        <div className={classes.NavigationItem}>
            { props.language !== 'BR' && <Brasil clicked={() => props.clicked('BR')} />}
            { props.language !== 'FR' && <France clicked={() => props.clicked('FR')} />}
            { props.language !== 'IT' && <Italy  clicked={() => props.clicked('IT')} />}
            { props.language !== 'ES' && <Spain  clicked={() => props.clicked('ES')} />}
            { props.language !== 'EN' && <Uk     clicked={() => props.clicked('EN')} />}
        </div>
    )

    //
    return bandeiras
};

export default flag;