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
      return !_this.state.selectedCategory ? _this.state.items : _this.state.items.filter(function (el) {
        return el.taxonomy["master-class-category"].some(function (tax) {
          return tax.slug === _this.state.selectedCategory;
        });
      });
    };

    _this.handleClick = function (taxonomy, e) {
      _this.setState(function () {
        return {
          isLoading: { categories: true }
        };
      });

      setTimeout(function () {
        return _this.setState(function (prev) {
          return Object.assign({}, prev, {
            selectedCategory: taxonomy,
            visibleItems: 4,
            isLoading: { categories: false }
          });
        });
      }, 200);
    };

    _this.state = {
      items: [],
      isLoading: { fetch: true, categories: false },
      selectedCategory: null,
      visibleItems: 4,
      taxonomiesList: []
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
        // Recorro la lista de cursos, y extraigo las categorias
        var taxonomiesList = [];

        data.map(function (el) {
          return el.taxonomy["master-class-category"].map(function (taxonomy) {
            return !taxonomiesList.includes(taxonomy.slug) && taxonomiesList.push(taxonomy.slug);
          });
        });

        _this2.setState(function (prev) {
          return Object.assign({}, prev, {
            items: data,
            isLoading: { fetch: false },
            taxonomiesList: taxonomiesList
          });
        });
      });
    }
  }, {
    key: "render",


    //TODO: falta escribir el toggle de clases

    value: function render() {
      var _this3 = this;

      return !this.state.isLoading.fetch ? React.createElement(
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
              className: "filter-chip " + (!this.state.selectedCategory && "active"),
              id: "todas",
              onClick: function onClick(e) {
                return _this3.handleClick(null, e);
              },
              name: "all"
            },
            "Todas"
          ),
          this.state.taxonomiesList.map(function (taxonomy, i) {
            return React.createElement(
              "button",
              {
                key: taxonomy + i,
                className: "filter-chip " + (_this3.state.selectedCategory === taxonomy && "active"),
                onClick: function onClick(e) {
                  return _this3.handleClick(taxonomy, e);
                }
              },
              taxonomy
            );
          })
        ),
        !this.state.isLoading.categories ? React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "grid-container" },
            this.filterList().filter(function (el, i) {
              return i < _this3.state.visibleItems;
            }).map(function (el) {
              return React.createElement(CardComponent, { data: el, key: el.id });
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
        React.createElement(
          "div",
          { className: "img-container" },
          React.createElement("img", {
            src: this.img || "./assets/card.png",
            alt: "class background image"
          })
        ),
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