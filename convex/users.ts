import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
});


export const getUser = query({
  args: {userId: v.string()},
  handler: async(ctx,args) => {
    if(!args.userId) return null;
    // if user id is not present,then simply return
    // else find the first instance of this user
    const user = await ctx.db.query("users").withIndex("by_user_id").filter((q)=>q.eq(q.field("userId"),args.userId)).first();
    
    if(!user) return null;
    return user;


  }
})