"use strict";
$(function () {

    const jobSelectId = '#jobSelect';
    const classSelectId = '#classSelect';
    const timeTableId = '#timeTable';
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
        } else {
            console.log('Set to empty:', selectId);
            $(selectId).val('').change();
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

    function showTimeTable(data) {
        showElementByIdAndRefreshContent(timeTableId, data, tableContentAppender)
    }

    function handleJobSelected() {
        const selectedJobId = this.value;
        if (selectedJobId !== "") {
            //TODO: outsource the bodys to methods -> handleValidJobSelected / handleInvalidJobSelected
            localStorage.setItem(localStorageJobKey, selectedJobId);
            localStorage.removeItem(localStorageClassKey);
            loadClasses(selectedJobId, showAndRefreshClassSelect, function () {
                //TODO: show a pop-up with the error and log it as error: create a function with text as parameter
                console.error('Failed to load classes');
            });
            selectOptionByIdAndLocalStorageKey(classSelectId, localStorageClassKey);
            hideElementByIdAndRemoveContent(timeTableId);
        } else {
            hideElementByIdAndRemoveContent(classSelectId);
            hideElementByIdAndRemoveContent(timeTableId);
            localStorage.removeItem(localStorageJobKey);
            selectOptionByIdAndLocalStorageKey(classSelectId, localStorageClassKey);
        }
    }

    function handleClassSelected() {
        const selectedClassId = this.value;
        if (selectedClassId !== '') {
            localStorage.setItem(localStorageClassKey, selectedClassId);
            loadTimeTable(selectedClassId, showTimeTable, function () {
                console.error('Failed to load classes');
            });
        } else {
            hideElementByIdAndRemoveContent(timeTableId);
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
        hideElementByIdAndRemoveContent(timeTableId, 'fast');
        initListeners();

        loadJobs(showAndRefreshJobSelect, function () {
            console.error('Failed to load jobs');
        });
    }

    init();


});
