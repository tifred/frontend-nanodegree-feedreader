// feedreader.js

// Two global vars used to test that new entries and titles are loaded.

var globalFirstFeedEntryText;
var globalTitle;

$(function() {

    // Test that initial data in model is valid.

    describe('RSS Feeds', function() {

        it('are neither blank nor undefined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a URL that is neither blank nor undefined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        it('have a name that is neither blank nor undefined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    // Test that menu is hidden and visible at the right times.

    describe('The Menu', function() {

        var menuLink = $('.menu-icon-link');
        var menuHidden;

        it('is hidden at load time', function() {
            menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
        });

        // Note that menuHidden must be re-evaluated after each click.

        it('toggles between shown and hidden when menu icon is clicked', function() {
            menuLink.trigger('click');
            menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).not.toBe(true);

            menuLink.trigger('click');
            menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
        });
    });

    // Test that entries and title have real content on initial page load.

    describe('Initial Entries', function() {

        // Note that loadFeed is an async function. Must use "done" here.

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('will return at least one entry that is neither blank nor undefined', function() {
            var entryCount = $('.feed .entry-link .entry').length
            var firstFeedEntryText = $('.feed a:first h2').text();

            // Save value to global var for comparison later in "New Feed Selection".

            globalFirstFeedEntryText = firstFeedEntryText;

            expect(entryCount).toBeGreaterThan(0);
            expect(firstFeedEntryText).toBeDefined();
            expect(firstFeedEntryText).not.toBe('');
        });

        it('will return a title for the header that is neither blank nor undefined', function() {
            var title = $('.header-title').text();

            // Save value to global var for comparison in "New Feed Selection".

            globalTitle = title;

            expect(title).toBeDefined();
            expect(title).not.toBe('');
        });
    });

    // Test that entries and title have different content when loadFeed runs again.

    describe('New Feed Selection', function() {

        /*
            Note that loadFeed is an async function. Must use "done" here.
            Initial loadFeed uses 0, so use 2 this time.
        */

        beforeEach(function(done) {
            loadFeed(2, done);
        });

        it('will load new content that is neither blank nor undefined', function(done) {
            var currentFeedEntryText = $('.feed a:first h2').text();

            expect(currentFeedEntryText).toBeDefined();
            expect(currentFeedEntryText).not.toBe('');
            expect(currentFeedEntryText).not.toBe(globalFirstFeedEntryText);

            done();
        });

        it('will load a new title that is neither blank nor undefined', function(done) {
            var newTitle = $('.header-title');

            expect(newTitle).toBeDefined();
            expect(newTitle).not.toBe('');
            expect(newTitle).not.toBe(globalTitle);

            done();
        });
    });
}());
