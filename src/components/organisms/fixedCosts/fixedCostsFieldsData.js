export const fixedCostFields = [
  {name: 'Amortization', description: 'Amount paid per month on loan payments with interest and terms:'},
  {name: 'Rent', description: 'Amount paid per month on planned rent payments to term:'},
  {name: 'Insurance', description: 'Amount paid per month on any agreed upon insurance costs:'},
  {name: 'Salaries', description: 'Amount paid per month for yearly or termed salaried employees:'},
  {name: 'Utilities', description: 'Amount paid per month on utility costs that do not change based on usage:'},
  {name: 'Deprecation', description: 'Amount paid per month on asset purchase cost minus salvage value:'},
  {name: 'Interest Expense', description: 'Amount paid per month on additional cost incurred from borrowed funds:'},
  {name: 'Property Taxes', description: 'Amount paid per month on taxes incurred from business owned property:'},
  {name: 'Other Monthly Costs', description: 'Amount paid per month on other fixed costs such as website hosting, e-commerce, and online payments:'},
  {name: 'Other Fixed Costs', description: 'Amount paid per month on any additional fixed costs not accounted for previously:'},
]

export const fixedCostInitState = {
  Amortization: 0,
  Rent: 0,
  Insurance: 0,
  Salaries: 0,
  Utilities: 0,
  Deprecation: 0,
  'Interest Expense': 0,
  'Property Taxes': 0,
  'Other Monthly Costs': 0,
  'Other Fixed Costs': 0,
}