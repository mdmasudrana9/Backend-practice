import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    needsPasswordChange: {
      type: String,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

//Pre save middleware/hook:
userSchema.pre('save', async function () {
  // console.log(this, 'will save before call middleware')
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
})
//post save middleware/hook:
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
  // console.log(this, 'was saved after middleware')
})

export const User = model<TUser>('User', userSchema)
