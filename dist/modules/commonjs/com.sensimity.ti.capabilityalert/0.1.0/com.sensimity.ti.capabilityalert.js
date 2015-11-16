(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.com||(g.com = {}));g=(g.sensimity||(g.sensimity = {}));g=(g.ti||(g.ti = {}));g.capabilityalert = f()}})(function(){var define,module,exports;return (function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var a=typeof require=="function"&&require;if(!u&&a)return a.length===2?a(i,!0):a(i);if(s&&s.length===2)return s(i,!0);if(s)return s(i);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){var n=t[i][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[i].exports}var i=Array.prototype.slice;Function.prototype.bind||Object.defineProperty(Function.prototype,"bind",{enumerable:!1,configurable:!0,writable:!0,value:function(e){function r(){return t.apply(this instanceof r&&e?this:e,n.concat(i.call(arguments)))}if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=this,n=i.call(arguments,1);return r.prototype=Object.create(t.prototype),r.prototype.contructor=r,r}});var s=typeof require=="function"&&require;for(var u=0;u<r.length;u++)o(r[u]);return o})({1:[function(require,module,exports){
'use strict';

/**
* Show an alert
* @param params {
	title: <String, required>,
	message: <String, required>,
	key: <String, optional, default appId>, //key to identify the alert
	tries: <Int, optional, default 3>,
	okMessage: <String, optional, default 'OK'>,
	cancelMessage: <String, optional, default 'No, thank you'>,
	remindAfter: <seconds, optional, default 1 day>	
}
*/
function showAlert(params) {
	var defaultOptions = {
		key: Ti.App.getId(),
		tries: 3,
		okMessage: 'Ok',
		cancelMessage: 'No, thank you',
		remindAfter: 86400
	};

	var options = _.extend(defaultOptions, params);
	if (!_.isString(options.title)) {
		Ti.App.warn('[com.sensimity.ti.capabilityalert] Please insert a title, alert can\'t be shown');
		return;
	} else if (!_.isString(options.message)) {
		Ti.App.warn('[com.sensimity.ti.capabilityalert] Please insert a message, alert can\'t be shown');
		return;
	}

    var now = (new Date() / 1000),
        checks = Ti.App.Properties.getObject(options.key, {
            never: false,
            tries: 0,
            last: 0
        });

    if (checks.never === true) {
        return;
    } else if (now - checks.last < (options.tries * options.remindAfter)) {
        return;
    }

    checks.last = now;

    var buttonNames = (checks.tries >= options.tries) ? [options.okMessage, options.cancelMessage] : [options.okMessage],
        cancel = 0,
        alertDialog = Ti.UI.createAlertDialog({
	        title: options.title,
	        message: options.message,
	        buttonNames: buttonNames,
	        cancel: cancel
	    }), onClickDialog = function (e) {
	        if (buttonNames[e.index] === options.cancelMessage) {
	            checks.never = true;
	        }
	        checks.tries++;
	        Ti.App.Properties.setObject(options.key, checks);

	        if (_.isFunction(options.onClick)) {
	        	options.onClick(e);
	        }
        };

    alertDialog.addEventListener('click', onClickDialog);
    alertDialog.show();
}

module.exports = showAlert;

},{}]},{},[1])(1)
});