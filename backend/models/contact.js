const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  contactType: {
    type: String,
    enum: ["Primary", "Secondary", "Other"],
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
