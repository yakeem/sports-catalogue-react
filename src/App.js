import React, {Component} from 'react';
import './App.css';

class SearchBar extends Component {
    render() {
        return (
            <input></input>
        );
    }
}

class ProductRow extends Component {

    render() {
        return (
            <div></div>
        );
    }

}

class CategoryWithProducts extends Component {
    render() {
        var rows = [];

        for (let i = 0; i < this.props.products.length; ++i) {
            rows.push(<ProductRow product={this.props.products[i]}/>);
        }

        return (
            <tr>
                <td colSpan="2">
                    <h2>{this.props.category}</h2>
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
                    <CategoryWithProducts key={category} category={category} products={categoryProducts[category]}></CategoryWithProducts>
                );

            }

        }

        return (
            <table>
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
    render() {
        return (
            <div>
                <SearchBar></SearchBar>
                <ResultsTable products={this.props.products}/>
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
                <ProductsTable products={PRODUCTS}/>
            </div>
        );
    }
}

export default App;
