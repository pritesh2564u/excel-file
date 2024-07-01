const mongoose = require("mongoose");
const contactModel = require("./contact");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  employees: {
    type: Number,
  },
  foundedDate: {
    type: Date,
  },
  industryType: {
    type: String,
    enum: ["Technology", "Finance", "Healthcare", "Retail", "Other"],
    required: true,
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
