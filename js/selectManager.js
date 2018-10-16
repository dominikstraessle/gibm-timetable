"use strict";

function createSelectElement(id, options) {
    return `<select id="${id}" class="form-control">${options}</select>`;
}

function createSelectOption(id, name) {
    return `<option value="${id}">${name}</option>`;
}

function removeSelectByIdIfPresent(selectId) {
    const selectElement = $(`#${selectId}`);
    if (selectElement.length) {
        selectElement.remove();
    }
}

function addSelectWithIdAndOptions(selectId, options) {
    removeSelectByIdIfPresent(selectId);
    $('#selects').append(createSelectElement(selectId, options));
}