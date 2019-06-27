import { Strategy } from "@authx/authx";
import { OpenIdAuthority, OpenIdCredential } from "./model";
import {
  authenticateOpenId,
  createOpenIdAuthorities,
  updateOpenIdAuthorities,
  createOpenIdCredentials,
  updateOpenIdCredentials,
  GraphQLOpenIdAuthority,
  GraphQLOpenIdCredential
} from "./graphql";

export * from "./model";
export * from "./graphql";

const strategy: Strategy = {
  name: "openid",
  types: [GraphQLOpenIdAuthority, GraphQLOpenIdCredential],
  queryFields: {},
  mutationFields: {
    authenticateOpenId,

    createOpenIdAuthorities,
    updateOpenIdAuthorities,

    createOpenIdCredentials,
    updateOpenIdCredentials
  },
  authorityModel: OpenIdAuthority,
  credentialModel: OpenIdCredential
};

export default strategy;
