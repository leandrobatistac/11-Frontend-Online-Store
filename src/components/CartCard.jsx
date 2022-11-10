import React from 'react';
import { getLocalStorage } from '../services/api';

class CartCard extends React.Component {
  render() {
    const cartAdded = getLocalStorage();

    const addedUnique = cartAdded.reduce((acc, curr) => {
      if (!acc.some((item) => item.id === curr.id)) acc.push(curr);
      return acc;
    }, []);

    console.log(cartAdded);
    return (
      <section>
        { addedUnique.map((product, index) => (
          <div key={ index }>
            <img alt={ product.id } src={ product.thumbnail } />
            <p data-testid="shopping-cart-product-name">{ product.title }</p>
            <p
              data-testid="shopping-cart-product-quantity"
            >
              { cartAdded.filter((p) => p.id === product.id).length }

            </p>
          </div>
        )) }
      </section>
    );
  }
}

export default CartCard;
