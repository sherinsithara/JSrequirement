const employees = [
  { id: 1, Title: "Sherin", department: "HR", salary: 70000 },
  { id: 1, Title: "Sherin", department: "HR", salary: 70000 },
  { id: 2, Title: "Sithara", department: "Data Engineer", salary: 50000 },
  { id: 3, Title: "Vais", department: "HR", salary: 45000, bonusPercentage: 10 },
  { id: 6, Title: "Kaja", department: "HR", salary: 60000 },
  { id: 4, Title: "Manthra", department: "Prompt Engineer", salary: 40000, experience: 2.5, bonusPercentage: 10 },
  { id: 5, Title: "Bob", department: "Engineer", salary: 30000 }
];

function removeDuplicates(employees) {
  const ids = new Set();
  const uniqueEmployees = [];

  for (const emp of employees) {
    if (!ids.has(emp.id)) {
      ids.add(emp.id);
      uniqueEmployees.push(emp);
    }
  }

  return uniqueEmployees;
}

function calculateBonus(employee) {
  let bonus = 0;

  if (employee.department === "HR" && employee.salary < 50000) {
    bonus = employee.salary * 10/100;
  } else if (employee.department.includes("Engineer") && employee.experience > 2) {
    bonus = employee.salary * 15/100; 
  }

  return bonus;
}

function calculateTotalCompensation(employee) {
  const bonus = calculateBonus(employee);
  const totalCompensation = employee.salary + bonus;
  return { ...employee, bonus, totalCompensation };
}

function filterByDepartment(employees, department) {
  return employees.filter((emp) => emp.department === department);
}

function generateReport(employees) {
  const groupedReport = {};

  for (const emp of employees) {
    if (!groupedReport[emp.department]) {
      groupedReport[emp.department] = [];
    }

    groupedReport[emp.department].push({
      name: emp.Title,
      salary: emp.salary,
      bonus: emp.bonus,
      totalCompensation: emp.totalCompensation
    });
  }

  return groupedReport;
}

function processEmployees(employees, department) {
  const uniqueEmployees = removeDuplicates(employees);
  const updatedEmployees = uniqueEmployees.map(calculateTotalCompensation);
  const filteredEmployees = filterByDepartment(updatedEmployees, department);
  const report = generateReport(filteredEmployees);

  return { report, updatedEmployees };
}

const department = "HR";
const result = processEmployees(employees, department);

console.log("Employee Report:", result.report);
console.log("Updated Employees:", result.updatedEmployees);
