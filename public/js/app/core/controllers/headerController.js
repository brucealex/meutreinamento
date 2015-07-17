var fs = require('fs');
module.exports = function ($scope,$mdDialog, coreEventsService, authModelService) {
	var coreEvents = $scope.coreEventse = coreEventsService;
	$scope.plans = [
		"12/04/15 - 12/05/15",
		"13/04/15 - 12/05/15",
		"14/04/15 - 12/05/15",
		"19/04/15 - 12/05/15",
		"18/04/15 - 12/05/15",
		"15/04/15 - 12/05/15",
		"16/04/15 - 12/05/15"
	];
	$scope.logout = function () {
		authModelService.logout();
	};
	$scope.toggle_options = function () {
		coreEventsService.toggle_options();
	};
	$scope.train_dialog_open = function(ev) {
		$mdDialog.show({
			controller: 'trainDialogController',
			template: fs.readFileSync(__dirname + '/../templates/trainDialogTemplate.html'),
			parent: angular.element(document.body),
			targetEvent: ev,
		})
		.then(function(answer) {
			$scope.alert = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.alert = 'You cancelled the dialog.';
		});
	};

};
