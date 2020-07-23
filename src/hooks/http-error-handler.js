import { useEffect, useState} from 'react';

export default httpClient => {

    const [ error,setError ] = useState(null);

    // Neste caso vamos salvar para usar na hora de sair..
    const requestInterceptor = httpClient.interceptors.request.use(req => {
        // this.setState({ error: null });
        setError(null);
        return req;
    });
    const responseInterceptor = httpClient.interceptors.response.use( res => res,err => {
        // this.setState({ error: err });
        setError(err);
    });

    // Teoricamente com [] vai rodar 1 vez no inicio (não faz nada) e uma vez no unMount, mas não ficou 100% claro.
    // Mesmo assim, incluimos request e response como variaveis para executar novamente.
    useEffect( () => {
        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        };
    }, [requestInterceptor,responseInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    // Finalmente..
    return [error,errorConfirmedHandler];

}