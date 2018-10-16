"use strict";

function getEmptySelectOption() {
    return '<option value="" selected="selected">Select Job...</option>';
}

function createSelectOption(id, name) {
    return `<option value="${id}">${name}</option>`;
}

function hideElementByIdAndRemoveContent(elementId, type = 'slow') {
    console.log('Hide: ', elementId);
    const element = $(elementId);
    element.hide(type);
    element.empty();
}

function refreshSelectWithNewOptions(select, options) {
    select.empty();
    $(getEmptySelectOption()).appendTo(select);
    $.each(options, function (i, option) {
        console.debug(option);
        $(option).appendTo(select);
    });
}

function showSelectByIdAndRefreshOptions(selectId, options, length = 500) {
    console.log('Show: ', selectId);
    const select = $(selectId);
    select.show(length);
    refreshSelectWithNewOptions(select, options);
}