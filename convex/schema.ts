// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  
  {
    documents: defineTable({
      fieldOne: v.string(),
      fieldTwo: v.object({
        subFieldOne: v.array(v.number()),
      }),
    }),
    numbers: defineTable({
      value: v.number(),
    }),


    users: defineTable({
      name: v.string(),
      email: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
   
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      profileImageUrl: v.optional(v.string()),
      twoFactorEnabled: v.optional(v.boolean()),
      // this the Clerk ID, stored in the subject JWT field
      externalId: v.string(),
    }).index("byExternalId", ["externalId"]),
    // users: defineTable({
    //   createdAt: v.number(),
    //   emailAddresses: v.array(v.object({
    //     emailAddress: v.string(),
    //     id: v.optional(v.string()),
    //     linkedTo: v.optional(v.array(v.string())),
    //     object: v.optional(v.string()),
    //     verification: v.optional(v.object({
    //       status: v.string(),
    //       strategy: v.string()
    //     })),
    //   })),
    //   externalAccounts: v.optional(v.array(v.object({}))),
    //   externalId: v.string(),
    //   firstName: v.string(),
    //   id: v.optional(v.string()),
    //   imageUrl: v.optional(v.string()),
    //   lastName: v.string(),
    //   lastSignInAt: v.number(),
    //   name: v.string(),
    //   object: v.optional(v.string()),
    //   passwordEnabled: v.boolean(),
    //   phoneNumbers: v.optional(v.array(v.object({}))),
    //   primaryEmailAddressId: v.optional(v.string()),
    //   primaryPhoneNumberId: v.optional(v.string()),
    //   primaryWeb3WalletId: v.optional(v.string()),
    //   privateMetadata: v.optional(v.any()),
    //   profileImageUrl: v.optional(v.string()),
    //   publicMetadata: v.optional(v.any()),
    //   twoFactorEnabled: v.optional(v.boolean()),
    //   unsafeMetadata: v.optional(v.any()),
    //   updatedAt: v.number(),
    //   username: v.optional(v.string()),
    //   web3Wallets: v.optional(v.array(v.object({})))  
    // }).index("byExternalId", ["externalId"])
  },
  { schemaValidation: true }
);
