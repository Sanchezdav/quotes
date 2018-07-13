import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

class QuotesDisplay extends Component {
  constructor() {
    super();

    this.state = {
      quote: {}
    }
  }

  fetchQuote(id) {
    axios.get(`api/quotes/${id}`)
      .then(response => {
        this.setState({ quote: response.data });
      })
      .catch(error => {
        console.log(error);
      })
  }

  setQuoteIdFromQueryString(qs) {
    this.qsParams = queryString.parse(qs);

    if(this.qsParams.quote) {
      // assign quote ID from the URL's query string
      this.quoteId = Number(this.qsParams.quote);
    } else {
      this.quoteId = 1;
      // update URL in browser to reflect current quotein query string
      this.props.history.push(`/?quote=${this.quoteId}`);
    }
  }

  componentDidMount() {
    this.setQuoteIdFromQueryString(this.props.location.search);
    this.fetchQuote(this.quoteId);
  }

  componentWillReceiveProps(nextProps) {
    this.setQuoteIdFromQueryString(nextProps.location.search);
    this.fetchQuote(this.quoteId);
  }

  render() {
    const nextQuoteId = Number(this.state.quote.id) + 1;

    return(
      <div>
        <Link to={`/?quote=${nextQuoteId}`}>Next</Link>
        <p>{ this.state.quote.text }</p>
        <p>{ this.state.quote.author }</p>
      </div>
    );
  }
}

export default QuotesDisplay; 
