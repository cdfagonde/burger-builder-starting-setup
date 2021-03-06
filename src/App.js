import React, { useState, useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import asyncComponent from '../src/hoc/asyncComponent/asyncComponent';
import { getLanguage } from './shared/utility';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// Os 3 componentes abaixo não precisam ser importados porque serão carregados via lazy loading
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
//
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


// Preparamos lazy-loading..
// const asyncCheckout = asyncComponent( () => {
const Checkout = React.lazy( () => {
  return import('./containers/Checkout/Checkout');
});

// const asyncOrders = asyncComponent( () => {
const Orders = React.lazy( () => {
  return import('./containers/Orders/Orders');
});

// const asyncAuth = asyncComponent( () => {
const Auth = React.lazy( () => {
  return import('./containers/Auth/Auth');
});


const app = props => {
    // // Primeira versão do useEffect, que será executado somente 1x, quando este componente for criado.
    // useEffect( () => {
    //   props.onAutoAuth();
    // }, []);

    // Uma outra forma seria indicar exatamente a dependencia do useEffect..
    const { onAutoAuth } = props;
    useEffect( () => {
      onAutoAuth();
    }, [onAutoAuth]);
  
    //
    if(process.env.NODE_ENV === 'development') {
      console.log("React version --> " + React.version);
    };

    // Se houver linguagem no local storage, começaremos com ela..
    const languageInLocalStorage = getLanguage();

    // Status para tratamento da linguagem
    const [ language,setLanguage ] = useState(languageInLocalStorage);

    // Tratamento da mudança de idioma
    const changeLanguageHandler = (lang) => {
        setLanguage(lang);
        localStorage.setItem("burger-language",lang);
    }

    //
    let routes = (
      <Switch>
        <Route path="/auth" render={props => <Auth {...props}/>} />
        <Route path="/"     exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if( props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/auth"     render={props => <Auth {...props}/>} />
          <Route path="/checkout" render={props => <Checkout {...props}/>} />
          <Route path="/orders"   render={props => <Orders {...props}/>} />
          <Route path="/logout"   component={Logout} />
          <Route path="/" exact   component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
      );
    }

    //
    const texto = {
      'EN': 'Loading..',
      'ES': 'Cargando..',
      'BR': 'Carregando..',
      'FR': 'Chargement..',
      'IT': 'Caricamento in corso..'
    }

    // Agora vai..
    return (
      <div>
        <Layout language={language} languageChanged={(lang) => changeLanguageHandler(lang)}>
          <Suspense fallback={<p>{texto[language]}</p>}>{routes}</Suspense>
        </Layout>
      </div>
    );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoAuth: () => dispatch( actions.authCheckState())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(app);
