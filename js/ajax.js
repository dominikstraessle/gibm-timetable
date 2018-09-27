"use strict";

loadJobs(onJobsLoaded, onJobsLoadFailed, onJobsLoadDone);
loadClasses(10, onClassesLoaded, onClassesLoadFailed, onClassesLoadDone);

function onJobsLoadDone() {
    console.log('onJobsLoadDone');
}

function onJobsLoaded(data) {
    console.log('onJobsoaded: ', data);
}

function onJobsLoadFailed() {
    console.log('onJobsLoadFailed');
}

function loadJobs(onLoaded, onFailed, onDone = function () {
}) {
    $.getJSON(
        'http://sandbox.gibm.ch/berufe.php',
        onLoaded
    )
        .fail(onFailed)
        .done(onDone);
}

function onClassesLoadDone() {
    console.log('onClassesLoadDone');
}

function onClassesLoaded(data) {
    console.log('onClassesLoaded: ', data);
}

function onClassesLoadFailed() {
    console.log('onClassesLoadFailed');
}

function loadClasses(jobId, onLoaded, onFailed, onDone = function () {
}) {
    $.getJSON(
        `http://sandbox.gibm.ch/klassen.php?beruf_id=${jobId}`,
        onLoaded
    )
        .fail(onFailed)
        .done(onDone);
}
