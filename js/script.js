"use strict";
$(function () {

    const jobSelectId = '#jobSelect';
    const classSelectId = '#classSelect';
    const timeTableId = '#timeTable';
    const paginationContainerId = '#paginationContainer';
    const weekSetterActualId = '#weekSetterActual';
    const weekSetterPreviousId = '#weekSetterPrevious';
    const weekSetterNextId = '#weekSetterNext';
    const noDataAlertId = '#noDataAlert';

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
        if (data.length > 0) {
            hideElementById(noDataAlertId);
            showElementByIdAndRefreshContent(timeTableId, data, tableContentAppender);
            showElementById(paginationContainerId, 300);
        } else {
            showElementById(paginationContainerId, 300);
            showElementById(noDataAlertId);
        }
    }

    function showTimeTableOfWeek(weekAndYear) {

        $(weekSetterActualId).text(weekAndYear);

        hideElementByIdAndRemoveContent(timeTableId);
        hideElementById(paginationContainerId, 300);

        let selectedClass = $(classSelectId).val();
        loadTimeTable(selectedClass, weekAndYear, showTimeTable, errorPopupWithMessage('Failed to load timetable'));
    }

    function errorPopupWithMessage(message) {
        return function () {
            alert(message);
        }
    }

    function handleJobSelected() {
        const selectedJobId = this.value;
        if (selectedJobId !== "") {
            //TODO: outsource the bodys to methods -> handleValidJobSelected / handleInvalidJobSelected
            localStorage.setItem(localStorageJobKey, selectedJobId);
            loadClasses(selectedJobId, showAndRefreshClassSelect, errorPopupWithMessage('Failed to load classes'));
            hideElementByIdAndRemoveContent(timeTableId);
            hideElementById(paginationContainerId);
            selectOptionByIdAndLocalStorageKey(classSelectId, localStorageClassKey);
        } else {
            hideElementByIdAndRemoveContent(classSelectId);
            hideElementByIdAndRemoveContent(timeTableId);
            hideElementById(paginationContainerId);
            localStorage.removeItem(localStorageJobKey);
            selectOptionByIdAndLocalStorageKey(classSelectId, localStorageClassKey);
        }
    }

    function handleClassSelected() {
        const selectedClassId = this.value;
        if (selectedClassId !== '') {
            localStorage.setItem(localStorageClassKey, selectedClassId);
            showTimeTableOfWeek($(weekSetterActualId).text())
        } else {
            hideElementByIdAndRemoveContent(timeTableId);
            hideElementById(paginationContainerId);
        }
    }

    function initListeners() {
        $(jobSelectId).on('change', function () {
            handleJobSelected.call(this);
        });
        $(classSelectId).on('change', function () {
            handleClassSelected.call(this);
        });

        $(weekSetterPreviousId).on('click', function () {
            let previousWeek = moment($(weekSetterActualId).text(), 'ww-YYYY').subtract(1, 'w');
            console.log(moment(previousWeek).format('ww-YYYY'));
            $(weekSetterActualId).text(moment(previousWeek).format('ww-YYYY'));
            showTimeTableOfWeek(moment(previousWeek).format('ww-YYYY'));
        });
        $(weekSetterNextId).on('click', function () {
            let nextWeek = moment($(weekSetterActualId).text(), 'ww-YYYY').add(1, 'w');
            console.log(moment(nextWeek).format('ww-YYYY'));
            $(weekSetterActualId).text(moment(nextWeek).format('ww-YYYY'));
            showTimeTableOfWeek(moment(nextWeek).format('ww-YYYY'));
        })
    }

    function init() {
        $(weekSetterActualId).text(moment().format('ww-YYYY'));
        hideElementByIdAndRemoveContent(classSelectId, 'fast');
        hideElementByIdAndRemoveContent(timeTableId, 'fast');
        hideElementById(paginationContainerId, 'fast');
        hideElementById(noDataAlertId, 'fast');
        initListeners();

        loadJobs(showAndRefreshJobSelect, errorPopupWithMessage('Failed to load jobs'));
    }

    init();


});
