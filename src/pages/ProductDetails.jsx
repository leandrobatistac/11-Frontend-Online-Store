import React from 'react';
import { PropTypes } from 'prop-types';
import { getProductById, getLocalStorage } from '../services/api';

class ProductDetails extends React.Component {
  state = {
    objProduct: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productSelected = await getProductById(id);
    this.setState({ objProduct: productSelected });
  }

  saveLocalStorage(idsAdicionados) {
    let idsSalvos = getLocalStorage();
    if (!idsSalvos) {
      idsSalvos = [];
    }
    idsSalvos.push(idsAdicionados);
    localStorage.setItem('productSaveID', JSON.stringify(idsSalvos));
  }

  render() {
    const { objProduct } = this.state;
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
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.saveLocalStorage(objProduct) }
        >
          Adicionar ao Carrinho
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

export default ProductDetails;
