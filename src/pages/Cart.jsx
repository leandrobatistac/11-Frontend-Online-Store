import React from 'react';
import { getLocalStorage } from '../services/api';
import CartCard from '../components/CartCard';

class Cart extends React.Component {
  state = {
    haveItems: false,
    objIDs: [],
  };

  componentDidMount() {
    if (getLocalStorage().length > 0) {
      this.setState({ haveItems: true });
    }

    this.setState({ objIDs: getLocalStorage() });
  }

  render() {
    const { haveItems, objIDs } = this.state;
    return (
      <section>
        {
          !haveItems
            ? (
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            ) : <CartCard id={ objIDs } />
        }
      </section>
    );
  }
}

export default Cart;
