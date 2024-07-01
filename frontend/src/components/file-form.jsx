import React, { useState } from "react";
import axios from "axios";

const FileForm = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [uploadResult1, setUploadResult1] = useState({
    message: "",
    isError: false,
  });
  const [uploadResult2, setUploadResult2] = useState({
    message: "",
    isError: false,
  });

  const handleFile1Change = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile1(uploadedFile);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File 1 uploaded successfully:", response.data);

      setUploadResult1({
        message: "File 1 uploaded successfully",
        isError: false,
      });
    } catch (error) {
      console.error("Error uploading file 1:", error.message);
      setUploadResult1({ message: "Error uploading file 1", isError: true });
    }
  };

  const handleFile2Change = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile2(uploadedFile);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File 2 uploaded successfully:", response.data);

      setUploadResult2({
        message: "File 2 uploaded successfully",
        isError: false,
      });
    } catch (error) {
      console.error("Error uploading file 2:", error.message);
      setUploadResult2({ message: "Error uploading file 2", isError: true });
    }
  };

  const handleValidate = async () => {
    if (!uploadResult1.isError && !uploadResult2.isError) {
      const formData = new FormData();
      formData.append("file1", file1);
      formData.append("file2", file2);

      try {
        const response = await axios.post(
          "http://localhost:5000/validate-files",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Validation response:", response.data);
        alert("Files validated successfully and saved to database!");
      } catch (error) {
        console.error("Error validating files:", error.message);
      }
    } else {
      alert("Please upload both files first.");
    }
  };

  return (
    <div className="pt-[100px] flex items-center justify-center">
      <div className="w-[300px] flex flex-col p-4 gap-4 bg-white shadow-sm border rounded-md">
        <h2 className="text-xl font-bold">Upload Files</h2>
        <div>
          <input
            type="file"
            name="file1"
            id="file1"
            onChange={handleFile1Change}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {uploadResult1.message && (
            <div
              className={`mt-2 text-sm ${
                uploadResult1.isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {uploadResult1.message}
            </div>
          )}
        </div>
        <div>
          <input
            type="file"
            name="file2"
            id="file2"
            onChange={handleFile2Change}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {uploadResult2.message && (
            <div
              className={`mt-2 text-sm ${
                uploadResult2.isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {uploadResult2.message}
            </div>
          )}
        </div>
        <button
          onClick={handleValidate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={uploadResult1.isError || uploadResult2.isError}
        >
          Validate
        </button>
      </div>
    </div>
  );
};

export default FileForm;
