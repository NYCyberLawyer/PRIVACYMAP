import {
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg,
  arg,
  inputObjectType,
} from "nexus";
import prisma from "../../db/prisma";

const ApplicationWhereUniqueInput = inputObjectType({
  name: "ApplicationWhereUniqueInput",
  definition(t) {
    t.string("id");
  },
});

const Business = objectType({
  name: "Business",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.list.nonNull.field("applications", {
      type: "Application",
      args: {
        cursor: arg({ type: ApplicationWhereUniqueInput }),
        take: intArg(),
        skip: intArg(),
      },
      resolve: (parent, args, ctx) => {
        return ctx.prisma.business
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .applications({
            cursor: args.cursor || undefined,
            take: args.take || undefined,
            skip: args.skip || undefined,
          });
      },
    });
    t.nonNull.string("businessContactEmail");
    t.nonNull.string("businessContactName");
    t.nonNull.string("businessContactPhone");
    t.nonNull.string("businessContactPosition");
    t.nonNull.string("companyAddress");
    t.nonNull.string("companyEmail");
    t.nonNull.string("companyName");
    t.nonNull.string("companyPhone");
    t.nonNull.string("hrContactEmail");
    t.nonNull.string("hrContactName");
    t.nonNull.string("hrContactPhone");
    t.nonNull.string("hrContactPosition");
    t.nonNull.string("id");
    t.nonNull.string("privacyLiaisonContactEmail");
    t.nonNull.string("privacyLiaisonContactName");
    t.nonNull.string("privacyLiaisonContactPhone");
    t.nonNull.string("privacyLiaisonContactPosition");
    t.nonNull.string("technicalContactEmail");
    t.nonNull.string("technicalContactName");
    t.nonNull.string("technicalContactPhone");
    t.nonNull.string("technicalContactPosition");
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("business", {
      type: "Business",
      args: {
        id: stringArg(),
      },
      // @ts-ignore
      resolve: async (_, { id }, ctx) => {
        if (!ctx.user?.id) return null;

        // @ts-ignore
        const business = await prisma.business.findUnique({
          where: {
            // @ts-ignore
            id: id,
          },
        });

        const currentUser = await prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });

        // @ts-ignore
        if (currentUser.consultancyFirmId != business.consultancyFirmId)
          return null;

        return business;
      },
    });
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("addBusiness", {
      type: "Business",
      args: {
        companyName: nonNull(stringArg()),
        companyAddress: nonNull(stringArg()),
        companyPhone: nonNull(stringArg()),
        companyEmail: nonNull(stringArg()),

        businessContactName: nonNull(stringArg()),
        businessContactPosition: nonNull(stringArg()),
        businessContactPhone: nonNull(stringArg()),
        businessContactEmail: nonNull(stringArg()),

        technicalContactName: nonNull(stringArg()),
        technicalContactPosition: nonNull(stringArg()),
        technicalContactPhone: nonNull(stringArg()),
        technicalContactEmail: nonNull(stringArg()),

        privacyLiaisonContactName: nonNull(stringArg()),
        privacyLiaisonContactPosition: nonNull(stringArg()),
        privacyLiaisonContactPhone: nonNull(stringArg()),
        privacyLiaisonContactEmail: nonNull(stringArg()),

        hrContactName: nonNull(stringArg()),
        hrContactPosition: nonNull(stringArg()),
        hrContactPhone: nonNull(stringArg()),
        hrContactEmail: nonNull(stringArg()),
      },
      // @ts-ignore
      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        const user = await prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });

        return await prisma.business.create({
          data: {
            companyName: args.companyName,
            companyAddress: args.companyAddress,
            companyPhone: args.companyPhone,
            companyEmail: args.companyEmail,

            businessContactName: args.businessContactName,
            businessContactPosition: args.businessContactPosition,
            businessContactPhone: args.businessContactPhone,
            businessContactEmail: args.businessContactEmail,

            technicalContactName: args.technicalContactName,
            technicalContactPosition: args.technicalContactPosition,
            technicalContactPhone: args.technicalContactPhone,
            technicalContactEmail: args.technicalContactEmail,

            privacyLiaisonContactName: args.privacyLiaisonContactName,
            privacyLiaisonContactPosition: args.privacyLiaisonContactPosition,
            privacyLiaisonContactPhone: args.privacyLiaisonContactPhone,
            privacyLiaisonContactEmail: args.privacyLiaisonContactEmail,

            hrContactName: args.hrContactName,
            hrContactPosition: args.hrContactPosition,
            hrContactPhone: args.hrContactPhone,
            hrContactEmail: args.hrContactEmail,

            consultancyFirmId: user?.consultancyFirmId,
          },
        });
      },
    });
    t.nullable.field("deleteBusiness", {
      type: "Business",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        const user = await prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });

        const business = await prisma.business.findUnique({
          where: {
            id: args.id,
          },
        });

        if (user?.consultancyFirmId != business?.consultancyFirmId) return null;

        await prisma.application.deleteMany({
          where: {
            businessId: args.id,
          },
        });

        return await prisma.business.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
    t.nullable.field("updateBusiness", {
      type: "Business",
      args: {
        id: nonNull(stringArg()),
        companyName: nonNull(stringArg()),
        companyAddress: nonNull(stringArg()),
        companyPhone: nonNull(stringArg()),
        companyEmail: nonNull(stringArg()),

        businessContactName: nonNull(stringArg()),
        businessContactPosition: nonNull(stringArg()),
        businessContactPhone: nonNull(stringArg()),
        businessContactEmail: nonNull(stringArg()),

        technicalContactName: nonNull(stringArg()),
        technicalContactPosition: nonNull(stringArg()),
        technicalContactPhone: nonNull(stringArg()),
        technicalContactEmail: nonNull(stringArg()),

        privacyLiaisonContactName: nonNull(stringArg()),
        privacyLiaisonContactPosition: nonNull(stringArg()),
        privacyLiaisonContactPhone: nonNull(stringArg()),
        privacyLiaisonContactEmail: nonNull(stringArg()),

        hrContactName: nonNull(stringArg()),
        hrContactPosition: nonNull(stringArg()),
        hrContactPhone: nonNull(stringArg()),
        hrContactEmail: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        const user = await prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });

        const business = await prisma.business.findUnique({
          where: {
            id: args.id,
          },
        });

        if (user?.consultancyFirmId != business?.consultancyFirmId) return null;

        return await prisma.business.update({
          where: {
            id: args.id,
          },
          data: {
            companyName: args.companyName,
            companyAddress: args.companyAddress,
            companyPhone: args.companyPhone,
            companyEmail: args.companyEmail,

            businessContactName: args.businessContactName,
            businessContactPosition: args.businessContactPosition,
            businessContactPhone: args.businessContactPhone,
            businessContactEmail: args.businessContactEmail,

            technicalContactName: args.technicalContactName,
            technicalContactPosition: args.technicalContactPosition,
            technicalContactPhone: args.technicalContactPhone,
            technicalContactEmail: args.technicalContactEmail,

            privacyLiaisonContactName: args.privacyLiaisonContactName,
            privacyLiaisonContactPosition: args.privacyLiaisonContactPosition,
            privacyLiaisonContactPhone: args.privacyLiaisonContactPhone,
            privacyLiaisonContactEmail: args.privacyLiaisonContactEmail,

            hrContactName: args.hrContactName,
            hrContactPosition: args.hrContactPosition,
            hrContactPhone: args.hrContactPhone,
            hrContactEmail: args.hrContactEmail,

            consultancyFirmId: user?.consultancyFirmId,
          },
        });
      },
    });
  },
});

export default [Business, queries, mutations];
