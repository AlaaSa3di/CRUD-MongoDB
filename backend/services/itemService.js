const Item = require("../models/Item");

// إنشاء عنصر جديد
const createItem = async (data) => {
  return await Item.create(data);
};

// جلب كل العناصر غير المحذوفة
const getItems = async () => {
  return await Item.find({ isDeleted: false });
};

// get item
const getItemById = async (id) => {
  return await Item.findOne({ _id: id, isDeleted: false });
};

// update item
const updateItem = async (id, data) => {
  return await Item.findByIdAndUpdate(id, data, { new: true });
};



//(Soft Delete)
const softDeleteItem = async (id) => {
  return await Item.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true });
};

module.exports = { createItem, getItems, getItemById, updateItem, softDeleteItem };
