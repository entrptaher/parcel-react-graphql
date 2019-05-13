import React from "react";
import ReactDOM from "react-dom";

import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const { importSchema } = require('graphql-import');

import { print } from "graphql/language/printer";
import fragments from "./fragments.graphql";
import queries from "./query.graphql";

class App extends React.Component {
  componentDidMount() {
    this.getPosts();
  }
  async getPosts() {
    const result = await this.props.client.query({
      query: queries
    });
    console.log({ result });
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-Title">Hello Parcel x React</h1>
      </div>
    );
  }
}

export default withApollo(App);
