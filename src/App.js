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
import { makeStyles } from '@material-ui/core/styles';
import fetchJSON from 'fetch_json';

const URL = 'https://thingproxy.freeboard.io/fetch/https://github.com/solita/dev-academy-2021/raw/main/names.json';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(4)
    },
    textAlign: 'center',
  },
}));

export default () => {
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
    <div className={classes.root}>
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
          <TableHeaderRow showSortingControls />
          <TableSummaryRow />
          <Toolbar />
          <SearchPanel />
        </Grid>
      </Paper>
    </div>
  );
};
