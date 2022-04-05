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

    _this.filter = function (array) {
      return array.filter(function (el) {
        return el.taxonomy.some(function (tax) {
          return tax.slug === _this.state.selectedCategory;
        });
      });
    };

    _this.state = {
      items: [],
      isDataLoaded: false,
      taxonomy: "all",
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
            "div",
            { className: "filter-chip active", id: "todas" },
            "Todas"
          ),
          React.createElement(
            "div",
            { className: "filter-chip", id: "chocolateria" },
            "Chocolater\xEDa"
          ),
          React.createElement(
            "div",
            { className: "filter-chip", id: "Manicure" },
            "Manicure"
          )
        ),
        React.createElement(
          "div",
          { className: "grid-container" },
          this.state.items.filter(function (el, i) {
            return i < _this3.state.visibleItems;
          }).map(function (el) {
            console.log(el);
            return React.createElement(
              "div",
              { key: el.id },
              React.createElement(CardComponent, null)
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

    return _possibleConstructorReturn(this, (CardComponent.__proto__ || Object.getPrototypeOf(CardComponent)).call(this, props));
  }

  _createClass(CardComponent, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "class-card" },
        React.createElement("img", { src: "./assets/card.png", alt: "class background image" }),
        React.createElement(
          "div",
          { className: "text-container" },
          React.createElement(
            "h4",
            { className: "title" },
            "Title: H5 - Lorem ipsum dolor sit amet consectetur adipiscing"
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