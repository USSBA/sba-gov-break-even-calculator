import React from 'react'
import { Table } from 'semantic-ui-react'
import { sortBy } from 'lodash';

const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Other' },
  { name: 'Ben', age: 70, gender: 'Male' },
]

class BreakEvenDataTable extends React.Component {
	state = {
    column: null,
    data: tableData,
    direction: null,
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
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('name')}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'age' ? direction : null}
              onClick={this.handleSort('age')}
            >
              Age
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'gender' ? direction : null}
              onClick={this.handleSort('gender')}
            >
              Gender
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ age, gender, name }) => (
            <Table.Row key={name}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{age}</Table.Cell>
              <Table.Cell>{gender}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export default BreakEvenDataTable;