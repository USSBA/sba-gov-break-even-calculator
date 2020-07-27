import React from 'react'
import { Table } from 'semantic-ui-react'
import { sortBy } from 'lodash';

const tableData = [
  { units: 'John', profit: 15, revenue: 'Male', variableCosts: '200', fixedCosts: '123' },
  { units: 'Amber', profit: 40, revenue: 'Female', variableCosts: '200', fixedCosts: '123' },
  { units: 'Leslie', profit: 25, revenue: 'Other', variableCosts: '200', fixedCosts: '123' },
  { units: 'Ben', profit: 70, revenue: 'Male', variableCosts: '200', fixedCosts: '123' },
]

class BreakEvenDataTable extends React.Component {
	state = {
    column: 'units',
    data: this.props.data,
    direction: 'ascending',
  }

  handleSort = (clickedColumn) => () => {
		console.log('sorting', clickedColumn)
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
	}

  render() {
    const { column, data, direction } = this.state

    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'units' ? direction : null}
              onClick={this.handleSort('units')}
            >
              Unit Sales
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'profit' ? direction : null}
              onClick={this.handleSort('profit')}
            >
              Operating Profit
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'revenue' ? direction : null}
              onClick={this.handleSort('revenue')}
            >
              Revenue
            </Table.HeaderCell>
						<Table.HeaderCell
              sorted={column === 'variableCosts' ? direction : null}
              onClick={this.handleSort('variableCosts')}
            >
              Variable Costs
            </Table.HeaderCell>
						<Table.HeaderCell
              sorted={column === 'fixedCosts' ? direction : null}
              onClick={this.handleSort('fixedCosts')}
            >
              Fixed Costs
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ units, profit, revenue, variableCosts, fixedCosts }) => (
            <Table.Row key={units}>
              <Table.Cell>{units}</Table.Cell>
              <Table.Cell>{profit}</Table.Cell>
              <Table.Cell>{revenue}</Table.Cell>
							<Table.Cell>{variableCosts}</Table.Cell>
							<Table.Cell>{fixedCosts}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export default BreakEvenDataTable;