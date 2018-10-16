"use strict";
$(function () {

    const jobSelectId = '#jobSelect';
    const classSelectId = '#classSelect';
    const timeTableId = '#timeTable';

    function mapJobDataToSelectOptions(data) {
        return data
            .map(value => createSelectOption(value.beruf_id, value.beruf_name))
    }

    function mapClassDataToSelectOptions(data) {
        return data
            .map(value => createSelectOption(value.klasse_id, value.klasse_name))
    }

    function showAndRefreshJobSelect(data) {
        let options = mapJobDataToSelectOptions(data);
        showSelectByIdAndRefreshOptions(jobSelectId, options);
    }

    function showAndRefreshClassSelect(data) {
        let options = mapClassDataToSelectOptions(data);
        showSelectByIdAndRefreshOptions(classSelectId, options);
    }

    function init() {
        hideElementByIdAndRemoveContent(classSelectId, 'fast');

        loadJobs(showAndRefreshJobSelect, function () {
            console.log('failed to load jobs');
        });

        $(jobSelectId).on('change', function () {
            const selectedJobId = this.value;
            console.debug('Selected Job: ', selectedJobId);
            if (selectedJobId !== "") {
                loadClasses(selectedJobId, showAndRefreshClassSelect, function () {
                    console.log('failed to load classes');
                });
            } else {
                hideElementByIdAndRemoveContent(classSelectId);
            }
        });

        $(classSelectId).on('change', function () {
            const selectedClassId = this.value;
            console.debug('Selected Class: ', selectedClassId);
            if (selectedClassId !== '') {
                loadTimeTable(selectedClassId, showTimeTable, function () {
                    console.error('Failed to load classes');
                });
            } else {
                hideElementByIdAndRemoveContent(timeTableId);
            }
        })
    }

    init();


});
