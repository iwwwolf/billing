(function () {
    'use strict';


            app.factory('featuresStorage', function () {

            var data = {};


            function setFeatures(features) {
                data = features;
            }

            function getFeature(featureName) {
                var foundFeature = false;
                angular.forEach(data, function (feature) {
                    if (!foundFeature && feature.name === featureName) {
                        foundFeature = feature.status;
                    }
                });
                return foundFeature;
            }

            return {
                setFeatures: setFeatures,
                getFeature: getFeature
            }
        });
})();
