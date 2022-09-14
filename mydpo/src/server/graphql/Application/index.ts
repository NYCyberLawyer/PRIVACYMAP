import {
  booleanArg,
  extendType,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import prisma from "../../db/prisma";

const Application = objectType({
  name: "Application",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("applicationName");
    t.nonNull.list.nonNull.string("applicableRegulations");
    t.nonNull.string("description");
    t.nonNull.string("applicationHostingType");
    t.nonNull.string("applicationHostingManagement");
    t.nonNull.string("applicationHostingEntity");
    t.nonNull.string("applicationOwner");
    t.nonNull.string("technologyOwner");
    t.nonNull.string("applicationRegionStored");
    t.nonNull.boolean("hasDRHosting");
    t.nonNull.string("applicationDRRegionStored");
    t.nonNull.list.nonNull.string("modules");
    t.nonNull.string("applicationType");
    t.nonNull.string("businessId");
    t.nonNull.boolean("hasNameAndInitials");
    t.nonNull.boolean("hasIdNumbers");
    t.nonNull.boolean("hasBirthdate");
    t.nonNull.boolean("hasAge");
    t.nonNull.boolean("hasGender");
    t.nonNull.boolean("hasHomeAddress");
    t.nonNull.boolean("hasTelephoneNumber");
    t.nonNull.boolean("hasMobileNumber");
    t.nonNull.boolean("hasEmailAddress");
    t.nonNull.boolean("hasDriversLicenceNumber");
    t.nonNull.boolean("hasMedicalInfo");
    t.nonNull.boolean("hasFinancialInfo");
    t.nonNull.boolean("hasHealthInfo");
    t.nonNull.boolean("hasStudentInfo");
    t.nonNull.boolean("hasMinorInfo");
    t.nonNull.boolean("hasMaritalStatus");
    t.nonNull.boolean("hasNationality");
    t.nonNull.boolean("hasSexualBehaviour");
    t.nonNull.boolean("hasPhysicalCharacteristics");
    t.nonNull.boolean("hasEthnicOrigin");
    t.nonNull.boolean("hasReligiousPhilosophicalPoliticalBeliefs");
    t.nonNull.boolean("hasTradeUnionMembership");
    t.nonNull.boolean("hasBiometricData");
    t.nonNull.boolean("hasHouseholdInfo");
    t.nonNull.boolean("hasBillingHistory");
    t.nonNull.boolean("hasUniqueDeviceId");
    t.nonNull.boolean("hasLocation");
    t.nonNull.boolean("hasCriminalInfo");
    t.nonNull.boolean("hasCivilJusticeInfo");
    t.nonNull.boolean("hasSocialMedia");
    t.nonNull.string("connectionType");
    t.nonNull.boolean("encryptedDataTransfer");
    t.nonNull.string("dataRetentionReq");
    t.nonNull.string("comments");
    t.nonNull.list.nonNull.string("linkedApps");
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("application", {
      type: "Application",
      args: {
        id: stringArg(),
      },
      // @ts-ignore
      resolve: async (_, { id }, ctx) => {
        if (!ctx.user?.id) return null;
        return await prisma.application.findUnique({
          where: {
            // @ts-ignore
            id: id,
          },
        });
      },
    });
    t.field("applications", {
      type: list(Application),
      args: {
        businessId: nonNull(stringArg()),
      },
      // @ts-ignore
      resolve: async (_, { businessId }, ctx) => {
        if (!ctx.user?.id) return null;
        return await prisma.application.findMany({
          where: {
            // @ts-ignore
            businessId: businessId,
          },
        });
      },
    });
    t.field("linkedApps", {
      type: list(Application),
      args: {
        id: nonNull(stringArg()),
      },
      // @ts-ignore
      resolve: async (_, { id }, ctx) => {
        if (!ctx.user?.id) return null;

        const app = await prisma.application.findUnique({
          where: {
            id: id,
          },
        });

        // @ts-ignore
        const hasPending =
          app?.linkedApps.filter((value) => value == "PENDING").length > 0;

        const linked = await prisma.application.findMany({
          where: {
            id: {
              in: app?.linkedApps,
            },
          },
        });

        // @ts-ignore
        if (hasPending)
          linked.push({ id: "PENDING", applicationName: "PENDING" });

        return linked;
      },
    });
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("addApplication", {
      type: Application,
      args: {
        applicationName: nonNull(stringArg()),
        applicableRegulations: list(stringArg()),
        description: nonNull(stringArg()),
        applicationHostingType: nonNull(stringArg()),
        applicationHostingManagement: nonNull(stringArg()),
        applicationHostingEntity: nonNull(stringArg()),
        applicationOwner: nonNull(stringArg()),
        technologyOwner: nonNull(stringArg()),
        applicationRegionStored: nonNull(stringArg()),
        hasDRHosting: nonNull(booleanArg()),
        applicationDRRegionStored: nonNull(stringArg()),
        modules: list(stringArg()),
        applicationType: nonNull(stringArg()),
        businessId: nonNull(stringArg()),
        hasNameAndInitials: nonNull(booleanArg()),
        hasIdNumbers: nonNull(booleanArg()),
        hasBirthdate: nonNull(booleanArg()),
        hasAge: nonNull(booleanArg()),
        hasGender: nonNull(booleanArg()),
        hasHomeAddress: nonNull(booleanArg()),
        hasTelephoneNumber: nonNull(booleanArg()),
        hasMobileNumber: nonNull(booleanArg()),
        hasEmailAddress: nonNull(booleanArg()),
        hasDriversLicenceNumber: nonNull(booleanArg()),
        hasMedicalInfo: nonNull(booleanArg()),
        hasFinancialInfo: nonNull(booleanArg()),
        hasHealthInfo: nonNull(booleanArg()),
        hasStudentInfo: nonNull(booleanArg()),
        hasMinorInfo: nonNull(booleanArg()),
        hasMaritalStatus: nonNull(booleanArg()),
        hasNationality: nonNull(booleanArg()),
        hasSexualBehaviour: nonNull(booleanArg()),
        hasPhysicalCharacteristics: nonNull(booleanArg()),
        hasEthnicOrigin: nonNull(booleanArg()),
        hasReligiousPhilosophicalPoliticalBeliefs: nonNull(booleanArg()),
        hasTradeUnionMembership: nonNull(booleanArg()),
        hasBiometricData: nonNull(booleanArg()),
        hasHouseholdInfo: nonNull(booleanArg()),
        hasBillingHistory: nonNull(booleanArg()),
        hasUniqueDeviceId: nonNull(booleanArg()),
        hasLocation: nonNull(booleanArg()),
        hasCriminalInfo: nonNull(booleanArg()),
        hasCivilJusticeInfo: nonNull(booleanArg()),
        hasSocialMedia: nonNull(booleanArg()),
        connectionType: nonNull(stringArg()),
        encryptedDataTransfer: nonNull(booleanArg()),
        dataRetentionReq: nonNull(stringArg()),
        comments: nonNull(stringArg()),
        linkedApps: list(stringArg()),
      },
      // @ts-ignore
      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        return await prisma.application.create({
          data: {
            applicationName: args.applicationName,
            // @ts-ignore
            applicableRegulations: args.applicableRegulations,
            description: args.description,
            applicationHostingType: args.applicationHostingType,
            applicationHostingManagement: args.applicationHostingManagement,
            applicationHostingEntity: args.applicationHostingEntity,
            applicationOwner: args.applicationOwner,
            technologyOwner: args.technologyOwner,
            applicationRegionStored: args.applicationRegionStored,
            hasDRHosting: args.hasDRHosting,
            applicationDRRegionStored: args.applicationDRRegionStored,
            // @ts-ignore
            modules: args.modules,
            applicationType: args.applicationType,
            // @ts-ignore
            businessId: args.businessId,
            hasNameAndInitials: args.hasNameAndInitials,
            hasIdNumbers: args.hasIdNumbers,
            hasBirthdate: args.hasBirthdate,
            hasAge: args.hasAge,
            hasGender: args.hasGender,
            hasHomeAddress: args.hasHomeAddress,
            hasTelephoneNumber: args.hasTelephoneNumber,
            hasMobileNumber: args.hasMobileNumber,
            hasEmailAddress: args.hasEmailAddress,
            hasDriversLicenceNumber: args.hasDriversLicenceNumber,
            hasMedicalInfo: args.hasMedicalInfo,
            hasFinancialInfo: args.hasFinancialInfo,
            hasHealthInfo: args.hasHealthInfo,
            hasStudentInfo: args.hasStudentInfo,
            hasMinorInfo: args.hasMinorInfo,
            hasMaritalStatus: args.hasMaritalStatus,
            hasNationality: args.hasNationality,
            hasSexualBehaviour: args.hasSexualBehaviour,
            hasPhysicalCharacteristics: args.hasPhysicalCharacteristics,
            hasEthnicOrigin: args.hasEthnicOrigin,
            hasReligiousPhilosophicalPoliticalBeliefs:
              args.hasReligiousPhilosophicalPoliticalBeliefs,
            hasTradeUnionMembership: args.hasTradeUnionMembership,
            hasBiometricData: args.hasBiometricData,
            hasHouseholdInfo: args.hasHouseholdInfo,
            hasBillingHistory: args.hasBillingHistory,
            hasUniqueDeviceId: args.hasUniqueDeviceId,
            hasLocation: args.hasLocation,
            hasCriminalInfo: args.hasCriminalInfo,
            hasCivilJusticeInfo: args.hasCivilJusticeInfo,
            hasSocialMedia: args.hasSocialMedia,
            connectionType: args.connectionType,
            encryptedDataTransfer: args.encryptedDataTransfer,
            dataRetentionReq: args.dataRetentionReq,
            comments: args.comments,
            // @ts-ignore
            linkedApps: args.linkedApps,
          },
        });
      },
    });
    t.nullable.field("deleteApplication", {
      type: Application,
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: ctx.user?.email,
          },
        });

        const consultancyFirm = await prisma.consultancyFirm.findUnique({
          where: {
            id: user?.consultancyFirmId,
          },
        });

        const application = await prisma.application.findUnique({
          where: {
            // @ts-ignore
            id: args.id,
          },
        });

        const business = await prisma.business.findUnique({
          where: {
            id: application?.businessId,
          },
        });

        if (business?.consultancyFirmId != consultancyFirm?.id) return null;

        return await prisma.application.delete({
          where: {
            // @ts-ignore
            id: args.id,
          },
        });
      },
    });
    t.field("updateApplication", {
      type: "Application",
      args: {
        id: nonNull(stringArg()),
        applicationName: nonNull(stringArg()),
        applicableRegulations: list(stringArg()),
        description: nonNull(stringArg()),
        applicationHostingType: nonNull(stringArg()),
        applicationHostingManagement: nonNull(stringArg()),
        applicationHostingEntity: nonNull(stringArg()),
        applicationOwner: nonNull(stringArg()),
        technologyOwner: nonNull(stringArg()),
        applicationRegionStored: nonNull(stringArg()),
        hasDRHosting: nonNull(booleanArg()),
        applicationDRRegionStored: nonNull(stringArg()),
        modules: list(stringArg()),
        applicationType: nonNull(stringArg()),
        businessId: nonNull(stringArg()),
        hasNameAndInitials: nonNull(booleanArg()),
        hasIdNumbers: nonNull(booleanArg()),
        hasBirthdate: nonNull(booleanArg()),
        hasAge: nonNull(booleanArg()),
        hasGender: nonNull(booleanArg()),
        hasHomeAddress: nonNull(booleanArg()),
        hasTelephoneNumber: nonNull(booleanArg()),
        hasMobileNumber: nonNull(booleanArg()),
        hasEmailAddress: nonNull(booleanArg()),
        hasDriversLicenceNumber: nonNull(booleanArg()),
        hasMedicalInfo: nonNull(booleanArg()),
        hasFinancialInfo: nonNull(booleanArg()),
        hasHealthInfo: nonNull(booleanArg()),
        hasStudentInfo: nonNull(booleanArg()),
        hasMinorInfo: nonNull(booleanArg()),
        hasMaritalStatus: nonNull(booleanArg()),
        hasNationality: nonNull(booleanArg()),
        hasSexualBehaviour: nonNull(booleanArg()),
        hasPhysicalCharacteristics: nonNull(booleanArg()),
        hasEthnicOrigin: nonNull(booleanArg()),
        hasReligiousPhilosophicalPoliticalBeliefs: nonNull(booleanArg()),
        hasTradeUnionMembership: nonNull(booleanArg()),
        hasBiometricData: nonNull(booleanArg()),
        hasHouseholdInfo: nonNull(booleanArg()),
        hasBillingHistory: nonNull(booleanArg()),
        hasUniqueDeviceId: nonNull(booleanArg()),
        hasLocation: nonNull(booleanArg()),
        hasCriminalInfo: nonNull(booleanArg()),
        hasCivilJusticeInfo: nonNull(booleanArg()),
        hasSocialMedia: nonNull(booleanArg()),
        connectionType: nonNull(stringArg()),
        encryptedDataTransfer: nonNull(booleanArg()),
        dataRetentionReq: nonNull(stringArg()),
        comments: nonNull(stringArg()),
        linkedApps: list(stringArg()),
      },

      resolve: async (_, args, ctx) => {
        if (!ctx.user?.id) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: ctx.user?.email,
          },
        });

        const consultancyFirm = await prisma.consultancyFirm.findUnique({
          where: {
            id: user?.consultancyFirmId,
          },
        });

        const application = await prisma.application.findUnique({
          where: {
            id: args.id,
          },
        });

        const business = await prisma.business.findUnique({
          where: {
            id: application?.businessId,
          },
        });

        if (business?.consultancyFirmId != consultancyFirm?.id) return null;

        return await prisma.application.update({
          where: {
            id: args.id,
          },
          data: {
            applicationName: args.applicationName,
            // @ts-ignore
            applicableRegulations: args.applicableRegulations,
            description: args.description,
            applicationHostingType: args.applicationHostingType,
            applicationHostingManagement: args.applicationHostingManagement,
            applicationHostingEntity: args.applicationHostingEntity,
            applicationOwner: args.applicationOwner,
            technologyOwner: args.technologyOwner,
            applicationRegionStored: args.applicationRegionStored,
            hasDRHosting: args.hasDRHosting,
            applicationDRRegionStored: args.applicationDRRegionStored,
            // @ts-ignore
            modules: args.modules,
            applicationType: args.applicationType,
            // @ts-ignore
            businessId: args.businessId,
            hasNameAndInitials: args.hasNameAndInitials,
            hasIdNumbers: args.hasIdNumbers,
            hasBirthdate: args.hasBirthdate,
            hasAge: args.hasAge,
            hasGender: args.hasGender,
            hasHomeAddress: args.hasHomeAddress,
            hasTelephoneNumber: args.hasTelephoneNumber,
            hasMobileNumber: args.hasMobileNumber,
            hasEmailAddress: args.hasEmailAddress,
            hasDriversLicenceNumber: args.hasDriversLicenceNumber,
            hasMedicalInfo: args.hasMedicalInfo,
            hasFinancialInfo: args.hasFinancialInfo,
            hasHealthInfo: args.hasHealthInfo,
            hasStudentInfo: args.hasStudentInfo,
            hasMinorInfo: args.hasMinorInfo,
            hasMaritalStatus: args.hasMaritalStatus,
            hasNationality: args.hasNationality,
            hasSexualBehaviour: args.hasSexualBehaviour,
            hasPhysicalCharacteristics: args.hasPhysicalCharacteristics,
            hasEthnicOrigin: args.hasEthnicOrigin,
            hasReligiousPhilosophicalPoliticalBeliefs:
              args.hasReligiousPhilosophicalPoliticalBeliefs,
            hasTradeUnionMembership: args.hasTradeUnionMembership,
            hasBiometricData: args.hasBiometricData,
            hasHouseholdInfo: args.hasHouseholdInfo,
            hasBillingHistory: args.hasBillingHistory,
            hasUniqueDeviceId: args.hasUniqueDeviceId,
            hasLocation: args.hasLocation,
            hasCriminalInfo: args.hasCriminalInfo,
            hasCivilJusticeInfo: args.hasCivilJusticeInfo,
            hasSocialMedia: args.hasSocialMedia,
            connectionType: args.connectionType,
            encryptedDataTransfer: args.encryptedDataTransfer,
            dataRetentionReq: args.dataRetentionReq,
            comments: args.comments,
            // @ts-ignore
            linkedApps: args.linkedApps,
          },
        });
      },
    });
  },
});

export default [Application, queries, mutations];
