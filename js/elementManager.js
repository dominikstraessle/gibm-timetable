"use strict";

function getEmptySelectOption() {
    return '<option value="" selected="selected">Select...</option>';
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

function selectContentAppender(select, options) {
    select.empty();
    $(getEmptySelectOption()).appendTo(select);
    $.each(options, function (i, option) {
        $(option).appendTo(select);
    });
}

function cardGroupContentAppender(cardGroup, cards) {
    cardGroup.empty();
    $.each(cards, function (i, card) {
        $(card).appendTo(cardGroup);
    });
}

function showElementByIdAndRefreshContent(elementId, contentList, contentAppender, length = 500) {
    const element = $(elementId);
    element.show(length);
    contentAppender(element, contentList);
}