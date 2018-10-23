"use strict";

function hideElementByIdAndRemoveContent(elementId, type = 'slow') {
    console.log('Hide: ', elementId);
    const element = $(elementId);
    element.hide(type);
    element.empty();
}

function hideElementById(elementId, mode = 'slow') {
    $(elementId).hide(mode);
}

function selectContentAppender(select, options) {
    select.empty();
    $(getEmptySelectOption()).appendTo(select);
    $.each(options, function (i, option) {
        $(option).appendTo(select);
    });
}

/**
 * Converts the data into table rows and appends them to the existing table
 * @param table
 * @param data JSON-Response of a timetable request
 */
function tableContentAppender(table, data) {
    table.empty();
    $(getTableContent(data)).appendTo(table);
}

function showElementById(elementId, length = 500) {
    $(elementId).show(length);
}

/**
 * Shows an element and refreshs its content
 * @param elementId element to show
 * @param data Data to use in the @contentAppender
 * @param contentAppender converts @data and appends the data to the @elementId
 * @param length length of the animation
 */
function showElementByIdAndRefreshContent(elementId, data, contentAppender, length = 500) {
    const element = $(elementId);
    element.show(length);
    contentAppender(element, data);
}

/**
 * Show a javascript alert with a given message
 * @param message message to show
 * @returns {Function}
 */
function errorPopupWithMessage(message) {
    return function () {
        alert(message);
    }
}