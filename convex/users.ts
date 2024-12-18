import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const syncUser = mutation({
  args:{
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async(ctx,args) => {
    // check if user exists, if yes then get the first result
    const existingUser = await ctx.db.query("users").filter(q=> q.eq(q.field("userId"), args.userId)).first();

    // if it does not exist, then insert the new record into the convex db

    if(!existingUser){
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        isPro: false,
      })
    }


  }
})