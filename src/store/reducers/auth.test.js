import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

// Teste de um reducer eh até mais simples..
describe('auth reducer', () => {
    it('Quando sem parametros, deveria retornar os valores iniciais', () => {
        // Vamos testar reducer sem receber nada..
        expect( reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('No login ok deve salvar o token após login', () => {
        //
        expect( reducer(
            {
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
            },
            {
                type: actionTypes.AUTH_SUCCESS,
                idToken: 'my-testing-token',
                userId: 'my-testing-user'
            }
         )).toEqual({
            token: 'my-testing-token',
            userId: 'my-testing-user',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('Se login falhar, deve salvar o erro e limpar', () => {
        //
        expect( reducer(
            {
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
            },
            {
                type: actionTypes.AUTH_FAIL,
                error: { message: 'Teste de login falhido' }
            }
         )).toEqual({
            token: null,
            userId: null,
            error: { message: 'Teste de login falhido' },
            loading: false,
            authRedirectPath: '/'
        });
    });

});