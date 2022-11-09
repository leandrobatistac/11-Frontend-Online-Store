import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.setState({}, async () => {
      const receba = await getCategories();
      this.setState({ categories: receba });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        { categories.map((c) => (
          <label key={ c.id } htmlFor={ c.id }>
            <input
              key={ c.id }
              type="radio"
              name="category"
              id={ c.id }
              data-testid="category"
            />
            { c.name }
          </label>
        )) }
      </div>
    );
  }
}
