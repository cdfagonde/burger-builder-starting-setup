import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxi/Auxi';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
    //
    // shouldComponentUpdate(nextProps,nextState) {
    //     return ( nextProps.show !== this.props.show || nextProps.children !== this.props.children );
    // }

    // Usei componentWillUpdate só par testes
    /* componentWillUpdate() {
        console.log('[Modal] Will Update');
    } */

    //
        return (
            <Aux>
                <Backdrop show={props.show} clicked={props.modalClosed} />
                <div 
                    className={classes.Modal} 
                    style={{ 
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}> {props.children} </div>
            </Aux>
        )
}

// Usamos React.memo por performance. Só vai atualizar quando alguma das propriedades mudar.
// React.memo oferece um segundo parametro para definir nossa função de comparação.
// Nessa função de comparação devemos indicar quando as propriedades são iguais. Com isso, a lógica erá inversa do shouldComponentUpdate.
export default React.memo(modal, (prevProps,nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children );