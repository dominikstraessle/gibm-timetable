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
            <th scope="row">${moment(rowData.tafel_datum).format('DD.MM.YYYY')}</th>
            <td>${moment(rowData.tafel_datum).day(rowData.tafel_wochentag).format('dddd')}</td>
            <td>${moment(rowData.tafel_von, "HH:mm:ss").format("HH:mm")}</td>
            <td>${moment(rowData.tafel_bis, "HH:mm:ss").format("HH:mm")}</td>
            <td>${rowData.tafel_lehrer}</td>
            <td>${rowData.tafel_longfach}</td>
            <td>${rowData.tafel_raum}</td>
        </tr>`;
}