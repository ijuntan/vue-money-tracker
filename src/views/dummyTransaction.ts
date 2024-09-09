import { format, addDays } from "date-fns";

export const data = [
  {
    id: format(new Date(), "yyyyMMdd"),
    date: new Date(),
    details: [
      {
        id: 1,
        name: "Income 1",
        income: 10000,
      },
      {
        id: 2,
        name: "Income 2",
        income: 10000,
      },
      {
        id: 3,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 4,
        name: "Expense 2",
        expense: 5000,
      },
      {
        id: 5,
        name: "Income 1",
        income: 10000,
      },
      {
        id: 6,
        name: "Income 2",
        income: 10000,
      },
      {
        id: 7,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 8,
        name: "Expense 2",
        expense: 5000,
      },
      {
        id: 9,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 10,
        name: "Expense 2",
        expense: 5000,
      },
    ],
  },
  {
    id: format(addDays(new Date(), -1), "yyyyMMdd"),
    date: addDays(new Date(), -1),
    details: [
      {
        id: 1,
        name: "Income 1",
        income: 10000,
      },
      {
        id: 2,
        name: "Income 2",
        income: 10000,
      },
      {
        id: 3,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 4,
        name: "Expense 2",
        expense: 5000,
      },
      {
        id: 5,
        name: "Income 1",
        income: 10000,
      },
      {
        id: 6,
        name: "Income 2",
        income: 10000,
      },
      {
        id: 7,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 8,
        name: "Expense 2",
        expense: 5000,
      },
      {
        id: 9,
        name: "Expense 1",
        expense: 6000,
      },
      {
        id: 10,
        name: "Expense 2",
        expense: 5000,
      },
    ],
  },
];
