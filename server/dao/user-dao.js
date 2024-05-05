const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const employeeFolderPath = path.join(__dirname, "storage", "employeeList");

// Method to read an employee from a file
function get(employeeId) {
  try {
    const filePath = path.join(employeeFolderPath, `${employeeId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReademployee", message: error.message };
  }
}

// Method to write an employee to a file
function create(employee) {
  try {
    employee.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(employeeFolderPath, `${employee.id}.json`);
    const fileData = JSON.stringify(employee);
    fs.writeFileSync(filePath, fileData, "utf8");
    return employee;
  } catch (error) {
    throw { code: "failedToCreateemployee", message: error.message };
  }
}

// Method to update employee in a file
function update(employee) {
  try {
    const currentemployee = get(employee.id);
    if (!currentemployee) return null;
    const newemployee = { ...currentemployee, ...employee };
    const filePath = path.join(employeeFolderPath, `${employee.id}.json`);
    const fileData = JSON.stringify(newemployee);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newemployee;
  } catch (error) {
    throw { code: "failedToUpdateemployee", message: error.message };
  }
}

// Method to remove an employee from a file
function remove(employeeId) {
  try {
    const filePath = path.join(employeeFolderPath, `${employeeId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveemployee", message: error.message };
  }
}

// Method to list employees in a folder
function list() {
  try {
    const files = fs.readdirSync(employeeFolderPath);
    const employeeList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(employeeFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    employeeList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return employeeList;
  } catch (error) {
    throw { code: "failedToListemployees", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
