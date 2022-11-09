import React from 'react';

class Cart extends React.Component {
  state = {
    haveItems: false,
  };

  render() {
    const { haveItems } = this.state;
    return (
      <section>
        {
          !haveItems
            ? (
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            ) : null
        }
      </section>
    );
  }
}

export default Cart;
