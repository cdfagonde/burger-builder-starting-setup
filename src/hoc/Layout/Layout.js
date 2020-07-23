import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxi/Auxi';   // Alguma coisa não permite usar o nome Aux.js
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer  from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    // state = {
    //     showSideDrawer: false
    // }
    const [ showSideDrawer,setShowSideDrawer ] = useState(false);

    const sideDrawerClosedHandler = () => {
        // this.setState({ showSideDrawer: false });
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
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
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
