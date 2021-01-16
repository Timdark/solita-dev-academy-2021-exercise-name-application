import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SummaryState,
  IntegratedSummary,
  SortingState,
  IntegratedSorting,
  SearchState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import fetchJSON from 'fetch_json';

const URL = 'https://thingproxy.freeboard.io/fetch/https://github.com/solita/dev-academy-2021/raw/main/names.json';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: '40px',
    },
    textAlign: 'center',
  },
});

const TableHeaderContentBase = ({
  column,
  children,
  classes,
  ...restProps
}) => (
  <TableHeaderRow.Content
    column={column}
    {...restProps}
    style={{ color: 'black', fontSize: '14px', fontWeight: 'bold' }}
  >
    {children}
  </TableHeaderRow.Content>
);

export const TableHeaderContent = withStyles(useStyles, {
  name: 'TableHeaderContent',
})(TableHeaderContentBase);

const TableHeaderRowBase = ({ children, classes, ...restProps }) => (
  <TableHeaderRow.Row style={{ backgroundColor: '#D0DDE0' }}>
    {children}
  </TableHeaderRow.Row>
);

export const TableHeaderRowStyle = withStyles(useStyles, {
  name: 'TableHeaderRow',
})(TableHeaderRowBase);


function App(props) {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'amount', title: 'Amount' },
  ]);
  const [rows, setRows] = useState([]);
  const [sorting, setSorting] = useState([{ columnName: 'amount', direction: 'desc' }]);
  const [totalSummaryItems] = useState([
    { columnName: 'name', type: 'count' },
    { columnName: 'amount', type: 'sum' },
  ]);
  const [searchValue, setSearchState] = useState();

  const classes = useStyles();

  const loadData = () => {
      fetchJSON(URL)
        .then(data => {
          setRows(data.names);
        })
  };

  useEffect(() => loadData());

  return (
    <div className={props.classes.root}>
      <Paper elevation={3}>
        <h1>Solita dev academy 2021 exercise - name application</h1>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SearchState
            value={searchValue}
            onValueChange={setSearchState}
          />
          <SortingState
            sorting={sorting}
            onSortingChange={setSorting}
          />
          <SummaryState
            totalItems={totalSummaryItems}
          />
          <IntegratedSummary />
          <IntegratedSorting />
          <IntegratedFiltering />
          <Table />
          <TableHeaderRow 
            showSortingControls 
            contentComponent={TableHeaderContent}
            rowComponent={TableHeaderRowStyle}
          />
          <TableSummaryRow />
          <Toolbar />
          <SearchPanel />
        </Grid>
      </Paper>
    </div>
  );
};

export default withStyles(useStyles)(App);