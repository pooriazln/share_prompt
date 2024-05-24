import { Schema, models, model, Model, InferSchemaType } from "mongoose"

export const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
})

type User = InferSchemaType<typeof UserSchema>
const UserModel: Model<User> = models.User || model<User>("User", UserSchema)
export default UserModel
