import mongoose, { Schema } from 'mongoose'

const moneyplanSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  item_amount: {
    type: String
  },
  phone_number: {
    type: String
  },
  description: {
    type: String
  },
  logo_url: {
    type: String
  },
  is_featured: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

moneyplanSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user_id: this.user_id.view(full),
      title: this.title,
      item_amount: this.item_amount,
      phone_number: this.phone_number,
      description: this.description,
      logo_url: this.logo_url,
      is_featured: this.is_featured,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('sales', moneyplanSchema)

export const schema = model.schema
export default model
