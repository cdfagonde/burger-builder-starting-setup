import React from 'react';
import Aux from '../../hoc/Auxi';   // Alguma coisa não permite usar o nome Aux.js

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
)

export default layout;
