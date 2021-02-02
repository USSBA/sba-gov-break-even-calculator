export const fixedCostFields = [
  {name: 'Amortization', description: 'Amount paid per month on loan payments with interest and terms:'},
  {name: 'Rent', description: 'Amount paid per month on planned rent payments to term:'},
  {name: 'Insurance', description: 'Amount paid per month on any agreed upon insurance costs:'},
  {name: 'Salaries', description: 'Amount paid per month for yearly or termed salaried employees:'},
  {name: 'Utilities', description: 'Amount paid per month on utility costs that do not change based on usage:'},
  {name: 'Depreciation', description: 'Amount paid per month on asset purchase cost minus salvage value:'},
  {name: 'Interest Expense', description: 'Amount paid per month on additional cost incurred from borrowed funds:'},
  {name: 'Property Taxes', description: 'Amount paid per month on taxes incurred from business owned property:'},
  {name: 'Other Monthly Costs', description: 'Amount paid per month on other fixed costs such as website hosting, e-commerce, and online payments:'},
  {name: 'Other Fixed Costs', description: 'Amount paid per month on any additional fixed costs not accounted for previously:'},
]

export const fixedCostInitState = {
  Amortization: '',
  Rent: '',
  Insurance: '',
  Salaries: '',
  Utilities: '',
  Depreciation: '',
  'Interest Expense': '',
  'Property Taxes': '',
  'Other Monthly Costs': '',
  'Other Fixed Costs': '',
}
