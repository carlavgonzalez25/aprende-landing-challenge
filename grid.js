"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var url = "https://qa.aprende.dev/wp-json/aprende/v1/ap-master-class";

var GridComponent = function (_React$Component) {
  _inherits(GridComponent, _React$Component);

  function GridComponent(props) {
    _classCallCheck(this, GridComponent);

    var _this = _possibleConstructorReturn(this, (GridComponent.__proto__ || Object.getPrototypeOf(GridComponent)).call(this, props));

    _this.viewMore = function () {
      _this.setState(function (prev) {
        return Object.assign({}, prev, { visibleItems: prev.visibleItems + 4 });
      });
    };

    _this.filterList = function () {
      console.log(" y aca no entra ? ", _this.state.selectedCategory);

      //this.state.items.map((el) => console.log(el));

      //return this.state.items;

      return !_this.state.selectedCategory ? _this.state.items : _this.state.items.filter(function (el) {
        return el.taxonomy["master-class-category"].some(function (tax) {
          return tax.slug === _this.state.selectedCategory;
        });
      });
    };

    _this.handleClick = function (taxonomy) {
      _this.setState(function (prev) {
        return Object.assign({}, prev, { selectedCategory: taxonomy });
      });
    };

    _this.state = {
      items: [],
      isDataLoaded: false,
      selectedCategory: null,
      visibleItems: 4
    };
    return _this;
  }

  _createClass(GridComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch(url).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this2.setState(function (prev) {
          return Object.assign({}, prev, { items: data, isDataLoaded: true });
        });

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
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return this.state.isDataLoaded ? React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "h2",
          { className: "title" },
          "Explora todas nuestras Clases Magistrales"
        ),
        React.createElement(
          "div",
          { className: "filter-container" },
          React.createElement(
            "button",
            {
              className: "filter-chip active",
              id: "todas",
              onClick: function onClick() {
                return _this3.handleClick(null);
              }
            },
            "Todas"
          ),
          React.createElement(
            "button",
            {
              className: "filter-chip",
              id: "chocolateria",
              onClick: function onClick() {
                return _this3.handleClick("chocolateria");
              }
            },
            "Chocolater\xEDa"
          ),
          React.createElement(
            "button",
            {
              className: "filter-chip",
              id: "Manicure",
              onClick: function onClick() {
                return _this3.handleClick("emprendimiento");
              }
            },
            "Emprendimiento"
          )
        ),
        React.createElement(
          "div",
          { className: "grid-container" },
          this.filterList()
          /* this.state.items */
          .filter(function (el, i) {
            return i < _this3.state.visibleItems;
          }).map(function (el) {
            return React.createElement(
              "div",
              { key: el.id },
              React.createElement(CardComponent, { data: el })
            );
          })
        ),
        React.createElement(
          "button",
          { className: "view-more", onClick: this.viewMore },
          "Ver mas"
        )
      ) : React.createElement(
        "p",
        null,
        " fetching data.. "
      );
    }
  }]);

  return GridComponent;
}(React.Component);

var CardComponent = function (_React$Component2) {
  _inherits(CardComponent, _React$Component2);

  function CardComponent(props) {
    _classCallCheck(this, CardComponent);

    var _this4 = _possibleConstructorReturn(this, (CardComponent.__proto__ || Object.getPrototypeOf(CardComponent)).call(this, props));

    _this4.title = _this4.props.data.title.rendered;
    _this4.img = _this4.props.data.meta.thumbnail.sizes.medium || null;
    return _this4;
  }

  _createClass(CardComponent, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "class-card" },
        React.createElement("img", {
          src: this.img || "./assets/card.png",
          alt: "class background image"
        }),
        React.createElement(
          "div",
          { className: "text-container" },
          React.createElement(
            "h4",
            { className: "title" },
            this.title
          ),
          React.createElement(
            "button",
            { className: "view-btn" },
            " Ver clase "
          )
        )
      );
    }
  }]);

  return CardComponent;
}(React.Component);

var domContainer = document.querySelector("#third");
ReactDOM.render(React.createElement(GridComponent, null), domContainer);