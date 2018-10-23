"use strict";
$(function () {
    // only true until @handleValidJobSelected is called the first time
    let startup = true;

    // id's of the html elements
    const jobSelectId = '#jobSelect';
    const classSelectId = '#classSelect';
    const timeTableId = '#timeTable';
    const paginationContainerId = '#paginationContainer';
    const weekSetterActualId = '#weekSetterActual';
    const weekSetterPreviousId = '#weekSetterPrevious';
    const weekSetterNextId = '#weekSetterNext';
    const noDataAlertId = '#noDataAlert';

    // localStorage keys
    const localStorageJobKey = 'jobKey';
    const localStorageClassKey = 'classKey';

    /**
     *
     * @param data data to convert
     * @param getOptionFromObject function which takes an object and returns a converted one
     * @returns converted list
     */
    function mapDataToElement(data, getOptionFromObject) {
        return data
            .map(getOptionFromObject);
    }

    function showAndRefreshJobSelect(data) {
        const options = mapDataToElement(data, getJobOptionFromObject);
        showElementByIdAndRefreshContent(jobSelectId, options, selectContentAppender);
        selectOptionByIdAndLocalStorageKey(jobSelectId, localStorageJobKey);
    }

    function showAndRefreshClassSelect(data) {
        const options = mapDataToElement(data, getClassOptionFromObject);
        showElementByIdAndRefreshContent(classSelectId, options, selectContentAppender);
        selectOptionByIdAndLocalStorageKey(classSelectId, localStorageClassKey);
    }

    function showTimeTable(data) {
        // check if there is data to display
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

    function handleValidJobSelected(selectedJobId) {
        localStorage.setItem(localStorageJobKey, selectedJobId);

        // workaround: if the selected job changes, the stored class should be removed.
        // But at startup this shouldn't happen
        if (startup === false) {
            localStorage.removeItem(localStorageClassKey);
        } else {
            startup = false;
        }

        loadClasses(selectedJobId, showAndRefreshClassSelect, errorPopupWithMessage('Failed to load classes'));
        hideElementByIdAndRemoveContent(timeTableId);
        hideElementById(paginationContainerId);
    }

    function handleInvalidJobSelected() {
        hideElementByIdAndRemoveContent(classSelectId);
        hideElementByIdAndRemoveContent(timeTableId);
        hideElementById(paginationContainerId);
        localStorage.removeItem(localStorageJobKey);
    }

    function handleJobSelected() {
        const selectedJobId = this.value;
        if (selectedJobId !== "") {
            handleValidJobSelected(selectedJobId);
        } else {
            handleInvalidJobSelected();
        }
    }

    function handleClassSelected() {
        const selectedClassId = this.value;
        if (selectedClassId !== '') {
            localStorage.setItem(localStorageClassKey, selectedClassId);
            showTimeTableOfWeek($(weekSetterActualId).text())
        } else {
            localStorage.removeItem(localStorageClassKey);
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
            // subtract one week
            let previousWeek = moment($(weekSetterActualId).text(), 'ww-YYYY').subtract(1, 'w');

            $(weekSetterActualId).text(moment(previousWeek).format('ww-YYYY'));
            showTimeTableOfWeek(moment(previousWeek).format('ww-YYYY'));
        });
        $(weekSetterNextId).on('click', function () {
            // add one week
            let nextWeek = moment($(weekSetterActualId).text(), 'ww-YYYY').add(1, 'w');

            $(weekSetterActualId).text(moment(nextWeek).format('ww-YYYY'));
            showTimeTableOfWeek(moment(nextWeek).format('ww-YYYY'));
        })
    }

    function initElements() {
        // set the actual ww-YYYY as text of the actual week
        $(weekSetterActualId).text(moment().format('ww-YYYY'));

        hideElementByIdAndRemoveContent(classSelectId, 'fast');
        hideElementByIdAndRemoveContent(timeTableId, 'fast');
        hideElementById(paginationContainerId, 'fast');
        hideElementById(noDataAlertId, 'fast');
    }

    function init() {
        initElements();
        initListeners();

        loadJobs(showAndRefreshJobSelect, errorPopupWithMessage('Failed to load jobs'));
    }

    init();


});
