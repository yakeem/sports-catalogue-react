import React, {Component} from 'react';
import './App.css';

class SearchBar extends Component {
    constructor(props){
      super(props);
      this.handleInput = this.handleInput.bind(this);
    }

    handleInput(){
      this.props.onFilterChange(this.filterText.value);
    }

    render() {
        return (
          <form className="form-group">
            <label htmlFor="searchBar1">Filter results:</label>
            <input id="searchBar1" className="form-control" ref={ (input) => this.filterText = input} onChange={this.handleInput} value={this.props.filterValue}></input>
          </form>
      );
    }
}

class ProductRow extends Component {

    render() {
        return (
            <p>
                {this.props.product.name}: {this.props.product.price}
            </p>

        );
    }

}

class CategoryWithProducts extends Component {
    render() {
        var rows = [];

        for (let i = 0; i < this.props.products.length; ++i) {
            let prod = this.props.products[i];
            if(prod.name.includes(this.props.filterValue)){
              rows.push(<ProductRow key={prod.name} product={prod}/>);
            }
        }

        return (
            <tr>
                <td>
                    <h2>{this.props.category}:</h2>
                </td>
                <td>
                {rows}
                </td>
            </tr>


        );
    }
}

class ResultsTable extends Component {
    render() {

        // create variable rows with all table rows, either category or entry
        var tableRows = [];
        var categoryProducts = {}; // {category: abc, products: [a,b,c]}

        for (let product of this.props.products) {

            if (Array.isArray(categoryProducts[product.catalogue])) {
                categoryProducts[product.catalogue].push(product);
            } else {
                categoryProducts[product.catalogue] = [product];
            }
        }

        for (let category in categoryProducts) {

            if (categoryProducts.hasOwnProperty(category)) {

                tableRows.push(
                    <CategoryWithProducts filterValue={this.props.filterValue} key={category} category={category} products={categoryProducts[category]}></CategoryWithProducts>
                );

            }

        }

        return (
            <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>
                        <h2>
                            Product Name:
                        </h2>
                    </th>

                    <th>
                        <h2>
                            Price:
                        </h2>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        );
    }
}

class ProductsTable extends Component {
    constructor(props){
      super(props);
      this.state = {filterValue: ''};
      this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleFilterChange(newValue){
      this.setState({filterValue: newValue})
    }

    render() {
        return (
            <div>
                <SearchBar filterValue={this.state.filterValue} onFilterChange={this.handleFilterChange}></SearchBar>
                <div className="row">
                  <br />
                </div>
                <ResultsTable filterValue={this.state.filterValue} products={this.props.products}/>
            </div>
        );
    }
}

class MaintenancePane extends Component {
    render() {
        return (
            <div id="myModal" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <p>One fine body&hellip;</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>

                </div>

            </div>
          );
      }
    }


var PRODUCTS = [
    {
        catalogue: "General Catalogue",
        name: "Basketball",
        price: 20.00,
        currency: "EUR"
    }, {
        catalogue: "General Catalogue",
        name: "Football",
        price: 23.99,
        currency: "EUR"
    }, {
        catalogue: "General Catalogue",
        name: "Volleyball",
        price: 16.99,
        currency: "EUR"
    }, {
        catalogue: "Tickets catalogue",
        name: "Champions League Football",
        price: 150.99,
        currency: "EUR"
    }, {
        catalogue: "Tickets catalogue",
        name: "NBA Match Class 3",
        price: 15,
        currency: "USD"
    }, {
        catalogue: "Tickets catalogue",
        name: "NBA Match Class 1",
        price: 125,
        currency: "USD"
    }
]

class App extends Component {

    render() {
        return (
          <div>
            <div className="products">
                <ProductsTable products={PRODUCTS}/>
            </div>
            <div>
                <MaintenancePane />
                  <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                    Launch demo modal
                  </button>
            </div>
          </div>
        );
    }
}

export default App;
