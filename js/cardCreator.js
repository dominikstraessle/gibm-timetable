"use strict";

function getFromTo(from, to) {
    return from.substr(0, 5) + '-' + to.substr(0, 5);
}

function getCard(board) {
    return '<div class="card"><div class="card-body">'
        .concat(getCardTitle(board.tafel_longfach))
        .concat(getCardText(getFromTo(board.tafel_von, board.tafel_bis)))
        .concat(getCardText(board.tafel_raum))
        .concat(getCardText(board.tafel_lehrer))
        .concat('</div></div>')
}

function getCardText(text) {
    return `<p class="card-text">${text}</p>`;
}

function getCardTitle(text) {
    return `<h5 class="card-title">${text}</h5>`;
}