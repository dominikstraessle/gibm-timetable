"use strict";

function getTableContent(data) {
    return getTableHeader()
        .concat(getTableBody(data));
}

function getTableHeader() {
    return `<thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Day</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Teacher</th>
            <th scope="col">Subject</th>
            <th scope="col">Room</th>
        </tr>
        </thead>`;
}

function getTableBody(data) {
    return '<tbody>'
        .concat(data
            .map(getTableRow)
            .join(''))
        .concat('</tbody>');
}

function getTableRow(rowData) {
    return `<tr>
            <th scope="row">${rowData.tafel_datum}</th>
            <td>${rowData.tafel_wochentag}</td>
            <td>${rowData.tafel_von}</td>
            <td>${rowData.tafel_bis}</td>
            <td>${rowData.tafel_lehrer}</td>
            <td>${rowData.tafel_fach}</td>
            <td>${rowData.tafel_raum}</td>
        </tr>`;
}