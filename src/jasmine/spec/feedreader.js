// feedreader.js

// Jasmine can be slow loading RSS feeds.  This helps avoid errors:
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

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

        var $menuLink = $('.menu-icon-link');
        var $menuHidden;

        it('is hidden at load time', function() {
            $menuHidden = $('body').hasClass('menu-hidden');
            expect($menuHidden).toBe(true);
        });

        // Note that $menuHidden must be re-evaluated after each click.

        it('toggles between shown and hidden when menu icon is clicked', function() {
            $menuLink.trigger('click');
            $menuHidden = $('body').hasClass('menu-hidden');
            expect($menuHidden).not.toBe(true);

            $menuLink.trigger('click');
            $menuHidden = $('body').hasClass('menu-hidden');
            expect($menuHidden).toBe(true);
        });
    });

    // Test that entries and title have real content on initial page load.

    describe('Initial Entries', function() {

        // Note that loadFeed is an async function. Must use "done" here.

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('will return at least one entry that is not blank', function() {
            var $entryCount = $('.feed .entry-link .entry').length;
            var $firstFeedEntryText = $('.feed a:first h2').text();
            expect($entryCount).toBeGreaterThan(0);
            expect($firstFeedEntryText).not.toBe('');
        });

        it('will return a title for the header that is not blank', function() {
            var $title = $('.header-title').text();
            expect($title).not.toBe('');
        });
    });

    // Test that entries and title have different content when loadFeed is run on different feeds.

    describe('New Feed Selection', function() {

        var $firstFeedEntryText;
        var $firstTitle;
        var $secondFeedEntryText;
        var $secondTitle;

        /*
            Run loadFeed with done, because it is async.
            Set variables based on output.
        */

        beforeAll(function(done) {
            loadFeed(0, function() {
                $firstFeedEntryText = $('.feed a:first h2').text();
                $firstTitle = $('.header-title').text();
                done();
            });
        });

        /*
            Run loadFeed again, but from within another test suite.
            This ensures that the first loadFeed will be done before this one runs.
            Otherwise, the two loadFeeds interfere with one another
            or complete at very different times, making a comparision of values impossible.

            An alternative:

            beforeAll(function(done) {
                 loadFeed(0, function({
                   $feedA = $('.feed').html();
                   loadFeed(1, function({
                     $feedB = $('.feed').html();
                     done();
                   }));
                 }));
             });
        */

        describe('Compared to Previous Feed Selection', function() {

            beforeAll(function(done) {
                loadFeed(2, function() {
                    $secondFeedEntryText = $('.feed a:first h2').text();
                    $secondTitle = $('.header-title').text();
                    done();
                });
            });

            it('will load new content that is not blank', function(done) {
                expect($secondFeedEntryText).not.toBe('');
                expect($secondFeedEntryText).not.toBe($firstFeedEntryText);
                done();
            });

            it('will load a new title that is not blank', function(done) {
                expect($secondTitle).not.toBe('');
                expect($secondTitle).not.toBe($firstTitle);
                done();
            });
        });
    });
}());

// NO jasmineEnv.addReporter(new jasmine.JSReporter());
// NO jasmineEnv.addReporter(new jasmine.JSReporter2());
jasmine.getEnv().addReporter(new jasmine.JSReporter2());
