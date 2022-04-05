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
    };
  }

  componentDidMount() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState((prev) => ({ ...prev, items: data, isDataLoaded: true }));

        /* Crear funcion que extraiga los taxonomy de cada clase y cree un array  

        item.taxonomy.master-class-taxonomy.map((taxonomy) => this.setState((prev) => ({categories: {...prev.categories, }})))

        item = [
            {
                taxonomy: {
                    master-class-taxonomy:  [{
                        name: "Emprendimiento",
                        slug: "emprendimiento",
                        term_id : 1786,
                    }, {}]
                }
                    
                ]
            }, {}
        ]

        */
      });
  }

  viewMore = () => {
    this.setState((prev) => ({ ...prev, visibleItems: prev.visibleItems + 4 }));
  };

  filterList = () => {
    console.log(" y aca no entra ? ", this.state.selectedCategory);

    //this.state.items.map((el) => console.log(el));

    //return this.state.items;

    return !this.state.selectedCategory
      ? this.state.items
      : this.state.items.filter((el) =>
          el.taxonomy["master-class-category"].some(
            (tax) => tax.slug === this.state.selectedCategory
          )
        );
  };

  handleClick = (taxonomy) => {
    this.setState((prev) => ({ ...prev, selectedCategory: taxonomy }));
  };

  render() {
    return this.state.isDataLoaded ? (
      <React.Fragment>
        <h2 className="title">Explora todas nuestras Clases Magistrales</h2>
        <div className="filter-container">
          <button
            className="filter-chip active"
            id="todas"
            onClick={() => this.handleClick(null)}
          >
            Todas
          </button>
          <button
            className="filter-chip"
            id="chocolateria"
            onClick={() => this.handleClick("chocolateria")}
          >
            Chocolatería
          </button>
          <button
            className="filter-chip"
            id="Manicure"
            onClick={() => this.handleClick("emprendimiento")}
          >
            Emprendimiento
          </button>
        </div>

        <div className="grid-container">
          {this.filterList()
            /* this.state.items */
            .filter((el, i) => i < this.state.visibleItems)
            .map((el) => {
              return (
                <div key={el.id}>
                  <CardComponent data={el} />
                </div>
              );
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
        <img
          src={this.img || "./assets/card.png"}
          alt="class background image"
        />
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
