import React from 'react';
import Categories from '../components/Categories';

class Home extends React.Component {
  state = {
    haveSearch: false,
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

  render() {
    const { haveSearch } = this.state;
    return (
      <div>
        <aside>
          <Categories />
        </aside>
        <form>
          <input
            data-testid=""
            id="search-input"
            name="search-input"
            placeholder="Pesquise Aqui"
            onChange={ this.handleChange }
          />
        </form>

        { !haveSearch
          ? (
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>)
          : null }
      </div>
    );
  }
}

export default Home;
