"use strict";

function createSelectElement(id, options) {
    return `<select class="form-control">${options}</select>`;
}

function createSelectOption(id, name) {
    return `<option value="${id}">${name}</option>`;
}

function handleJobs(data) {
    let options = [];
    $.each(data, function (jobs, job) {
        options.push(createSelectOption(job.beruf_id, job.beruf_name));
    });

    $('#selects').append(createSelectElement('jobsSelect', options));
}

loadJobs(handleJobs, function () {
    console.log('failed');
});