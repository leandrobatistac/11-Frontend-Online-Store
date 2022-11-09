import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';

class Content extends React.Component {
  render() {
    return (
      <main className="content">
        <div>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/cart" component={ Cart } />
            <Route
              exact
              path="/product/:id"
              render={
                (props) => (<ProductDetails { ...props } />)
              }
            />
          </Switch>
        </div>
      </main>
    );
  }
}

export default Content;
