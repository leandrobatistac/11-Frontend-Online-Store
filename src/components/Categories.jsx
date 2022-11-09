import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Categories extends Component {
  render() {
    const { categories, handleChecked } = this.props;
    return (
      <div>
        { categories.map((c) => (
          <label key={ c.id } htmlFor={ c.id }>
            <input
              key={ c.name }
              type="radio"
              name="category"
              id={ c.id }
              onChange={ handleChecked }
              data-testid="category"
            />
            { c.name }
          </label>
        )) }
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
  })).isRequired,
  handleChecked: PropTypes.func.isRequired,
};
