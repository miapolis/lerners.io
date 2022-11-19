// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import tag from "./tag";
import sidenote from "./sidenote";
import blockContent from "./block-content";
import post from "./post";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: "default",
  types: schemaTypes.concat([tag, sidenote, blockContent, post]),
});
