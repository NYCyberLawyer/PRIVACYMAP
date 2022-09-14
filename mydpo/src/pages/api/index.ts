import { ApolloServer } from "apollo-server-micro";
import prisma from "../../server/db/prisma";
import { getRequestOrigin } from "../../server/get-request-origin";
import { schema } from "../../server/graphql/schema";
import handler from "../../server/api-route";

export interface GraphQLContext {
  user?: Express.User;
  prisma: typeof prisma;
  origin: string;
}

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }): GraphQLContext => {
    const origin = getRequestOrigin(req);
    return {
      user: req.user,
      origin,
      prisma,
    };
  },
});

const startServer = apolloServer.start();
export default handler().use(async (req: any, res: any) => {
  await startServer;
  await apolloServer.createHandler({
    path: "/api",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
