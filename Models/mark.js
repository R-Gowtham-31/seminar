import mongoose from 'mongoose';

const markSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  sem1: { type: Number, min: 0, max: 10 },
  sem2: { type: Number, min: 0, max: 10 },
  sem3: { type: Number, min: 0, max: 10 },
  sem4: { type: Number, min: 0, max: 10 },
  sem5: { type: Number, min: 0, max: 10 },
  sem6: { type: Number, min: 0, max: 10 },
});

const markModel = mongoose.model('Marks', markSchema);

export default markModel;
