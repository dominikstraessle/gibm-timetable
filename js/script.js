"use strict";
$(function () {

    const jobSelectId = '#jobSelect';
    const classSelectId = '#classSelect';
    const timeTableId = '#timeTable';
    const paginationId = '#pagination';
    const weekSetterActualId = '#weekSetterActual';
    const weekSetterPreviousId = '#weekSetterPrevious';
    const weekSetterNextId = '#weekSetterNext';

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

    function showTimeTableOfWeek(weekAndYear) {

        $(weekSetterActualId).text(weekAndYear);

        hideElementByIdAndRemoveContent(timeTableId);

        let selectedClass = $(classSelectId).val();
        loadTimeTable(selectedClass, weekAndYear, showTimeTable, function () {
            console.error("Failed to load timetable");
        });
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
            hideElementByIdAndRemoveContent(timeTableId);
            hideElementById(paginationId, 'fast');
            selectOptionByIdAndLocalStorageKey(classSelectId, localStorageClassKey);
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
            showTimeTableOfWeek($(weekSetterActualId).text())
        } else {
            hideElementByIdAndRemoveContent(timeTableId);
            hideElementById(paginationId, 'fast');
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
        hideElementById(paginationId, 'fast');
        initListeners();

        loadJobs(showAndRefreshJobSelect, function () {
            console.error('Failed to load jobs');
        });
    }

    init();


});
