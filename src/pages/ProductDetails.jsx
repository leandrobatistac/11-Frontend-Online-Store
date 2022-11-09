import React from 'react';
import { PropTypes } from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends React.Component {
  state = {
    objProduct: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productSelected = await getProductById(id);
    this.setState({ objProduct: productSelected });
  }

  render() {
    const { objProduct } = this.state;
    const { history } = this.props;
    return (
      <section>
        <p data-testid="product-detail-name">{ objProduct.title }</p>
        <img
          data-testid="product-detail-image"
          alt={ objProduct.title }
          src={ objProduct.thumbnail }
        />
        <p data-testid="product-detail-price">{ objProduct.price }</p>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => { history.push('/cart'); } }
        >
          Carrinho de Compras
        </button>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

ProductDetails.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ProductDetails;
