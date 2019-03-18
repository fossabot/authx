import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} from "graphql";

import { User } from "../model";
import { Context } from "./Context";
import { GraphQLContact } from "./GraphQLContact";
import { GraphQLCredential } from "./GraphQLCredential";
import { GraphQLRole } from "./GraphQLRole";
import { GraphQLUserType } from "./GraphQLUserType";
import { GraphQLGrant } from "./GraphQLGrant";
import { GraphQLClient } from "./GraphQLClient";
import { filter } from "../util/filter";

export const GraphQLUser: GraphQLObjectType<
  User,
  Context
> = new GraphQLObjectType({
  name: "User",
  interfaces: () => [],
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    type: { type: GraphQLUserType },
    contact: {
      type: GraphQLContact,
      description:
        "User information formatted according to the Portable Contact spec.",
      resolve: user => ({
        ...user.contact,
        id: user.id,
        connected: false
      })
    },
    credentials: {
      type: new GraphQLList(GraphQLCredential),
      description: "List all of the user's credentials.",
      async resolve(
        user,
        args,
        { realm, token: t, tx, credentialMap }: Context
      ) {
        return t
          ? filter(await user.credentials(tx, credentialMap), credential =>
              credential.isAccessibleBy(realm, t, tx)
            )
          : [];
      }
    },
    grants: {
      type: new GraphQLList(GraphQLGrant),
      description: "List all of the user's grants.",
      async resolve(user, args, { realm, token: t, tx }: Context) {
        return t
          ? filter(await user.grants(tx), grant =>
              grant.isAccessibleBy(realm, t, tx)
            )
          : [];
      }
    },
    roles: {
      type: new GraphQLList(GraphQLRole),
      description: "List all roles to which the user is assigned.",
      async resolve(user, args, { realm, token: t, tx }: Context) {
        return t
          ? filter(
              await user.roles(tx),
              async role =>
                (await role.isAccessibleBy(realm, t, tx)) &&
                (await role.isAccessibleBy(realm, t, tx, "read.assignments"))
            )
          : [];
      }
    },
    clients: {
      type: new GraphQLList(GraphQLClient),
      description: "List all roles to which the user is assigned.",
      async resolve(user, args, { realm, token: t, tx }: Context) {
        return t
          ? filter(await user.clients(tx), client =>
              client.isAccessibleBy(realm, t, tx)
            )
          : [];
      }
    }
  })
});
