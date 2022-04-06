"use strict";

const url = "https://qa.aprende.dev/wp-json/aprende/v1/ap-master-class";

class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isDataLoaded: false,
      selectedCategory: null,
      visibleItems: 4,
      taxonomiesList: [],
    };
  }

  componentDidMount() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Recorro la lista de cursos, y extraigo las categorias
        const taxonomiesList = [];

        data.map((el) =>
          el.taxonomy["master-class-category"].map(
            (taxonomy) =>
              !taxonomiesList.includes(taxonomy.slug) &&
              taxonomiesList.push(taxonomy.slug)
          )
        );

        this.setState((prev) => ({
          ...prev,
          items: data,
          isDataLoaded: true,
          taxonomiesList: taxonomiesList,
        }));
      });
  }

  viewMore = () => {
    this.setState((prev) => ({ ...prev, visibleItems: prev.visibleItems + 4 }));
  };

  filterList = () => {
    return !this.state.selectedCategory
      ? this.state.items
      : this.state.items.filter((el) =>
          el.taxonomy["master-class-category"].some(
            (tax) => tax.slug === this.state.selectedCategory
          )
        );
  };

  handleClick = (taxonomy) => {
    this.setState(() => ({
      isDataLoaded: false,
    }));

    setTimeout(
      () =>
        this.setState((prev) => ({
          ...prev,
          selectedCategory: taxonomy,
          visibleItems: 4,
          isDataLoaded: true,
        })),
      200
    );
  };

  //TODO: falta escribir el toggle de clases

  render() {
    return this.state.isDataLoaded ? (
      <React.Fragment>
        <h2 className="title">Explora todas nuestras Clases Magistrales</h2>
        <div className="filter-container">
          <button
            className="filter-chip active"
            id="todas"
            onClick={() => this.handleClick(null)}
            name="all"
          >
            Todas
          </button>
          {this.state.taxonomiesList.map((taxonomy, i) => (
            <button
              key={taxonomy + i}
              className="filter-chip"
              onClick={() => this.handleClick(taxonomy)}
            >
              {taxonomy}
            </button>
          ))}
        </div>

        <div className="grid-container">
          {this.filterList()
            .filter((el, i) => i < this.state.visibleItems)
            .map((el) => {
              return <CardComponent data={el} key={el.id} />;
            })}
        </div>

        <button className="view-more" onClick={this.viewMore}>
          Ver mas
        </button>
      </React.Fragment>
    ) : (
      <p> fetching data.. </p>
    );
  }
}

class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.title = this.props.data.title.rendered;
    this.img = this.props.data.meta.thumbnail.sizes.medium || null;
  }

  render() {
    return (
      <div className="class-card">
        <div class="img-container">
          <img
            src={this.img || "./assets/card.png"}
            alt="class background image"
          />
        </div>
        <div className="text-container">
          <h4 className="title">{this.title}</h4>
          <button className="view-btn"> Ver clase </button>
        </div>
      </div>
    );
  }
}

let domContainer = document.querySelector("#third");
ReactDOM.render(<GridComponent />, domContainer);
