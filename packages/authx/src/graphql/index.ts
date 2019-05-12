import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { StrategyCollection } from "../StrategyCollection";
import { Context } from "../Context";

import { mutationFields, mutationTypes } from "./mutation";
import { queryFields } from "./query";

import { GraphQLAuthority } from "./GraphQLAuthority";
import { GraphQLClient } from "./GraphQLClient";
import { GraphQLCredential } from "./GraphQLCredential";
import { GraphQLGrant } from "./GraphQLGrant";
import { GraphQLRole } from "./GraphQLRole";
import { GraphQLTimestamp } from "./GraphQLTimestamp";
import { GraphQLAuthorization } from "./GraphQLAuthorization";
import { GraphQLUser } from "./GraphQLUser";
import { GraphQLUserType } from "./GraphQLUserType";

export * from "./GraphQLAuthority";
export * from "./GraphQLCredential";
export * from "./GraphQLAuthority";
export * from "./GraphQLClient";
export * from "./GraphQLCredential";
export * from "./GraphQLGrant";
export * from "./GraphQLRole";
export * from "./GraphQLTimestamp";
export * from "./GraphQLAuthorization";
export * from "./GraphQLUser";
export * from "./GraphQLUserType";

export default function createSchema(
  strategies: StrategyCollection
): GraphQLSchema {
  const query = new GraphQLObjectType<any, Context>({
    name: "Query",
    description: "The query root of AuthX's GraphQL interface.",
    fields: () => ({
      ...queryFields,
      ...strategies.queryFields
    })
  });

  const mutation = new GraphQLObjectType<any, Context>({
    name: "Mutation",
    description: "The mutation root of AuthX's GraphQL interface.",
    fields: () => ({
      ...mutationFields,
      ...strategies.mutationFields
    })
  });

  return new GraphQLSchema({
    types: [
      GraphQLAuthority,
      GraphQLClient,
      GraphQLCredential,
      GraphQLGrant,
      GraphQLRole,
      GraphQLTimestamp,
      GraphQLAuthorization,
      GraphQLUser,
      GraphQLUserType,

      ...mutationTypes,

      // merge in types from strategies
      ...strategies.types
    ],
    mutation,
    query
  });
}