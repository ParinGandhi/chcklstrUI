(function () {
    'use strict';

    angular
        .module('chcklstr')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();
