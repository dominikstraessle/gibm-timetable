"use strict";
$(function () {

    const jobsSelectId = 'jobsSelect';
    const classesSelectId = 'classesSelect';

    function mapJobDataToSelectOptions(data) {
        return data
            .map(value => createSelectOption(value.beruf_id, value.beruf_name))
    }

    function createOrRefreshJobsSelect(data) {
        let options = mapJobDataToSelectOptions(data);

        addSelectWithIdAndOptions(jobsSelectId, options);
    }

    loadJobs(createOrRefreshJobsSelect, function () {
        console.log('failed');
    });

    $(jobsSelectId).on('change', function () {
        const selectedJobId = this.value;
        if (selectedJobId !== "") {
            // loadClasses()
        }
    })
});
