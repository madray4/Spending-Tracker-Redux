const Entry = require ('../models/entryModel');
const mongoose = require ('mongoose');

// GET all entries
const getEntries = async (req, res) => {
  const user_id = req.user._id;
  const entries = await Entry.find({ user_id });
  res.status(200).json(entries);
};

// GET a single entry
const getEntry = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(500).json({error: 'No such entry'});
  }

  const entry = await Entry.findById(id);
  if(!entry) {
    return res.status(500).json({error: 'No such entry'});
  }
  if (req.user._id.toString() != entry.user_id){
    return res.status(500).json({ error: 'This entry does not belong to you' });
  }
  res.status(200).json(entry);
}

// CREATE an entry
const createEntry = async (req, res) => {
  const { store, item, totalCost, date } = req.body;
  const user_id = req.user._id;
  let emptyFields = [];

  if(!store) emptyFields.push('store');
  if(!item) emptyFields.push('item');
  if(!totalCost) emptyFields.push('totalCost');
  if(!date) emptyFields.push('date');
  if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

  try{
    const entry = await Entry.create({...req.body, user_id});
    res.status(200).json(entry);
  }
  catch (error){
    res.status(500).json({ error: error.message })
  };
};

// DELETE an entry
const deleteEntry = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(500).json({error: 'No such entry'});
  }

  const entry = await Entry.findByIdAndDelete(id);
  if(!entry){
    return res.status(500).json({error: 'No such entry'});
  }
  res.status(200).json(entry)
};

// UPDATE an entry
const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { store, item, totalCost, date } = req.body;
  let emptyFields = [];

  console.log(store, item, totalCost, date)
  if(!store) emptyFields.push('store');
  if(!item) emptyFields.push('item');
  if(!totalCost) emptyFields.push('totalCost');
  if(!date) emptyFields.push('date');
  if(emptyFields.length > 0) return res.status(400).json({error: 'Please fill in all fields', emptyFields});

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(500).json({error: 'No such entry'});
  }
  const entry = await Entry.findByIdAndUpdate(id, {...req.body});
  if(!entry){
    return res.status(500).json({error: 'No such entry'});
  }
  res.status(200).json(entry);
};

module.exports = {
  getEntries,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry
};