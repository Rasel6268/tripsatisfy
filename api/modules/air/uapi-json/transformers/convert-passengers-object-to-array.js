const moment = require('moment');

module.exports = (params) => {
  const list = [];
  const { passengers, childBirths } = params;

  // Handle the 'ADT' (Adult) passengers
  if (passengers.ADT) {
    for (let i = 0; i < passengers.ADT; i += 1) {
      list.push({
        ageCategory: 'ADT',
        child: false,
        infant: false,
      });
    }
  }

  // Handle the 'CNN' (Child) passengers
  if (passengers.CNN && Array.isArray(childBirths)) {
    childBirths.forEach((birthDate, index) => {
      const birth = moment(birthDate, 'YYYY-MM-DD');
      const age = moment().diff(birth, 'years');
      list.push({
        ageCategory: 'CNN',
        child: true,
        infant: false,
        Age: age,
      });
    });
  }

  // Handle the 'INF' (Infant) passengers
  if (passengers.INF) {
    for (let i = 0; i < passengers.INF; i += 1) {
      list.push({
        ageCategory: 'INF',
        child: false,
        infant: true,
        Age: 1, // Assume a default age for infants if birthdate is not provided
      });
    }
  }

  // Replace the passengers in the original params object
  params.passengers = list;
  return params;
};
