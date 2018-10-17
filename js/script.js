"use strict";
$(function () {

    const jobSelectId = '#jobSelect';
    const classSelectId = '#classSelect';
    const cardGroupId = '#cardGroup';

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

    function showAndRefreshJobSelect(data) {
        let options = mapDataToElement(data, getJobOptionFromObject);
        showElementByIdAndRefreshContent(jobSelectId, options, selectContentAppender);
    }

    function showAndRefreshClassSelect(data) {
        let options = mapDataToElement(data, getClassOptionFromObject);
        showElementByIdAndRefreshContent(classSelectId, options, selectContentAppender);
    }

    function showTimeTable(data) {
        console.debug(data);
        let cards = mapDataToElement(data, getCard);
        showElementByIdAndRefreshContent(cardGroupId, cards, cardGroupContentAppender);
    }

    function handleJobSelected() {
        const selectedJobId = this.value;
        console.debug('Selected Job: ', selectedJobId);
        if (selectedJobId !== "") {
            loadClasses(selectedJobId, showAndRefreshClassSelect, function () {
                console.error('Failed to load classes');
            });
            hideElementByIdAndRemoveContent(cardGroupId)
        } else {
            hideElementByIdAndRemoveContent(classSelectId);
            hideElementByIdAndRemoveContent(cardGroupId)
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
            hideElementByIdAndRemoveContent(cardGroupId);
        }
    }

    function init() {
        hideElementByIdAndRemoveContent(classSelectId, 'fast');
        hideElementByIdAndRemoveContent(cardGroupId, 'fast');

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
