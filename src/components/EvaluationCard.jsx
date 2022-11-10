import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class EvaluationCard extends Component {
  render() {
    const { emailReview, ratingReview, descriptionReview } = this.props;
    return (
      <div>
        <p data-testid="review-card-email">{emailReview}</p>
        <p data-testid="review-card-rating">{ratingReview}</p>
        <p data-testid="review-card-evaluation">{descriptionReview}</p>
      </div>
    );
  }
}

EvaluationCard.propTypes = {
  emailReview: PropTypes.string.isRequired,
  ratingReview: PropTypes.string.isRequired,
  descriptionReview: PropTypes.string.isRequired,
};
