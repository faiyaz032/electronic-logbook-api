import {
  DocumentType,
  Severity,
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import { v4 as generateId } from 'uuid';

export const privateFields = [
  'password',
  '__v',
  'verificationCode',
  'passwordResetCode',
  'verified',
];

@pre<User>('save', async function () {
  if (!this.isModified('password')) return;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ required: [true, 'First Name must be required'] })
  firstName: string;

  @prop({ required: [true, 'Last Name must be required'] })
  lastName: string;

  @prop({ required: [true, 'Email must be required'], trim: true, unique: true })
  email: string;

  @prop({ required: [true, 'Password must be required'] })
  password: string;

  @prop({ required: true, default: generateId() })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ default: false })
  verified: Boolean;

  @prop({ required: [true, 'Mobile Name must be required'] })
  mobile: string;

  @prop({ required: [true, 'Role must be required'] })
  role: string;

  /**
   *This function will validate the given password with actual password
   */
  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.log(error, 'could not validate password');
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
