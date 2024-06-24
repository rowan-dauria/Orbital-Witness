import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

async function fetchUsageData() {
  const response = await fetch('/usage',
    {accept: 'application/json'}
  );
  const data = await response.json();
  return data.usage;
}
// For sorting, read the sorting criteria from the URL query string
// The sorting criteria form part of the App state because the app should re-render when the sorting criteria change
// Alter sort algorithm based on sorting criteria

function getSortingCriteria() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    sortDatetime: urlParams.get('sortDatetime'), // asc, desc
    sortReport: urlParams.get('sortReport'), // asc, desc
    primarySort: urlParams.get('primarySort'), // sortReport, otherwise priorise sortDatetime
  }
}

function sortAlgForCriteria({ sortDatetime, sortReport, primarySort}) {
  const datetimeSortNumber = sortDatetime === 'asc' ? 1 : sortDatetime === 'desc' ? -1 : 0;
  const reportSortNumber = sortReport === 'asc' ? 1 : sortReport === 'desc' ? -1 : 0;

  // ISO date strings are lexigraphically sortable
  // This could be optimised to avoid needless comparisons
  return (usageData1, usageData2) => {
    const datetimeSort = (usageData1.timestamp.localeCompare(usageData2.timestamp)) * datetimeSortNumber;

    // I would add some logic here to return 
    const report_name1 = usageData1?.report_name ? usageData1.report_name : '';
    const report_name2 = usageData2?.report_name ? usageData2.report_name : '';

    let reportSort

    // Logic to ensure empty report names are sorted to the end
    if (report_name1 === '' && report_name2 !== '') {
      reportSort =  1;
    } else if (report_name1 !== '' && report_name2 === '') {
      reportSort = -1;
    } else  reportSort = (report_name1.localeCompare(report_name2)) * reportSortNumber;

    // This is needed because the most recently sorted column should have sorting priority
    // Defaults to sorting by datetime if no sorting order is provided
    if (primarySort === 'sortReport') {
      return reportSort || datetimeSort;
    } else {
      return datetimeSort || reportSort;
    }
  }
}


// Outout date and time in format: dd-mm-yyyy hh:mm in locale time
function dateFormatter(timestamp) {
  const date = new Date(timestamp);
  const toLocaleString = date.toLocaleString();
  const formatted = toLocaleString.slice(0, 2)
    + '-'
    + toLocaleString.slice(3, 5)
    + '-'
    + toLocaleString.slice(6, 10)
    + ' '
    + toLocaleString.slice(12, 17);
  return formatted;
}

const getBrowserLocale = () => Intl.DateTimeFormat().resolvedOptions().timeZone

function App() {
  const [usageData, setUsageData] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState(getSortingCriteria());

  useEffect(() => {
    if (!(usageData.length)) {
      fetchUsageData().then(data => 
        setUsageData(data.sort(sortAlgForCriteria(sortingCriteria))))
    }
  }, [usageData]);
  return (
    <div className="App">
      <Table usageData={usageData} />
    </div>
  );
}

// With more time, I would like to chunk the response to avoid loading too many rows at once
function Table({ usageData }) {
  return (
    <table className="Table">
      <thead>
        <tr>
          <th>Message ID</th>
          <th>Timestamp {getBrowserLocale()}</th>
          <th>Report Name</th>
          <th>Credits Used</th>
        </tr>
      </thead>
      <tbody>
        {usageData.map((message, index) => {
          // This allows the credits to be displayed with two decimal places
          const decimalPlaces = 2
          const credits = Number(Math.round(parseFloat(message.credits_used + 'e' + decimalPlaces))
            + 'e-' + decimalPlaces).toFixed(decimalPlaces)

          return (<tr key={index} className="TableRow">
            <td>{message.id}</td>
            <td>{dateFormatter(message.timestamp)}</td>
            <td>{message?.report_name}</td>
            <td>{credits}</td>
          </tr>)
        })}
      </tbody>
    </table>
  );
}

export default App;