import React from 'react';
import { PropTypes } from 'prop-types';
import {
  getProductById,
  getLocalStorage,
  getLocalStorageAvaliação,
} from '../services/api';
import EvaluationCard from '../components/EvaluationCard';

class ProductDetails extends React.Component {
  state = {
    objProduct: [],
    email: '',
    description: '',
    rating: '',
    isButtonDisabled: false,
    localReview: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productSelected = await getProductById(id);
    this.setState({ objProduct: productSelected });
    const recebaStorage = JSON.parse(localStorage.getItem(id));
    if (recebaStorage !== null) {
      this.setState({ localReview: recebaStorage });
    }
  }

  onInputChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });
  };

  handleClick = (event) => {
    const { target } = event;
    const { email, description, rating } = this.state;
    const newButtonState = email.length > 0
      && email.includes('@')
      && email.includes('.com')
      && rating.length > 0;
    if (newButtonState === false) {
      this.setState({ isButtonDisabled: !newButtonState });
    } else {
      this.setState({ isButtonDisabled: !newButtonState });
      let recebaStorage = getLocalStorageAvaliação(target.id);
      if (!recebaStorage) {
        recebaStorage = [];
      }
      const receba = { email, text: description, rating };
      recebaStorage.push(receba);
      console.log(recebaStorage);
      localStorage.setItem(target.id, JSON.stringify(recebaStorage));
      this.setState({ email: '', description: '' });
      this.setState({ localReview: recebaStorage });
    }
    // window.location.reload(false);
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
      description,
      isButtonDisabled,
      localReview,
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
        {
          localReview.length > 0 && localReview.map((r, index) => (
            <EvaluationCard
              key={ index }
              emailReview={ r.email }
              ratingReview={ r.rating }
              descriptionReview={ r.text }
            />))
        }
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
