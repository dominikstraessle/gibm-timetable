"use strict";
$(function () {

    const jobSelectId = '#jobSelect';
    const classSelectId = '#classSelect';
    const cardGroupId = '#cardGroup';
    const localStorageJobKey = 'jobKey';
    const localStorageClassKey = 'classKey';

    function getJobOptionFromObject(value) {
        return createSelectOption(value.beruf_id, value.beruf_name);
    }

    function getClassOptionFromObject(value) {
        return createSelectOption(value.klasse_id, value.klasse_name);
    }

    function mapDataToElement(data, getOptionFromObject) {
        return data
            .map(getOptionFromObject);
    }

    function selectOptionByIdAndLocalStorageKey(selectId, localStorageKey) {
        let valueFromLocalStorage = localStorage.getItem(localStorageKey);
        if (valueFromLocalStorage !== null) {
            $(selectId).val(valueFromLocalStorage).change();
        }
    }

    function showAndRefreshJobSelect(data) {
        let options = mapDataToElement(data, getJobOptionFromObject);
        showElementByIdAndRefreshContent(jobSelectId, options, selectContentAppender);
        selectOptionByIdAndLocalStorageKey(jobSelectId, localStorageJobKey);
    }

    function showAndRefreshClassSelect(data) {
        let options = mapDataToElement(data, getClassOptionFromObject);
        showElementByIdAndRefreshContent(classSelectId, options, selectContentAppender);
        selectOptionByIdAndLocalStorageKey(classSelectId, localStorageClassKey);

    }

    function showTimeTableCards(data) {
        let cards = mapDataToElement(data, getCard);
        showElementByIdAndRefreshContent(cardGroupId, cards, cardGroupContentAppender);
    }

    function handleJobSelected() {
        const selectedJobId = this.value;
        if (selectedJobId !== "") {
            localStorage.setItem(localStorageJobKey, selectedJobId);
            loadClasses(selectedJobId, showAndRefreshClassSelect, function () {
                console.error('Failed to load classes');
            });
            hideElementByIdAndRemoveContent(cardGroupId)
        } else {
            hideElementByIdAndRemoveContent(classSelectId);
            hideElementByIdAndRemoveContent(cardGroupId);
            localStorage.removeItem(localStorageJobKey);
        }
    }

    function handleClassSelected() {
        const selectedClassId = this.value;
        if (selectedClassId !== '') {
            localStorage.setItem(localStorageClassKey, selectedClassId);
            loadTimeTable(selectedClassId, showTimeTableCards, function () {
                console.error('Failed to load classes');
            });
        } else {
            hideElementByIdAndRemoveContent(cardGroupId);
            localStorage.removeItem(localStorageClassKey);
        }
    }

    function initListeners() {
        $(jobSelectId).on('change', function () {
            handleJobSelected.call(this);
        });
        $(classSelectId).on('change', function () {
            handleClassSelected.call(this);
        });
    }

    function init() {
        hideElementByIdAndRemoveContent(classSelectId, 'fast');
        hideElementByIdAndRemoveContent(cardGroupId, 'fast');
        initListeners();

        loadJobs(showAndRefreshJobSelect, function () {
            console.error('Failed to load jobs');
        });
    }

    init();


});
