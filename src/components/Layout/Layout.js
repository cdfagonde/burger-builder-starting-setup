import React from 'react';
import Aux from '../../hoc/Auxi';   // Alguma coisa não permite usar o nome Aux.js
import classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout;
