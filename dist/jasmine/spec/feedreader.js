var globalFirstFeedEntryText,globalTitle;$(function(){describe("RSS Feeds",function(){it("are neither blank nor undefined",function(){expect(allFeeds).toBeDefined(),expect(allFeeds.length).not.toBe(0)}),it("have a URL that is neither blank nor undefined",function(){allFeeds.forEach(function(e){expect(e.url).toBeDefined(),expect(e.url).not.toBe("")})}),it("have a name that is neither blank nor undefined",function(){allFeeds.forEach(function(e){expect(e.name).toBeDefined(),expect(e.name).not.toBe("")})})}),describe("The Menu",function(){var e,t=$(".menu-icon-link");it("is hidden at load time",function(){e=$("body").hasClass("menu-hidden"),expect(e).toBe(!0)}),it("toggles between shown and hidden when menu icon is clicked",function(){t.trigger("click"),e=$("body").hasClass("menu-hidden"),expect(e).not.toBe(!0),t.trigger("click"),e=$("body").hasClass("menu-hidden"),expect(e).toBe(!0)})}),describe("Initial Entries",function(){beforeEach(function(e){loadFeed(0,e)}),it("will return at least one entry that is neither blank nor undefined",function(){var e=$(".feed .entry-link .entry").length,t=$(".feed a:first h2").text();globalFirstFeedEntryText=t,expect(e).toBeGreaterThan(0),expect(t).toBeDefined(),expect(t).not.toBe("")}),it("will return a title for the header that is neither blank nor undefined",function(){var e=$(".header-title").text();globalTitle=e,expect(e).toBeDefined(),expect(e).not.toBe("")})}),describe("New Feed Selection",function(){beforeEach(function(e){loadFeed(2,e)}),it("will load new content that is neither blank nor undefined",function(e){var t=$(".feed a:first h2").text();expect(t).toBeDefined(),expect(t).not.toBe(""),expect(t).not.toBe(globalFirstFeedEntryText),e()}),it("will load a new title that is neither blank nor undefined",function(e){var t=$(".header-title");expect(t).toBeDefined(),expect(t).not.toBe(""),expect(t).not.toBe(globalTitle),e()})})}());