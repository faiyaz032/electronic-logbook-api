import {
  DocumentType,
  Severity,
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

@pre<UserSchema>('save', async function () {
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
export class UserSchema {
  @prop({ required: [true, 'First Name must be required'] })
  firstName: string;

  @prop({ required: [true, 'Last Name must be required'] })
  lastName: string;

  @prop({ required: [true, 'Email must be required'], trim: true })
  email: string;

  @prop({ required: [true, 'Password must be required'] })
  password: string;

  @prop({ required: true, default: () => nanoid() })
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
  async validatePassword(this: DocumentType<UserSchema>, candidatePassword: string) {
    try {
      return await bcrypt.compare(this.password, candidatePassword);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const User = getModelForClass(UserSchema);

export default User;
