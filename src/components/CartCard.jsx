import React from 'react';
import { PropTypes } from 'prop-types';
import { getProductById } from '../services/api';

class CartCard extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <section>
        <p>{ () => getProductById(id).title }</p>
      </section>
    );
  }
}

export default CartCard;

CartCard.propTypes = {
  id: PropTypes.string.isRequired,
};
