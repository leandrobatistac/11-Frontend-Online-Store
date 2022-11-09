import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';

class Home extends React.Component {
  state = {
    haveSearch: false,
    searchResults: [],
    haveResults: false,
    categories: [],
  };

  componentDidMount() {
    this.setState({}, async () => {
      const receba = await getCategories();
      this.setState({ categories: receba });
    });
  }

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

  handleChecked = async (event) => {
    const { key, id } = event.target;
    const search = await getProductsFromCategoryAndQuery(id, key);

    this.setState({
      haveResults: true,
      searchResults: search.results,
    });
  };

  handleSearch = async () => {
    const { searchInput } = this.state;
    const result = await getCategories();
    const search = await getProductsFromCategoryAndQuery(result.id, searchInput);

    if (search.results.length > 0) {
      this.setState({ searchResults: search.results, haveResults: true });
    }
  };

  render() {
    const { haveSearch, searchResults, haveResults, categories } = this.state;
    return (
      <div>
        <aside>
          <Categories handleChecked={ this.handleChecked } categories={ categories } />
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

              <Link
                data-testid="product-detail-link"
                key={ product.id }
                to={ `/product/${product.id}` }
              >
                <div
                  data-testid="product"
                >
                  <p>{ product.title }</p>
                  <p>{ product.price }</p>
                  <img src={ product.thumbnail } alt={ product.id } />
                </div>
              </Link>
            )))
          : <p>Nenhum produto foi encontrado</p> }
      </div>
    );
  }
}

export default Home;
