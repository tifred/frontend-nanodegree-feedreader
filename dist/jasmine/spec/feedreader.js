jasmine.DEFAULT_TIMEOUT_INTERVAL=1e4,$(function(){describe("RSS Feeds",function(){it("are neither blank nor undefined",function(){expect(allFeeds).toBeDefined(),expect(allFeeds.length).not.toBe(0)}),it("have a URL that is neither blank nor undefined",function(){allFeeds.forEach(function(e){expect(e.url).toBeDefined(),expect(e.url).not.toBe("")})}),it("have a name that is neither blank nor undefined",function(){allFeeds.forEach(function(e){expect(e.name).toBeDefined(),expect(e.name).not.toBe("")})})}),describe("The Menu",function(){var e,t=$(".menu-icon-link");it("is hidden at load time",function(){e=$("body").hasClass("menu-hidden"),expect(e).toBe(!0)}),it("toggles between shown and hidden when menu icon is clicked",function(){t.trigger("click"),e=$("body").hasClass("menu-hidden"),expect(e).not.toBe(!0),t.trigger("click"),e=$("body").hasClass("menu-hidden"),expect(e).toBe(!0)})}),describe("Initial Entries",function(){beforeEach(function(e){loadFeed(0,e)}),it("will return at least one entry that is not blank",function(){var e=$(".feed .entry-link .entry").length,t=$(".feed a:first h2").text();expect(e).toBeGreaterThan(0),expect(t).not.toBe("")}),it("will return a title for the header that is not blank",function(){var e=$(".header-title").text();expect(e).not.toBe("")})}),describe("New Feed Selection",function(){var e,t,n,i;beforeAll(function(n){loadFeed(0,function(){e=$(".feed a:first h2").text(),t=$(".header-title").text(),n()})}),describe("Compared to Previous Feed Selection",function(){beforeAll(function(e){loadFeed(2,function(){n=$(".feed a:first h2").text(),i=$(".header-title").text(),e()})}),it("will load new content that is not blank",function(t){expect(n).not.toBe(""),expect(n).not.toBe(e),t()}),it("will load a new title that is not blank",function(e){expect(i).not.toBe(""),expect(i).not.toBe(t),e()})})})}());