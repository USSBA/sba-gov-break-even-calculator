export const variableCostFields = [
  {name: 'Direct Materials', description: 'Raw materials used in the creation of one unit:'},
  {name: 'Piece Rate Labor', description: 'The amount paid to workers for one unit completed:'},
  {name: 'Production Supplies', description: 'Maintenance supplies for production variable machinery per unit:'},
  {name: 'Commissions', description: 'Cost paid to salespeople if they sell a unit of products or services:'},
  {name: 'Freight Out', description: 'Shipping cost per unit if the company sells and ships out one product:'},
  {name: 'Other Variable Costs', description: 'Additional variable costs per unit that are not included above:'},
]

export const variableCostInitState = {
  'Direct Materials': 0,
  'Piece Rate Labor': 0,
  'Production Supplies': 0,
  Commissions: 0,
  'Freight Out': 0,
  'Other Variable Costs': 0,
}