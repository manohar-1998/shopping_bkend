const mongoose = require('mongoose');
const crud = require('../utils/crud-utils')
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
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

const Payment = mongoose.model('payment', PaymentSchema);

Payment.getRecrods = () => {
  return crud.getRecords(Payment);
}

Payment.getRecordByFilter = (filter = {}) => {
  return crud.getRecordByFilter(Payment, filter);
}

Payment.getRecrod = (filter) => {
  return crud.getRecord(Payment, filter);
}

Payment.createRecrod = (record) => {
  return crud.createRecrod(Payment, record);
}

Payment.deleteRecrod = (filter) => {
  return crud.deleteRecrod(Payment, filter);
}

Payment.updateRecrod = (filter, record) => {
  return crud.updateRecrod(Payment, filter, record);
}

module.exports = Payment;
