import mongoose, { Schema, model, models } from 'mongoose';

// Kullanıcı modeli tanımı
const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cvUrl: {
    type: String,
    required: true,
  },
  certificateUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Eğer model daha önce oluşturulmuşsa tekrar oluşturma, yoksa yeni oluştur
const User = models.User || model('User', UserSchema);

export default User;
