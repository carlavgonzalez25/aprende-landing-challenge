"use strict";

const url = "https://qa.aprende.dev/wp-json/aprende/v1/ap-master-class";

class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isDataLoaded: false,
      taxonomy: "all",
      visibleItems: 4,
    };
  }

  componentDidMount() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState((prev) => ({ ...prev, items: data, isDataLoaded: true }));
      });
  }

  viewMore = () => {
    this.setState((prev) => ({ ...prev, visibleItems: prev.visibleItems + 4 }));
  };

  filter = (array) => {
    return array.filter((el) =>
      el.taxonomy.some((tax) => tax.slug === this.state.selectedCategory)
    );
  };

  render() {
    return this.state.isDataLoaded ? (
      <React.Fragment>
        <h2 className="title">Explora todas nuestras Clases Magistrales</h2>
        <div className="filter-container">
          <div className="filter-chip active" id="todas">
            Todas
          </div>
          <div className="filter-chip" id="chocolateria">
            Chocolatería
          </div>
          <div className="filter-chip" id="Manicure">
            Manicure
          </div>
        </div>

        <div className="grid-container">
          {this.state.items
            .filter((el, i) => i < this.state.visibleItems)
            .map((el) => {
              console.log(el);
              return (
                <div key={el.id}>
                  <CardComponent />
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
  }

  render() {
    return (
      <div className="class-card">
        <img src="./assets/card.png" alt="class background image" />
        <div className="text-container">
          <h4 className="title">
            Title: H5 - Lorem ipsum dolor sit amet consectetur adipiscing
          </h4>
          <button className="view-btn"> Ver clase </button>
        </div>
      </div>
    );
  }
}

let domContainer = document.querySelector("#third");
ReactDOM.render(<GridComponent />, domContainer);
