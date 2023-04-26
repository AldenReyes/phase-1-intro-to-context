function createEmployeeRecord(employeeInfo) {
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeArray) {
  return employeeArray.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return employee;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvents = employeeRecord.timeInEvents.find(
    ({ date: workDate }) => workDate === date
  );
  const timeOutEvents = employeeRecord.timeOutEvents.find(
    ({ date: workDate }) => workDate === date
  );

  if (timeInEvents && timeOutEvents) {
    const hoursWorkedDecimal = timeOutEvents.hour - timeInEvents.hour;
    return calculateTimeFromDecimal(hoursWorkedDecimal);
  } else {
    return 0;
  }
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  let totalWages = 0;
  employeeRecord.timeInEvents.map((timeInEvent) => {
    const date = timeInEvent.date;
    totalWages += wagesEarnedOnDate(employeeRecord, date);
  });
  return totalWages;
}

function calculatePayroll(employees) {
  const totalPayroll = employees.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord);
  }, 0);
  return totalPayroll;
}

//helpers
function calculateTimeFromDecimal(decimalTime) {
  const hours = Math.floor(decimalTime / 100);
  const minutes = (decimalTime % 100) / 60;
  return hours + minutes;
}
