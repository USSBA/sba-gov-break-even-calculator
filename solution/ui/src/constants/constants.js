export const CALCULATOR_STEPS = {
  FIXED_COSTS: 0,
  PRICE_PER_UNIT: 1,
  UNIT_SALES: 2,
  VARIABLE_COSTS: 3,
  RESULTS_PAGE: 4,
}

export const FAQ_CONTENT = {
  0: [
    {
      question: 'How to calculate a fixed cost that is not paid monthly',
      answer: `
        <p>Include any fixed costs that are not incurred monthly into your calculations. These typically include certain startup and other one-time payments. <strong>Examples of these types of expenses include</strong>:</p>
        <ul>
          <li>First month’s rent</li>
          <li>Security deposit</li>
          <li>Licenses and permits</li>
          <li>Legal fees</li>
          <li>Signage</li>
          <li>Technology and software</li>
        </ul>
      <p>To estimate monthly amounts for these payments, simply divide the cost amount by 12. For fixed costs incurred on a quarterly basis, divide the cost amount by four.</p>
      `
    },
    {
      question: 'How to identify a fixed cost vs. a variable cost',
      answer: `
        <p>Fixed costs are expenses that typically stay the same each month, while variable costs increase or decrease based on a company's production volume. For example, utility costs incur monthly but are considered variable because they change in proportion to energy usage.</p>
      `
    },
    {
      question: 'Considerations for semi-variable costs',
      answer: `
        <p>Semi-variable costs comprise a mixture of both fixed and variable components. Costs are fixed for a set level of production or consumption and become variable after this production level is exceeded. For example, fixed expenses such as salaries might increase in proportion to production volume increases in the form of overtime pay.</p>
      `
    }
  ]
}