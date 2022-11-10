import React from 'react';
import { PropTypes } from 'prop-types';

class Button extends React.Component {
  render() {
    const { saveStorage } = this.props;
    return (
      <button
        type="button"
        data-testid="product-detail-add-to-cart"
        onClick={ saveStorage }
      >
        Adicionar ao Carrinho
      </button>
    );
  }
}

Button.propTypes = {
  saveStorage: PropTypes.shape().isRequired,
};

export default Button;
