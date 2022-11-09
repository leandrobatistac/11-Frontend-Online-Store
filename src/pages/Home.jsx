import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';

class Home extends React.Component {
  state = {
    haveSearch: false,
    searchResults: [],
    haveResults: false,
  };

  handleChange = ({ target: { name, value } }) => {
    const tamanho = 0;
    this.setState({ [name]: value });
    if (value.length > tamanho) {
      this.setState({ haveSearch: true });
    }

    if (value === '') {
      this.setState({ haveSearch: false });
    }
  };

  handleSearch = async () => {
    const { searchInput } = this.state;
    const result = await getCategories();
    const search = await getProductsFromCategoryAndQuery(result.id, searchInput);
    console.log(search.results);

    if (search.results.length > 0) {
      this.setState({ searchResults: search.results, haveResults: true });
    }
  };

  render() {
    const { haveSearch, searchResults, haveResults } = this.state;
    return (
      <div>
        <aside>
          <Categories />
        </aside>
        <form>
          <input
            data-testid="query-input"
            id="search-input"
            name="searchInput"
            placeholder="Pesquise Aqui"
            onChange={ this.handleChange }
          />
          <button
            onClick={ this.handleSearch }
            data-testid="query-button"
            type="button"
          >
            Pesquisar
          </button>
        </form>

        { !haveSearch
          ? (
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>)
          : null }

        { haveResults
          ? (
            searchResults.map((product) => (

              <div
                key={ product.id }
                data-testid="product"
              >
                <p>{ product.title }</p>
                <p>{ product.price }</p>
                <img src={ product.thumbnail } alt={ product.id } />
              </div>
            )))
          : <p>Nenhum produto foi encontrado</p> }
      </div>
    );
  }
}

export default Home;
