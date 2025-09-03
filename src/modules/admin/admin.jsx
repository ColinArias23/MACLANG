import React, { useState } from "react";
import Sidebar from "../../shared/layout/components/sidebar";
import Content from "../../shared/layout/components/content";

// Import logos
import AnesthesiologyLogo from "../../assets/logos/anesthesiology.jpg";
// Add the rest of your logos...
// import FamilyMedicineLogo from "../../assets/logos/family-medicine.jpg";

const Admin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const departmentNames = [
    "Anesthesiology", "Family Medicine", "Internal Medicine", "Obstetrics & Gynecology", "Surgery", "Pediatrics",
    "Dental", "Respiratory Unit", "Pathology", "Radiology", "Pharmacy", "Operating Room",
    "Emergency Room", "OPD", "NICU", "HRPU",
    "ICU", "Dietary", "Health Information Management", "Medical Social Service", "Engineering & Maintenance", "Human Resource",
    "Information Technology", "Procurement Property and Supplement", "Accounting",
  ];

  const departmentHeads = [
    "Malaika Salido-Ecalnir, MD", "Robert Smith", "Daniel Lee", "Sarah Martinez", "Michael Brown", "Emily Davis",
    "Arnold Benedict Yambao, DMD", "Jessica Taylor", "Chris Evans", "Olivia White", "Ethan Hall",
    "Natalie Young", "Jacob Allen", "Megan King", "William Wright", "Sophia Scott",
    "James Green", "Grace Adams", "Benjamin Baker", "Harper Perez", "Engr. Marc Napoleon Quiaoit III",
    "Marion May S. Cervera", "Jan Bert I. Doquenia", "Luisito P. Salvador", "Arlene T. Novilla, CPA"
  ];

  const departmentEmployees = [
    15, 10, 20, 12, 25, 18, 8, 7, 5, 6, 9, 4,
    14, 11, 13, 10, 16, 7, 5, 6, 3, 4, 5, 6, 8,
  ];

  const departmentLogos = [
    AnesthesiologyLogo,
    // Add the rest in order...
  ];

  // Define color classes (looping fallback)
  const cardColors = [
    "bg-red-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-orange-100",
    "bg-lime-100",
    "bg-cyan-100",
    "bg-emerald-100",
    "bg-indigo-100",
    "bg-rose-100",
  ];

  // Combine department data into card objects
  const cards = departmentNames.map((title, i) => ({
    id: i + 1,
    title,
    head: departmentHeads[i],
    employees: departmentEmployees[i],
    logo: departmentLogos[i],
  }));

  const filteredCards = cards.filter(card =>
    `${card.title} ${card.head}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Content>
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-gray-200 flex-shrink-0">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center gap-4">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700"
                >
                  Back
                </button>
              )}
              <input
                type="text"
                placeholder="Search departments..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex-1 overflow-y-auto mt-6 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.length > 0 ? (
                filteredCards.map((card, index) => {
                  const cardColor = cardColors[index % cardColors.length];

                  return (
                    <div
                      key={card.id}
                      className={`${cardColor} rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-xl transition-shadow-lg flex items-center gap-4`}
                    >
                      {card.logo && (
                        <img
                          src={card.logo}
                          alt={`${card.title} logo`}
                          className="w-20 h-20 object-contain"
                        />
                      )}
                      <div>
                        <h2 className="text-lg font-medium text-blue-900">{card.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">Head: {card.head}</p>
                        <p className="text-sm text-gray-600">Employees: {card.employees}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No departments found.
                </p>
              )}
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Admin;
