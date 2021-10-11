const getRecords = (model, inputs = {}) => {
  return model.find(inputs)
}

const getRecord = (model, id) => {
  return model.find({ _id: id })
}

const getRecordByFilter = (model, filter) => {
  return model.findOne(filter)
}

const createRecrod = async (model, record) => {
  if(record.provider){
    let filter = {};
    if(record.provider === 'local'){
      filter = { name: record.name, provider: record.provider }
    } else {
      filter = { id: record.id, provider: record.provider }
    }
    const rec = await model.findOne(filter)
    if (rec && rec._id){
      //let updatedRec = await model.findOneAndUpdate({_id: rec._id}, record, { new: true });
      return rec
    }
  }
  record.createdOn = (new Date()).toLocaleDateString();
  record.updatedOn = (new Date()).toLocaleDateString();
  record.createdAt = new Date();
  record.updatedAt = record.createdAt;
  return model.create(record);
}

const deleteRecrod = (model, filter) => {
  return model.findOneAndDelete(filter)
}

const updateRecrod = (model, filter, record) => {
  record.updatedAt = new Date();
  return model.findOneAndUpdate(filter, record, { new: true }) // new true means return updated record, false will update old record
}

const crud = {
  getRecord,
  getRecordByFilter,
  getRecords,
  createRecrod,
  updateRecrod,
  deleteRecrod
}

module.exports = crud;
