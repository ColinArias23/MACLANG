import React, { useState } from "react";

const departmentsData = [
  {
    id: 1,
    name: "Emergency Room",
    head: "Dr. John Smith",
    employees: [
      { id: 1, name: "Dr. Jane Doe" },
      { id: 2, name: "Nurse Emily Stone" },
      { id: 3, name: "Nurse Jake White" },
    ],
  },
  {
    id: 2,
    name: "Pediatrics Department",
    head: "Dr. Karen Smith",
    employees: [
      { id: 1, name: "Dr. Alan Green" },
      { id: 2, name: "Nurse Samantha Lee" },
    ],
  },
  {
    id: 3,
    name: "Surgery Department",
    head: "Dr. Raymond Harris",
    employees: [
      { id: 1, name: "Dr. Mark Jones" },
      { id: 2, name: "Nurse Linda Kelly" },
      { id: 3, name: "Nurse Charles Scott" },
    ],
  },
  {
    id: 4,
    name: "Radiology Department",
    head: "Dr. Edward King",
    employees: [
      { id: 1, name: "Dr. Susan Lee" },
      { id: 2, name: "Technician Oscar Hunt" },
    ],
  },
  {
    id: 5,
    name: "Pharmacy Department",
    head: "Ms. Laura Lee",
    employees: [
      { id: 1, name: "Pharmacist Chloe Adams" },
      { id: 2, name: "Technician Ryan Lee" },
    ],
  },
  {
    id: 6,
    name: "Laboratory Department",
    head: "Dr. Liam Davis",
    employees: [
      { id: 1, name: "Lab Tech Clara Miller" },
      { id: 2, name: "Lab Assistant James Brown" },
    ],
  },
  {
    id: 7,
    name: "Obstetrics and Gynecology",
    head: "Dr. Vanessa Clark",
    employees: [
      { id: 1, name: "Dr. Olivia Turner" },
      { id: 2, name: "Nurse Jessica Harris" },
    ],
  },
  {
    id: 8,
    name: "Cardiology Department",
    head: "Dr. Christopher Lee",
    employees: [
      { id: 1, name: "Dr. Samuel Walker" },
      { id: 2, name: "Nurse Nancy Evans" },
    ],
  },
  {
    id: 9,
    name: "Orthopedics Department",
    head: "Dr. Nancy Wright",
    employees: [
      { id: 1, name: "Dr. Brian Miller" },
      { id: 2, name: "Nurse Maria Johnson" },
    ],
  },
  {
    id: 10,
    name: "Neurology Department",
    head: "Dr. Harold Thompson",
    employees: [
      { id: 1, name: "Dr. Emily King" },
      { id: 2, name: "Nurse Rachel Martinez" },
    ],
  },
  {
    id: 11,
    name: "Intensive Care Unit (ICU)",
    head: "Dr. William Brown",
    employees: [
      { id: 1, name: "Dr. Jessica Wilson" },
      { id: 2, name: "Nurse Patricia Moore" },
      { id: 3, name: "Nurse Tom White" },
    ],
  },
];

const Department = () => {
  const [departments, setDepartments] = useState(departmentsData);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newHeadName, setNewHeadName] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Get selected department object
  const selectedDept = departments.find((d) => d.id === selectedDeptId);

  // Add employee to selected department
  const addEmployee = () => {
    if (!newEmployeeName.trim()) return;

    setDepartments((prev) =>
      prev.map((dept) =>
        dept.id === selectedDeptId
          ? {
              ...dept,
              employees: [
                ...dept.employees,
                { id: Date.now(), name: newEmployeeName.trim() },
              ],
            }
          : dept
      )
    );
    setNewEmployeeName("");
    setConfirmationMessage(`Employee "${newEmployeeName}" added successfully!`);
    setTimeout(() => setConfirmationMessage(""), 3000); // Clear message after 3 seconds
  };

  // Remove employee from selected department
  const removeEmployee = (empId, empName) => {
    if (window.confirm(`Are you sure you want to remove ${empName}?`)) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === selectedDeptId
            ? {
                ...dept,
                employees: dept.employees.filter((emp) => emp.id !== empId),
              }
            : dept
        )
      );
      setConfirmationMessage(`Employee "${empName}" removed successfully!`);
      setTimeout(() => setConfirmationMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  // Update department head
  const updateHead = () => {
    if (!newHeadName.trim()) return;

    setDepartments((prev) =>
      prev.map((dept) =>
        dept.id === selectedDeptId
          ? { ...dept, head: newHeadName.trim() }
          : dept
      )
    );
    setNewHeadName("");
    setConfirmationMessage(`Department head updated to "${newHeadName}"!`);
    setTimeout(() => setConfirmationMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="w-full h-[88vh] p-6 bg-white shadow rounded flex gap-8">
      {/* Department List */}
      <div className="w-1/3 border-r border-gray-300 pr-4">
        <h2 className="text-xl font-bold mb-4">Departments</h2>
        <ul>
          {departments.map((dept) => (
            <li
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className={`cursor-pointer py-2 px-3 rounded ${
                selectedDeptId === dept.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {dept.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Department Details */}
      <div className="flex-1">
        {!selectedDept ? (
          <p className="text-gray-500">Please select a department to see details.</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{selectedDept.name}</h1>
            <div className="mb-6">
              <strong>Department Head: </strong> {selectedDept.head}
            </div>

            {/* Update Department Head */}
            <div className="mb-8 flex gap-2">
              <input
                type="text"
                placeholder="New department head"
                value={newHeadName}
                onChange={(e) => setNewHeadName(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded flex-grow"
              />
              <button
                onClick={updateHead}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Head
              </button>
            </div>

            {/* Confirmation Message */}
            {confirmationMessage && (
              <div className="bg-green-200 text-green-800 px-4 py-2 rounded mb-4">
                {confirmationMessage}
              </div>
            )}

            {/* Employees List */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">Employees</h2>
              {selectedDept.employees.length === 0 ? (
                <p className="text-gray-500">No employees in this department.</p>
              ) : (
                <ul className="mb-6">
                  {selectedDept.employees.map((emp) => (
                    <li
                      key={emp.id}
                      className="flex justify-between items-center border-b border-gray-200 py-2"
                    >
                      <span>{emp.name}</span>
                      <button
                        onClick={() => removeEmployee(emp.id, emp.name)}
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Remove ${emp.name}`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Add Employee */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="New employee name"
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded flex-grow"
                />
                <button
                  onClick={addEmployee}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Department;
