import React from 'react';
import { PropTypes } from 'prop-types';
import { getProductById, getLocalStorage } from '../services/api';

class ProductDetails extends React.Component {
  state = {
    objProduct: [],
    email: '',
    description: '',
    rating: '',
    isButtonDisabled: false,
    emailReview: '',
    descriptionReview: '',
    ratingReview: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productSelected = await getProductById(id);
    this.setState({ objProduct: productSelected });
    const recebaStorage = JSON.parse(localStorage.getItem(id));
    if (recebaStorage !== null) {
      this.setState({
        emailReview: recebaStorage.email,
        descriptionReview: recebaStorage.text,
        ratingReview: recebaStorage.rating,
      });
    }
  }

  onInputChange = (event) => {
    const { target } = event;
    this.setState({ isButtonDisabled: false });
    this.setState({ [target.name]: target.value });
  };

  handleClick = (event) => {
    const { target } = event;
    const { email, description, rating } = this.state;
    const newButtonState = email.length > 0
      && email.includes('@')
      && email.includes('.com')
      // && rating.length > 0
      && description.length > 0;
    if (newButtonState === false) {
      this.setState({ isButtonDisabled: !newButtonState });
    } else {
      const receba = { email, text: description, rating };
      localStorage.setItem(target.id, JSON.stringify(receba));
      this.setState({
        emailReview: email,
        descriptionReview: description,
        ratingReview: rating,
      });
      this.setState({ email: '', description: '' });
    }
  };

  onClickRating = (event) => {
    const { target } = event;
    this.setState({ rating: target.value });
  };

  saveLocalStorage(idsAdicionados) {
    let idsSalvos = getLocalStorage();
    if (!idsSalvos) {
      idsSalvos = [];
    }
    idsSalvos.push(idsAdicionados);
    localStorage.setItem('productSaveID', JSON.stringify(idsSalvos));
  }

  render() {
    const {
      objProduct,
      email,
      emailReview,
      description,
      descriptionReview,
      isButtonDisabled,
      ratingReview,
    } = this.state;
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
        <form>
          <input
            type="email"
            name="email"
            data-testid="product-detail-email"
            value={ email }
            onChange={ this.onInputChange }
          />
          <label htmlFor="1-rating">
            <input
              type="radio"
              id="1-rating"
              name="rating"
              value="1"
              onClick={ this.onClickRating }
              data-testid="1-rating"
            />
            1
          </label>
          <label htmlFor="2-rating">
            <input
              type="radio"
              id="2-rating"
              name="rating"
              value="2"
              onClick={ this.onClickRating }
              data-testid="2-rating"
            />
            2
          </label>
          <label htmlFor="3-rating">
            <input
              type="radio"
              id="3-rating"
              name="rating"
              value="3"
              onClick={ this.onClickRating }
              data-testid="3-rating"
            />
            3
          </label>
          <label htmlFor="4-rating">
            <input
              type="radio"
              id="4-rating"
              name="rating"
              value="4"
              onClick={ this.onClickRating }
              data-testid="4-rating"
            />
            4
          </label>
          <label htmlFor="5-rating">
            <input
              type="radio"
              id="5-rating"
              name="rating"
              value="5"
              onClick={ this.onClickRating }
              data-testid="5-rating"
            />
            5
          </label>
          <label htmlFor="description">
            Descrição
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
              value={ description }
              onChange={ this.onInputChange }
              data-testid="product-detail-evaluation"
            />
            <button
              type="button"
              id={ objProduct.id }
              // disabled={ isButtonDisabled }
              onClick={ this.handleClick }
              data-testid="submit-review-btn"
            >
              Enviar
            </button>
          </label>
        </form>
        { isButtonDisabled && <p data-testid="error-msg">Campos inválidos</p> }
        { emailReview && (
          <div>
            <p data-testid="review-card-email">{emailReview}</p>
            <p data-testid="review-card-rating">{ratingReview}</p>
            <p data-testid="review-card-evaluation">{descriptionReview}</p>
          </div>) }
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
