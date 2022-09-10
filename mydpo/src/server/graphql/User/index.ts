import { extendType, nonNull, objectType, stringArg } from "nexus";
import { type } from "os";
import prisma from "../../db/prisma";

const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.field("consultancyFirm", {
      type: "ConsultancyFirm",
      resolve: (parent, _, ctx) => {
        return ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .consultancyFirm();
      },
    });
    t.nonNull.string("email");
    t.nonNull.string("id");
    t.nonNull.string("name");
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("currentUser", {
      type: "User",
      resolve: (_, __, ctx) => {
        if (!ctx.user?.id) return null;

        return prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });
      },
    });
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("updateUser", {
      type: "User",
      args: {
        userId: nonNull(stringArg()),
        name: stringArg(),
      },
      resolve: async (_, { userId, name }, ctx) => {
        if (!ctx.user?.id || userId !== ctx.user.id) return null;

        return await prisma.user.update({
          where: { id: userId },
          // @ts-ignore
          data: { name },
        });
      },
    });
  },
});

export default [User, mutations, queries];
