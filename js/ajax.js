"use strict";

/**
 * Load all jobs
 * @param onLoaded called when request was successful
 * @param onFailed called when request failed
 * @param onDone called every time at the end. Default does nothing.
 */
function loadJobs(onLoaded, onFailed, onDone = function () {
}) {
    $.getJSON(
        'http://sandbox.gibm.ch/berufe.php',
        onLoaded
    )
        .fail(onFailed)
        .done(onDone);
}

/**
 * Load classes of a given job
 * @param jobId get classes of this job
 * @param onLoaded called when request was successful
 * @param onFailed called when request failed
 * @param onDone called every time at the end. Default does nothing.
 */
function loadClasses(jobId, onLoaded, onFailed, onDone = function () {
}) {
    $.getJSON(
        `http://sandbox.gibm.ch/klassen.php?beruf_id=${jobId}`,
        onLoaded
    )
        .fail(onFailed)
        .done(onDone);
}

/**
 * Load the timetable of a given class
 * @param classId get timetable of this class
 * @param onLoaded called when request was successful
 * @param onFailed called when request failed
 * @param onDone called every time at the end. Default does nothing.
 */
function loadTimeTable(classId, weekAndYear, onLoaded, onFailed, onDone = function () {
}) {
    $.getJSON(
        `http://sandbox.gibm.ch/tafel.php?klasse_id=${classId}&woche=${weekAndYear}`,
        onLoaded
    )
        .fail(onFailed)
        .done(onDone);
}