(function () {
    'use strict';

    app.filter('select', [
        select
    ]);


    function select() {
        return function (items, props) {
            var out = [];

            if (!props.search) {
                return items;
            }

            props.search = props.search.toString().toLowerCase();

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    if (item[props.searchBy].toString().toLowerCase().indexOf(props.search) > -1) {
                        out.push(item);
                    }
                });
            } else {
                out = items;
            }

            return out;
        };
    }

})();