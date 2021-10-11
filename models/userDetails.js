const mongoose = require('mongoose');
const crud = require('../utils/crud-utils')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  full_name: String,
  email: String,
  full_address: String,
  city_name: String,
  state: String,
  zip_code: String,
  country: String,
  billing_address: String,
  billing_city_name: String,
  billing_state: String,
  billing_zip_code: String,
  billing_country: String,
  card_no: String,
  valid_date: String,
  CVC: Number,
  createdOn: String,
  updatedOn: String,
  createdAt: {
    type: Date
  }
})

const User = mongoose.model('userdetails', UserSchema);

User.getRecrods = () => {
  return crud.getRecords(User);
}

User.getRecordByFilter = (filter = {}) => {
  return crud.getRecordByFilter(User, filter);
}

User.getRecrod = (filter) => {
  return crud.getRecord(User, filter);
}

User.createRecrod = (record) => {
  return crud.createRecrod(User, record);
}

User.deleteRecrod = (filter) => {
  return crud.deleteRecrod(User, filter);
}

User.updateRecrod = (filter, record) => {
  return crud.updateRecrod(User, filter, record);
}

module.exports = User;
