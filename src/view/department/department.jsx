import React, { useState } from "react";

const departmentsData = [
  {
    id: 1,
    name: "Human Resource Department",
    head: "Ms. Marion May M. Cervera",
    employees: [
      { id: 1, name: "Juan Dela Cruz" },
      { id: 2, name: "Maria Clara" },
      { id: 3, name: "Pedro Penduko" },
    ],
  },
  {
    id: 2,
    name: "Accounting Department",
    head: "Ms. Arlene T. Novilla, CPA",
    employees: [
      { id: 1, name: "Anna Smith" },
      { id: 2, name: "John Doe" },
    ],
  },
  {
    id: 3,
    name: "Engineering Department",
    head: "Engr. Marc Napoleon Quiaoit III",
    employees: [
      { id: 1, name: "Engineer One" },
      { id: 2, name: "Engineer Two" },
      { id: 3, name: "Engineer Three" },
    ],
  },
  // Add more departments as needed...
];

const Dashboard = () => {
  const [departments, setDepartments] = useState(departmentsData);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newHeadName, setNewHeadName] = useState("");

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
  };

  // Remove employee from selected department
  const removeEmployee = (empId) => {
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
  };

  return (
    <div className="w-full h-[89vh] p-6 bg-white shadow rounded flex gap-8">
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
          <p className="text-gray-500">
            Please select a department to see details.
          </p>
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

            {/* Employees List */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">Employees</h2>
              {selectedDept.employees.length === 0 ? (
                <p className="text-gray-500">
                  No employees in this department.
                </p>
              ) : (
                <ul className="mb-6">
                  {selectedDept.employees.map((emp) => (
                    <li
                      key={emp.id}
                      className="flex justify-between items-center border-b border-gray-200 py-2"
                    >
                      <span>{emp.name}</span>
                      <button
                        onClick={() => removeEmployee(emp.id)}
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
                  Add
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
