// Function to fetch data from Yahoo Finance API
async function fetchData(symbol) {
    const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
    const data = await response.json();
    return data;
}

// Function to populate table with data
async function populateTable() {
    const stocks = ['IGR', 'AWO', 'NRO', 'CLM'];
    const tableBody = document.querySelector('#stockTable tbody');
    tableBody.innerHTML = '';

    for (const symbol of stocks) {
        const stockData = await fetchData(symbol);
        const exDivDate = new Date(stockData.quoteResponse.result[0].exDividendDate * 1000).toDateString();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${symbol}</td>
            <td>${exDivDate}</td>
        `;
        tableBody.appendChild(row);
    }
}

// Function to sort table by column index
function sortTable(colIndex) {
    const table = document.querySelector('#stockTable');
    const rows = Array.from(table.rows);
    const sortedRows = rows.slice(1).sort((a, b) => {
        const aValue = a.cells[colIndex].textContent;
        const bValue = b.cells[colIndex].textContent;
        return aValue.localeCompare(bValue);
    });
    table.tBodies[0].append(...sortedRows);
}

// Function to filter table rows based on search input
function filterTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('stockTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td')[0];
        if (cells) {
            const txtValue = cells.textContent || cells.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Populate table on page load
window.onload = async function () {
    await populateTable();
};