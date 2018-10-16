"use strict";
$(function () {

    const jobSelectId = '#jobSelect';
    const classSelectId = '#classSelect';
    const timeTableId = '#timeTable';

    function getJobOptionFromObject(value) {
        return createSelectOption(value.beruf_id, value.beruf_name);
    }

    function getClassOptionFromObject(value) {
        return createSelectOption(value.klasse_id, value.klasse_name);
    }

    function mapDataToOption(data, getOptionFromObject) {
        return data
            .map(getOptionFromObject);
    }

    function showAndRefreshJobSelect(data) {
        let options = mapDataToOption(data, getJobOptionFromObject);
        showSelectByIdAndRefreshOptions(jobSelectId, options);
    }

    function showAndRefreshClassSelect(data) {
        let options = mapDataToOption(data, getClassOptionFromObject);
        showSelectByIdAndRefreshOptions(classSelectId, options);
    }

    function handleJobSelected() {
        const selectedJobId = this.value;
        console.debug('Selected Job: ', selectedJobId);
        if (selectedJobId !== "") {
            loadClasses(selectedJobId, showAndRefreshClassSelect, function () {
                console.error('Failed to load classes');
            });
        } else {
            hideElementByIdAndRemoveContent(classSelectId);
        }
    }

    function handleClassSelected() {
        const selectedClassId = this.value;
        console.debug('Selected Class: ', selectedClassId);
        if (selectedClassId !== '') {
            loadTimeTable(selectedClassId, showTimeTable, function () {
                console.error('Failed to load classes');
            });
        } else {
            hideElementByIdAndRemoveContent(timeTableId);
        }
    }

    function init() {
        hideElementByIdAndRemoveContent(classSelectId, 'fast');

        loadJobs(showAndRefreshJobSelect, function () {
            console.error('Failed to load jobs');
        });

        $(jobSelectId).on('change', function () {
            handleJobSelected.call(this);
        });

        $(classSelectId).on('change', function () {
            handleClassSelected.call(this);
        })
    }

    init();


});
