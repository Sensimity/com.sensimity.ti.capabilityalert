## com.sensimity.ti.capabilityalert

This common-js module introduced the possiblity to show a alert and reminds the alert after a day (or the period you prefer).

### How to use
1. Add the `com.sensimity.ti.capabilityalert` module to the `modules/commonjs` folder in your Titanium project
2. To show an alert, use the module as follows:
```
var alertDialog = require('com.sensimity.ti.capabilityalert');
var onClick = function (e) {
	console.log('User clicks a button insite the alert dialog');	
};
alertDialog({
	title: 'Please update your application',
	message: 'There is a new version available on the App Store',
	key: 'update_alert',
	tries: 3,
	okMessage: 'Ok',
	cancelMessage: 'Cancel'
	remindAfter: 86400,// Remind a user after 1 day	
	onClick: onClick
});
```
