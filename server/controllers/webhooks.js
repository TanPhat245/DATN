import { Webhook } from "svix";
import User from "../models/UserModel.js";

//API controller Clerk
export const clerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      svix_id: req.headers["svix-id"],
      svix_timestamp: req.headers["svix-timestamp"],
      svix_signature: req.headers["svix-signature"],
    });
    //body
    const { data, type } = req.body;
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          resume: "",
          image: data.image_url,
          password: data.password
        };
        //add db
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.josn({ success: false, message: "Lỗi Webhook" });
  }
};
