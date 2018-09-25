"use strict";

function onJobsLoadDone() {
    console.log('onJobsLoadDone');
}

function onJobsLoaded(data) {
    console.log('onJobsoaded');
}

function onJobsLoadFailed() {
    console.log('onJobsLoadFailed');
}

function loadJobs() {
    $.getJSON(
        'http://sandbox.gibm.ch/berufe.php',
        onJobsLoaded
    )
        .fail(onJobsLoadFailed)
        .done(onJobsLoadDone);
}

function onClassesLoadDone() {
    console.log('onClassesLoadDone');
}

function onClassesLoaded(data) {
    console.log('onClassesLoaded');
}

function onClassesLoadFailed() {
    console.log('onClassesLoadFailed');
}

function loadClasses(jobId) {
    $.getJSON(
        `http://sandbox.gibm.ch/klassen.php?beruf_id=${jobId}`,
        onClassesLoaded
    )
        .fail(onClassesLoadFailed)
        .done(onClassesLoadDone)
}

loadJobs();
loadClasses(10);
