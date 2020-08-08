import React from 'react';
import { fetchCurrencyRate } from '../redux/action';
import { connect } from 'react-redux';

class CurrencyRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {},
    };
  }

  componentDidMount() {
    fetch('https://api.exchangeratesapi.io/latest?base=USD') // data source is an object, not an array.
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            rates: result.rates,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  createTable = () => {
    const rates = this.state;
    let ratesArr = Object.keys(rates).map((i) => rates[i])[2];
    let table = [];
    let children = [];
    let displayedCurrencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'USD'];

    // The following loop is used to create inner structure (children) of the table.
    for (var key in ratesArr) {
      if (ratesArr.hasOwnProperty(key) && displayedCurrencies.includes(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{this.prettyCurrency(ratesArr[key], 0)}</td>
            <td>{this.prettyCurrency(ratesArr[key])}</td>
            <td>{this.prettyCurrency(ratesArr[key], 1)}</td>
          </tr>,
        );
      }
    }
    table.push(<tbody>{children}</tbody>); // We create the parent tbody tags and add the inner loop (children).

    return table;
  };

  prettyCurrency = (crr, action) => {
    if (action === 0) {
      crr = Math.round((crr * 102) / 100, 0);
    } else if (action === 1) {
      crr = Math.round((crr * 98) / 100, 0);
    } else {
      // Do nothing...
    }
    var fixedCrr = crr.toFixed(4).toString();
    while (fixedCrr.length < 8) {
      fixedCrr = '0' + fixedCrr;
    }

    return fixedCrr;
  };

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Oops: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <div>
            <table>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>WE BUY</th>
                  <th>EXCHANGE RATE</th>
                  <th>WE SELL</th>
                </tr>
              </thead>
              {this.createTable()}
            </table>
          </div>
        </main>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = { fetchCurrencyRate };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyRate);
