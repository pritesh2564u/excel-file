const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");
const Company = require("../models/company");
const Contact = require("../models/contact");

// Middleware for handling file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: "file1", maxCount: 1 },
  { name: "file2", maxCount: 1 },
]);

// Middleware for validating and saving files
const validateMiddleware = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error: ", err.message);
      return res.status(500).json({ message: err.message });
    } else if (err) {
      console.error("Error: ", err.message);
      return res.status(500).json({ message: err.message });
    }

    const file1 = req.files["file1"] ? req.files["file1"][0] : null;
    const file2 = req.files["file2"] ? req.files["file2"][0] : null;

    if (!file1 || !file2) {
      console.error("Both files are required");
      return res.status(400).json({ message: "Both files are required" });
    }

    try {
      // Read file1 (Company data)
      const workbook1 = xlsx.readFile(file1.path);
      const sheetName1 = workbook1.SheetNames[0];
      const sheet1 = workbook1.Sheets[sheetName1];
      const companies = xlsx.utils.sheet_to_json(sheet1);

      // Read file2 (Contact data)
      const workbook2 = xlsx.readFile(file2.path);
      const sheetName2 = workbook2.SheetNames[0];
      const sheet2 = workbook2.Sheets[sheetName2];
      const contacts = xlsx.utils.sheet_to_json(sheet2);

      // Validate data
      if (!companies.length || !contacts.length) {
        console.error("Files are empty or not valid");
        return res
          .status(400)
          .json({ message: "Files are empty or not valid" });
      }

      // Save contacts first
      const contactDocuments = await Contact.insertMany(contacts);

      // Create a map to associate contacts with companies
      const contactMap = {};
      contactDocuments.forEach((contact) => {
        contactMap[contact.name] = contact._id;
      });

      // Save companies
      const companyPromises = companies.map(async (company) => {
        // Check if company.contacts is a string before splitting
        let companyContacts = [];
        if (typeof company.contacts === "string") {
          companyContacts = company.contacts.split(",").map((name) => {
            return contactMap[name.trim()];
          });
        }

        // Remove empty strings from companyContacts
        companyContacts = companyContacts.filter((contact) => contact);

        // Create new Company document
        const companyDocument = new Company({
          name: company.name,
          address: company.address,
          phone: company.phone,
          email: company.email,
          employees: company.employees,
          foundedDate: company.foundedDate,
          industryType: company.industryType,
          contacts: companyContacts,
        });

        // Save company document
        return companyDocument.save();
      });

      await Promise.all(companyPromises);

      res.locals.message = "Files validated and saved to MongoDB successfully";
      next();
    } catch (error) {
      console.error("Error processing files: ", error.message);
      return res
        .status(500)
        .json({ message: "Error processing files: " + error.message });
    }
  });
};

module.exports = validateMiddleware;
