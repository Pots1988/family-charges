import Vue from "vue";

export const capitalize = Vue.filter(`capitalize`, val => {
  if (!val.length) return val;
  return val[0].toUpperCase() + val.slice(1);
});

export const fixedNumber = Vue.filter(`fixedNumber`, val => {
  return val.toFixed(2);
});

export const formatDate = Vue.filter(`formatDate`, val => {
  let day = new Date(+val),
    year = day.getFullYear(),
    month = day.getMonth() + 1,
    date = day.getDate();

  if (date < 10) date = `0${date}`;
  if (month < 10) month = `0${month}`;

  return `${date}.${month}.${year}`;
});
