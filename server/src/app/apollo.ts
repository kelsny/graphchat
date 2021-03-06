import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import "reflect-metadata";
import { __prod__ } from "src/constants";
import { AssetResolver } from "src/resolvers/AssetResolver";
import { UserBlockResolver } from "src/resolvers/UserBlockResolver";
import { UserFriendResolver } from "src/resolvers/UserFriendResolver";
import { buildSchema } from "type-graphql";
import { DirectMessageResolver } from "../resolvers/DirectMessageResolver";
import { UserBanResolver } from "../resolvers/UserBanResolver";
import { UserResolver } from "../resolvers/UserResolver";

export default async () =>
  new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        UserBanResolver,
        UserBlockResolver,
        UserFriendResolver,
        DirectMessageResolver,
        AssetResolver,
      ],
      validate: false,
      emitSchemaFile: true,
    }),
    context: (ctx) => ctx,
    uploads: false,
    playground: !__prod__,
    subscriptions: { path: "/subscriptions" },
  });
