import {
  extendType,
  inputObjectType,
  nonNull,
  arg,
  objectType,
  stringArg,
  intArg,
} from "nexus";
import prisma from "../../db/prisma";
import slug from "slug";
import { generateInvitationToken } from "../../invitations/token";
import { sendEmail } from "../../send-email";

const BusinessWhereUniqueInput = inputObjectType({
  name: "BusinessWhereUniqueInput",
  definition(t) {
    t.string("id");
  },
});

const UserWhereUniqueInput = inputObjectType({
  name: "UserWhereUniqueInput",
  definition(t) {
    t.string("email");
    t.string("id");
  },
});

const ConsultancyFirm = objectType({
  name: "ConsultancyFirm",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.list.nonNull.field("businesses", {
      type: "Business",
      args: {
        cursor: arg({ type: BusinessWhereUniqueInput }),
        take: intArg(),
        skip: intArg(),
      },
      resolve: (parent, args, ctx) => {
        return ctx.prisma.consultancyFirm
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .businesses({
            cursor: args.cursor || undefined,
            take: args.take || undefined,
            skip: args.skip || undefined,
          });
      },
    });
    t.nonNull.string("name");
    t.nonNull.string("slug");
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      args: {
        cursor: arg({ type: UserWhereUniqueInput }),
        take: intArg(),
        skip: intArg(),
      },
      resolve: (parent, args, ctx) => {
        return ctx.prisma.consultancyFirm
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .users({
            cursor: undefined,
            take: args.take || undefined,
            skip: args.skip || undefined,
          });
      },
    });
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("consultancyFirm", {
      type: "ConsultancyFirm",
      args: {
        id: stringArg(),
        slug: stringArg(),
      },
      resolve: async (_, { id, slug }, ctx) => {
        if (!ctx.user?.id) return null;
        if ((!id && !slug) || (id && slug))
          throw new Error(
            "Please provide either an ID or a slug to the project query"
          );

        const project = await prisma.consultancyFirm.findFirst({
          where: {
            users: {
              some: {
                id: ctx.user.id,
              },
            },
            // Note: TypeScript doesn't understand that one is for sure defined here
            id: id as string,
            slug: slug as string,
          },
        });

        if (!project) return null;

        return project;
      },
    });
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("createConsultancyFirm", {
      type: "ConsultancyFirm",
      args: {
        name: nonNull(stringArg()),
        slug: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        return await prisma.consultancyFirm.create({
          data: {
            name: args.name,
            slug: args.slug || slug(args.name),
            users: {
              connect: {
                id: ctx.user.id,
              },
            },
          },
        });
      },
    });

    t.nullable.field("inviteToConsultancyFirm", {
      type: "Boolean",
      args: {
        projectId: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      resolve: async (_, { projectId, email }, ctx) => {
        if (!ctx.user?.id) return null;

        const inviter = await prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });

        const project = await prisma.consultancyFirm.findFirst({
          where: {
            users: {
              some: {
                id: ctx.user.id,
              },
            },
            id: projectId,
          },
        });

        if (!project || !inviter) return null;

        const token = generateInvitationToken({
          destination: email,
          projectId,
        });

        // await sendEmail({
        //   to: email,
        //   subject: `${inviter.name || inviter.email} invited you`,
        //   text: `Hey! Click on this link to accept your invite: ${ctx.origin}/api/invitations/accept/?token=${token}`,
        // });

        return true;
      },
    });

    t.nullable.field("removeUserFromConsultancyFirm", {
      type: "ConsultancyFirm",
      args: {
        consultancyFirmId: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      resolve: async (_, { consultancyFirmId, userId }, ctx) => {
        if (!ctx.user?.id) return null;

        const hasAccess = await prisma.consultancyFirm.findFirst({
          where: {
            users: {
              some: {
                id: ctx.user.id,
              },
            },
            id: consultancyFirmId,
          },
        });

        if (!hasAccess) return null;

        const consultancyFirm = await prisma.consultancyFirm.update({
          where: {
            id: consultancyFirmId,
          },
          data: {
            users: {
              disconnect: {
                id: userId,
              },
            },
          },
        });

        return consultancyFirm;
      },
    });
  },
});

export default [ConsultancyFirm, mutations, queries];
