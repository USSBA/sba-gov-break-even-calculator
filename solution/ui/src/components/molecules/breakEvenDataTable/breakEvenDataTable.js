import React from 'react'
import { Card, Responsive, Table } from 'semantic-ui-react'
import { sortBy } from 'lodash';
import { formatNumber } from '../../../helpers'

import './breakEvenDataTable.less'

class BreakEvenDataTable extends React.Component {
	state = {
    column: null,
    direction: null,
  }

  handleSort = (clickedColumn) => () => {
    const { column, direction } = this.state
    const { data } = this.props

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
    const { column, direction } = this.state
    const { data } = this.props
    const uniqueKey = () => {
      if(isNaN(data.units)) {
        return `${data[1].units}-${data[1].profit}-${data[1].revenue}-${data[1].variableCosts}-${data[1].fixedCosts}`
      }
      return `${Math.floor(Math.random() * 100)}`;
    }

    return (
      <Card fluid>
        <Card.Content>
          <h3>Break-Even Point Unit Sales</h3>
          <Table id='bep-dataTable' textAlign='right' sortable fixed unstackable>
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
                  Profit
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
            <Table.Body key={uniqueKey()}>
              {data.map(({ units, profit, revenue, variableCosts, fixedCosts }) => (
                <Table.Row key={`${profit}-${revenue}-${variableCosts}`}>
                  <Table.Cell>
                    {formatNumber(units)}
                  </Table.Cell>
                  <Table.Cell className={profit < 0 ? 'netLoss' : 'netGain'}>
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
        </Card.Content>
      </Card>
    )
  }
}

export default BreakEvenDataTable;