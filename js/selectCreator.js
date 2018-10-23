"use strict";

function getEmptySelectOption() {
    return '<option value="" selected="selected">Select...</option>';
}

function createSelectOption(id, name) {
    return `<option value="${id}">${name}</option>`;
}

function getJobOptionFromObject(value) {
    return createSelectOption(value.beruf_id, value.beruf_name);
}

function getClassOptionFromObject(value) {
    return createSelectOption(value.klasse_id, value.klasse_name);
}

/**
 * Checks if a localStorage item exists and select the corresponding option
 * @param selectId id of the select element
 * @param localStorageKey key of the localStorage item
 */
function selectOptionByIdAndLocalStorageKey(selectId, localStorageKey) {
    let valueFromLocalStorage = localStorage.getItem(localStorageKey);
    if (valueFromLocalStorage !== null) {
        $(selectId).val(valueFromLocalStorage).change();
        //TODO: selection is empty if the stored value isn't present in the list
    } else {
        $(selectId).val('').change();
    }
}