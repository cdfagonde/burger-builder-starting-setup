import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxi/Auxi';
// Nosso custom hook
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = ( WrappedComponent,axios ) => {
    return props => {

        // Estou usando estes 2 nomes só para manter os que já tinha definido anteriormente.
        const [error,errorConfirmedHandler] = useHttpErrorHandler(axios);

        // No local do render..
            return (
                <Aux>
                    <Modal 
                        show={error}
                        modalClosed={errorConfirmedHandler}>
                        {/* { this.state.error ? this.state.error.message : null } */}
                        { error && error.message  }
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            ); 
    };
}

export default withErrorHandler;