!function(e){function t(e,t){return(t-e)/1e3}function s(e,t){return t=t||2,Math.round(e*Math.pow(10,t))/Math.pow(10,t)}function i(e){var t,s,i=[];for(t=0;t<e.length;t+=1)s=e[t],s.passed_||i.push(s);return i}function n(e){var t,r,u={description:e.description,durationSec:0,specs:[],suites:[],passed:!0},a=e.specs(),o=e.suites();for(t=0,r=a.length;r>t;++t)u.specs[t]={description:a[t].description,durationSec:a[t].durationSec,passed:a[t].results().passedCount===a[t].results().totalCount,skipped:a[t].results().skipped,passedCount:a[t].results().passedCount,failedCount:a[t].results().failedCount,totalCount:a[t].results().totalCount,failures:i(a[t].results().getItems())},u.passed=u.specs[t].passed?u.passed:!1,u.durationSec+=u.specs[t].durationSec;for(t=0,r=o.length;r>t;++t)u.suites[t]=n(o[t]),u.passed=u.suites[t].passed?u.passed:!1,u.durationSec+=u.suites[t].durationSec;return u.durationSec=s(u.durationSec,4),u}if(!e)throw new Error("[Jasmine JSReporter] 'Jasmine' library not found");var r=function(){};r.prototype={reportRunnerStarting:function(e){},reportSpecStarting:function(e){e.startedAt=new Date},reportSpecResults:function(e){e.finishedAt=new Date,e.durationSec=e.startedAt?t(e.startedAt.getTime(),e.finishedAt.getTime()):0},reportSuiteResults:function(e){},reportRunnerResults:function(t){var s,i,r,u=t.suites();for(e.runnerResults={suites:[],durationSec:0,passed:!0},s=0,r=u.length,i=0;r>s;++s)null===u[s].parentSuite&&(e.runnerResults.suites[i]=n(u[s]),e.runnerResults.passed=e.runnerResults.suites[i].passed?e.runnerResults.passed:!1,e.runnerResults.durationSec+=e.runnerResults.suites[i].durationSec,i++);e.getJSReport=function(){return e.runnerResults?e.runnerResults:null},e.getJSReportAsString=function(){return JSON.stringify(e.getJSReport())}}},e.JSReporter=r;var u=function(){};u.prototype.start=function(){return this.startTime=(new Date).getTime(),this},u.prototype.elapsed=function(){return null==this.startTime?-1:(new Date).getTime()-this.startTime};var a=function(e,t){for(var s in t)e[s]=t[s];return e},o=function(e){return e!==Object(e)?e:a({},e)};e.JSReporter2=function(){this.specs={},this.suites={},this.rootSuites=[],this.suiteStack=[],e.getJSReport=this.getJSReport,e.getJSReportAsString=this.getJSReportAsString};var p=e.JSReporter2.prototype;p.suiteStarted=function(e){e=this._cacheSuite(e),e.specs=[],e.suites=[],e.passed=!0,e.parentId=this.suiteStack.slice(this.suiteStack.length-1)[0],e.parentId?this.suites[e.parentId].suites.push(e):this.rootSuites.push(e.id),this.suiteStack.push(e.id),e.timer=(new u).start()},p.suiteDone=function(e){e=this._cacheSuite(e),e.duration=e.timer.elapsed(),e.durationSec=e.duration/1e3,this.suiteStack.pop();var t=this.suites[e.parentId];t&&(t.passed=t.passed&&e.passed),delete e.timer,delete e.id,delete e.parentId,delete e.fullName},p.specStarted=function(e){e=this._cacheSpec(e),e.timer=(new u).start(),e.suiteId=this.suiteStack.slice(this.suiteStack.length-1)[0],this.suites[e.suiteId].specs.push(e)},p.specDone=function(e){e=this._cacheSpec(e),e.duration=e.timer.elapsed(),e.durationSec=e.duration/1e3,e.skipped="pending"===e.status,e.passed=e.skipped||"passed"===e.status,e.totalCount=e.passedExpectations.length+e.failedExpectations.length,e.passedCount=e.passedExpectations.length,e.failedCount=e.failedExpectations.length,e.failures=[];for(var t=0,s=e.failedExpectations.length;s>t;t++){var i=e.failedExpectations[t];e.failures.push({type:"expect",expected:i.expected,passed:!1,message:i.message,matcherName:i.matcherName,trace:{stack:i.stack}})}var n=this.suites[e.suiteId];e.failed&&n.failingSpecs.push(e),n.passed=n.passed&&e.passed,delete e.timer,delete e.totalExpectations,delete e.passedExpectations,delete e.suiteId,delete e.fullName,delete e.id,delete e.status,delete e.failedExpectations},p.jasmineDone=function(){this._buildReport()},p.getJSReport=function(){return e.jsReport?e.jsReport:void 0},p.getJSReportAsString=function(){return e.jsReport?JSON.stringify(e.jsReport):void 0},p._haveSpec=function(e){return null!=this.specs[e.id]},p._cacheSpec=function(e){var t=this.specs[e.id];return null==t?t=this.specs[e.id]=o(e):a(t,e),t},p._haveSuite=function(e){return null!=this.suites[e.id]},p._cacheSuite=function(e){var t=this.suites[e.id];return null==t?t=this.suites[e.id]=o(e):a(t,e),t},p._buildReport=function(){for(var t=0,s=!0,i=[],n=0,r=this.rootSuites.length;r>n;n++){var u=this.suites[this.rootSuites[n]];t+=u.duration,s=s&&u.passed,i.push(u)}e.jsReport={passed:s,durationSec:t/1e3,suites:i}}}(jasmine);