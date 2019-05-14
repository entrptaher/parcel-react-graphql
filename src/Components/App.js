import React from "react";
import { withApollo } from "react-apollo";

import gql from "graphql-tag";
const { importSchema } = require("graphql-import");
import { print } from "graphql/language/printer";
import fragments from "../graphql/fragments.graphql";

import queries from "../graphql/query.graphql";
import filterUnusedFragments from "../utils/filter-unused-fragments";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.getPosts();
  }
  async getPosts() {
    const result = await this.props.client.query({
      query: filterUnusedFragments(queries, "posts")
    });
    this.setState({ posts: result.data.posts });
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-Title">Posts</h1>
        <ul>
          {this.state.posts.map(post => {
            return (
              <li key={post.id}>
                {post.title} by {post.user.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withApollo(App);
