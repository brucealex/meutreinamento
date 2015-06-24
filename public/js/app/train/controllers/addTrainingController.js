var fs = require('fs');
module.exports = function($scope,$timeout,$q,$log, coreEventsService,$state,$stateParams,$mdDialog) {



    var self = $scope;

    self.simulateQuery = false;
    self.isDisabled    = false;

    self.repos         = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
      var repos = [
        {
          'name'      : 'Supino Reto'
        },
        {
          'name'      : 'Supino Inclinado'
        },
        {
          'name'      : 'Crucifixo'
        },
        {
          'name'      : 'Flay'
        },
        {
          'name'      : 'Biceps Testa',
          'url'       : 'https://github.com/angular/material-start',
          'watchers'  : '81',
          'forks'     : '303',
        }
      ];
      return repos.map( function (repo) {
        repo.value = repo.name.toLowerCase();
        return repo;
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };

    }





	$scope.params = $stateParams;
	$scope.state = $state.current;
	$scope.plans = [
		"Treino A",
		"Treino B",
		"Treino C",
		"Treino D",
		"Treino E",
		"Treino F"
	];
	$scope.readonly = true;
	$scope.readonly2 = true;
	$scope.fruitNames2 = ['Bíceps Barra', 'Rosca Alternada', 'Rosca Investida','Rosca V', 'Rosca Alteres'];
	$scope.fruitNames= [
		{
			'name' : 'Bíceps Barra',
			'type' : 'Brassica'
		},
		{
			'name' : 'Bíceps V',
			'type' : 'Brassica'
		},
		{
			'name' : 'Bíceps Alternado',
			'type' : 'Umbelliferous'
		}
	]; 
	$scope.newVeg = function(chip) {
		return {
			name: chip,
			type: 'unknown'
		};
	};
	$scope.teste= function(){
		alert("bruno");
	};
	$scope.importTraining = function(ev) {
		$mdDialog.show({
			controller: 'ImportDialogController',
			// templateUrl: 'dialog1.tmpl.html',
			template: fs.readFileSync(__dirname + '/../templates/ImportDialogTemplate.html'),
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
