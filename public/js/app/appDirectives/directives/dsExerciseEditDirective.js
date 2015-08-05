var fs = require('fs');
module.exports = function() {
	return{
		template: fs.readFileSync(__dirname + '/../templates/dsExerciseEditTemplateDirective.html'),
		// transclude:true,
		scope: {
			exercise: "=",
			plans:"="
		},
		controller: function($scope,$element,$attrs){
			// console.log($scope.exercicios);
			var series = [];
			this.registerSerie = function(serie){
				series.push(serie);
			};
			this.close_all = function (){
				series.forEach(function(serie){
					serie.isOpened = false;
				});
			};
		}
		// require: "^dsExercises",
		// link :function(scope, element,attrs,ctrl) {
		// 	ctrl.registerExercise(scope);
		// 	scope.open_exerc= function () {
		// 		ctrl.close_all();
		// 		scope.isOpened = true;
		// 	};
		// 	scope.remove = function(exercicio){
		// 		scope.$emit('remove_exercise',exercicio);
		// 	};
		// 	scope.close_exerc= function () {
		// 		scope.isOpened = false;
		// 	};
		// }
	};
};
