import { model, Schema } from 'mongoose';

interface ISchemaUser {
  name: string;
  password: string;
}

const userSchema = new Schema<ISchemaUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = model('user', userSchema);
export default userModel;
