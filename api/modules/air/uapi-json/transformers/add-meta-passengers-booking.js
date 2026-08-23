const moment = require('moment');

module.exports = (params) => {
  params.passengers.forEach((item) => {
    const birthSSR = moment(item.birthDate.toUpperCase(), 'YYYY-MM-DD');
    const dueSSR = moment(item.passExpire.toUpperCase(), 'YYYY-MM-DD');
    const {
      passCountry: country,
      passNumber: num,
      firstName: first,
      lastName: last,
      gender
    } = item;
    let genderType = gender;
    const due = dueSSR.format('DDMMMYY');
    const birth = birthSSR.format('DDMMMYY');

    if (item.ageCategory === 'CNN') {
      item.isChild = true;
      item.dobString = birthSSR.format('DDMMMYY').toUpperCase();
      if (item.Age < 10) {
        item.ageCategory = `C0${item.Age}`;
      } else {
        item.ageCategory = `C${item.Age}`;
      }
    }
    if (item.ageCategory === 'ADT') {
      item.isAdult = true;
    }
    if (item.ageCategory === 'INF') {
      item.isInfant = true;
      item.dobString = birthSSR.format('DDMMMYY').toUpperCase();
      genderType = gender+"I";
    }

    item.ssr = item.ssr || [];

    item.ssr.push({
      type: 'FOID',
      text: `PP${country}${num}`,
    });
    item.ssr.push({
      type: 'DOCS',
      text: `P/${country}/${num}/${country}/${birth}/${genderType}/${due}/${last}/${first}`,
    });

    item.DOB = birthSSR.format('YYYY-MM-DD');
  });

  return params;
};
