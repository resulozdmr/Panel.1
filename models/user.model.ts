import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  fullName: string;
  department: string;
  graduationYear: number;
  phone: string;
  cvUrl: string;
  certificateUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
}

// Kullanıcı modeli tanımı
const UserSchema = new Schema<IUser>({
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
const User = models.User || model<IUser>('User', UserSchema);

export default User;
