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
