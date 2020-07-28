import React from 'react'
import { Table } from 'semantic-ui-react'
import { sortBy } from 'lodash';
import { formatNumber } from '../../../helpers'

class BreakEvenDataTable extends React.Component {
	state = {
    column: null,
    data: this.props.data,
    direction: null,
  }

  handleSort = (clickedColumn) => () => {
		console.log('sorting', clickedColumn)
		console.log(this.state.data)
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

	componentDidMount = () => {
		this.handleSort('units')
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
              <Table.Cell>{formatNumber(units)}</Table.Cell>
              <Table.Cell>{formatNumber(profit)}</Table.Cell>
              <Table.Cell>{formatNumber(revenue)}</Table.Cell>
							<Table.Cell>{formatNumber(variableCosts)}</Table.Cell>
							<Table.Cell>{formatNumber(fixedCosts)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export default BreakEvenDataTable;