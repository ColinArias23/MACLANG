import React, { useState } from "react";

// ⛔ Commented out logo imports for now
// import hrLogo from "../../assets/logos/sample-hr.png";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const departmentNames = [
    "Human Resource Department",
    "Accounting Department",
    "Engineering Department",
    "Information Technology Department",
    "Procurement, Property and Supply Department",
    "Billing and Claims",
    "Anesthesia Department",
    "Chief of Clinics",
    "Dental Department",
    "Family Medicine Department",
    "Internal Medicine Department",
    "Obstetrics and Gynecology Department",
    "Emergency Department",
    "Outpatient Department",
    "Nursing Service Division",
    "Respiratory Therapy Department",
    "Health Information Management",
    "Radiology Department",
    "Pathology Department",
    "Dietary Department",
    "Pharmacy Department",
    "Admitting Section",
  ];

  const departmentHeads = [
    "Ms. Marion May M. Cervera",
    "Ms. Arlene T. Novilla, CPA",
    "Engr. Marc Napoleon Quiaoit III",
    "Mr. Jan Bert I. Doquenia",
    "Mr. Luisito P. Salvador",
    "Ms. Luzvi May B. Quiaoit",
    "AMalaika Salido-Ecalnir, MD",
    "Marichu A. Brillantes, MD",
    "Arnold Benedict Yambao, DMD",
    "Robert B. Belleza, MD",
    "Clodoaido M. Caringal, MD",
    "Natalie Young",
    "Jacob Allen",
    "Megan King",
    "William Wright",
    "Sophia Scott",
    "James Green",
    "Grace Adams",
    "Benjamin Baker",
    "Harper Perez",
    "Engr. Marc Napoleon Quiaoit III",
    "Marion May S. Cervera",
    "Jan Bert I. Doquenia",
    "Luisito P. Salvador",
    "Arlene T. Novilla, CPA",
  ];

  const departmentEmployees = [
    15, 10, 20, 12, 25, 18, 8, 7, 5, 6, 9, 4, 14, 11, 13, 10, 16, 7, 5, 6, 3, 4,
    5, 6, 8,
  ];

  // ⛔ Logos not used for now; keeping structure for future use
  // const departmentLogos = [
  //   hrLogo,
  //   ...moreLogos
  // ];

  const cards = departmentNames.map((title, i) => ({
    id: i + 1,
    title,
    head: departmentHeads[i] || "N/A",
    employees: departmentEmployees[i] || 0,
    // logo: departmentLogos[i] || null,
  }));

  const filteredCards = cards.filter((card) =>
    `${card.title} ${card.head}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar (if any) */}
      {/* <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} /> */}

      {/* Content */}
      <div className={`flex-1 transition-all duration-300`}>
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-gray-200 flex-shrink-0">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cards Grid */}
          <div className="flex-1 overflow-y-auto mt-6 pr-2 max-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className={`bg-neutral-100 rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-xl transition-shadow-lg flex items-center gap-4`}
                  >
                    {/* Icon instead of logo */}
                    <div className="text-4xl">🏢</div>

                    <div>
                      <h2 className="text-lg font-medium text-blue-900">
                        {card.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Head: {card.head}
                      </p>
                      <p className="text-sm text-gray-400">
                        Employees: {card.employees}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No departments found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
