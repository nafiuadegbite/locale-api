const { Schema, model } = require("mongoose");

const statesSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  capital: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
    required: true,
  },
  senatorial_districts: [
    {
      type: String,
      required: true,
    },
  ],
  lgas: [
    {
      type: String,
      required: true,
    },
  ],
  landmass: {
    type: String,
    required: true,
  },
  population: {
    type: String,
    required: true,
  },
  dialect: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  created_date: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  past_governors: [
    {
      type: String,
      required: true,
    },
  ],
  borders: [
    {
      type: String,
      required: true,
    },
  ],
  known_for: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = new model("State", statesSchema);
