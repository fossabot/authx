import { Authority, Credential } from "./model";
import { GraphQLNamedType, GraphQLFieldConfig } from "graphql";
import { Context } from "./Context";
import Router from "koa-router";
import x from "./x";

export interface Strategy {
  name: string;
  types: GraphQLNamedType[];
  queryFields: { [field: string]: GraphQLFieldConfig<any, Context, any> };
  mutationFields: { [field: string]: GraphQLFieldConfig<any, Context, any> };
  authorityModel: { new (data: any): Authority<any> };
  credentialModel: { new (data: any): Credential<any> };
  router?: () => Router<any, { [x]: Context }>;
}
