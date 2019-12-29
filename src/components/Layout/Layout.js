import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';   // Alguma coisa não permite usar o nome Aux.js
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer  from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    
    sideDrawerToggleHandler = () => {
        // Por causa do sync, nao podemos usar o state anterior de forma direta. Por isso vai a forma de função.
        // this.setState({ showSideDrawer: !this.state.showSideDrawer });
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
}

export default Layout;
