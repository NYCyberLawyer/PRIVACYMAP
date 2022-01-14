import {extendType, intArg, nonNull, objectType, stringArg} from "nexus";
import prisma from "../../db/prisma";
import arg from "arg";
import cuid from "cuid";

const Business = objectType({
    name: 'Business',
    definition(t) {
        t.model.id()

        t.model.companyName()
        t.model.companyAddress()
        t.model.companyPhone()
        t.model.companyEmail()

        t.model.businessContactName()
        t.model.businessContactPosition()
        t.model.businessContactPhone()
        t.model.businessContactEmail()

        t.model.technicalContactName()
        t.model.technicalContactPosition()
        t.model.technicalContactPhone()
        t.model.technicalContactEmail()
        
        t.model.privacyLiaisonContactName()
        t.model.privacyLiaisonContactPosition()
        t.model.privacyLiaisonContactPhone()
        t.model.privacyLiaisonContactEmail()
        
        t.model.hrContactName()
        t.model.hrContactPosition()
        t.model.hrContactPhone()
        t.model.hrContactEmail()

        t.model.applications()
    }
})

const queries = extendType({
    type: "Query",
    definition: (t) => {
        t.field("business", {
            type: "Business",
            args: {
                id: stringArg(),
            },
            // @ts-ignore
            resolve: async (_, {id}, ctx) => {
                if (!ctx.user?.id) return null

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
                if (currentUser.consultancyFirmId != business.consultancyFirmId) return null

                return business
            },
        });
    },
});

const mutations = extendType({
    type: 'Mutation',
    definition: (t) => {
        t.nullable.field('addBusiness', {
            type: 'Business',
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
                        id: ctx.user.id
                    }
                })

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

                        consultancyFirmId: user?.consultancyFirmId
                    }
                })
            }
        })
        t.nullable.field('deleteBusiness', {
            type: 'Business',
            args: {
                id: nonNull(stringArg())
            },
            resolve: async (_, args, ctx) => {
                if (!ctx.user?.id) return null;

                const user = await prisma.user.findUnique({
                    where: {
                        id: ctx.user.id
                    }
                })

                const business = await prisma.business.findUnique({
                    where: {
                        id: args.id
                    }
                })

                if (user?.consultancyFirmId != business?.consultancyFirmId) return null

                await prisma.application.deleteMany({
                    where: {
                        businessId: args.id
                    }
                })

                return await prisma.business.delete({
                    where: {
                        id: args.id
                    }
                })
            }
        })
        t.nullable.field('updateBusiness', {
            type: 'Business',
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
                        id: ctx.user.id
                    }
                })

                const business = await prisma.business.findUnique({
                    where: {
                        id: args.id
                    }
                })

                if (user?.consultancyFirmId != business?.consultancyFirmId) return null

                return await prisma.business.update({
                    where: {
                        id: args.id
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

                        consultancyFirmId: user?.consultancyFirmId
                    }
                })
            }
        })
    }
})

export default [Business, queries, mutations]
