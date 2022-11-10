import React from 'react';
import { getLocalStorage } from '../services/api';

class CartCard extends React.Component {
  state = {
    uniqueItem: [],
    haveItems: false,
  };

  componentDidMount() {
    if (getLocalStorage() !== null) {
      const addedUnique = getLocalStorage().reduce((acc, curr) => {
        if (!acc.some((item) => item.id === curr.id)) acc.push(curr);
        return acc;
      }, []);

      this.setState({ uniqueItem: addedUnique, haveItems: true });
    }
  }

  render() {
    const { uniqueItem, haveItems } = this.state;
    return (
      haveItems ? (
        <section>
          { uniqueItem.map((product, index) => (
            <div key={ index }>
              <img alt={ product.id } src={ product.thumbnail } />
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                { uniqueItem.filter((p) => p.id === product.id).length }

              </p>
            </div>
          )) }
        </section>)
        : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>

    );
  }
}

export default CartCard;
