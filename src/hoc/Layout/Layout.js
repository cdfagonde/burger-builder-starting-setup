import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxi/Auxi';   // Alguma coisa não permite usar o nome Aux.js
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer  from '../../components/Navigation/SideDrawer/SideDrawer';


const layout = props => {
    // Status para mostrar/ocultar sideDrawer
    const [ showSideDrawer,setShowSideDrawer ] = useState(false);

    // Tratamento do sideDrawer
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }
    const sideDrawerToggleHandler = () => {
        // Por causa do sync, nao podemos usar o state anterior de forma direta. Por isso vai a forma de função.
        // this.setState({ showSideDrawer: !this.state.showSideDrawer });
        // Agora usamos useState
        // this.setState((prevState) => {
        //     return { showSideDrawer: !prevState.showSideDrawer }
        // });
        setShowSideDrawer(!showSideDrawer);
    }

    // Aqui seria o render..
        return (
            <Aux>
                <Toolbar 
                    language={props.language}
                    changeLanguage={props.languageChanged}
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    language={props.language}
                    changeLanguage={props.languageChanged}
                    isAuth={props.isAuthenticated}
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content} language={props.language}>
                    {props.children}
                </main>
            </Aux>
        )
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);
