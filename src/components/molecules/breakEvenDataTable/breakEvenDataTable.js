import React from 'react'
import { Responsive, Table } from 'semantic-ui-react'
import { sortBy } from 'lodash';
import { formatNumber } from '../../../helpers'

import './BreakEvenDataTable.less'

class BreakEvenDataTable extends React.Component {
	state = {
    column: null,
    data: this.props.data,
    direction: null,
  }

  handleSort = (clickedColumn) => () => {
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

	formatProfitOrLoss = (profit) => {
		if (profit >= 0) return `$${formatNumber(profit)}`
		return `(${formatNumber(Math.abs(profit))})`
	}

  render() {
    const { column, data, direction } = this.state

    return (
      <Table id='bep-dataTable' sortable celled fixed unstackable>
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
						<Responsive as={Table.HeaderCell} minWidth={Responsive.onlyLargeScreen.minWidth}
              sorted={column === 'variableCosts' ? direction : null}
              onClick={this.handleSort('variableCosts')}
            >
              Variable Costs
            </Responsive>
						<Responsive as={Table.HeaderCell} minWidth={Responsive.onlyLargeScreen.minWidth}
              sorted={column === 'fixedCosts' ? direction : null}
              onClick={this.handleSort('fixedCosts')}
            >
              Fixed Costs
            </Responsive>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ units, profit, revenue, variableCosts, fixedCosts }) => (
            <Table.Row key={units}>
              <Table.Cell>
								{formatNumber(units)}
							</Table.Cell>
              <Table.Cell className={profit < 0 ? 'netLoss' : ''}>
								{this.formatProfitOrLoss(profit)}
							</Table.Cell>
              <Table.Cell>
								${formatNumber(revenue)}
							</Table.Cell>
							<Responsive as={Table.Cell} minWidth={Responsive.onlyLargeScreen.minWidth}>
								${formatNumber(variableCosts)}
							</Responsive>
							<Responsive as={Table.Cell} minWidth={Responsive.onlyLargeScreen.minWidth}>
								${formatNumber(fixedCosts)}
							</Responsive>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export default BreakEvenDataTable;