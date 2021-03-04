/**
 * Setup global/Master VueApp
 *
 */

/**
 * Register Vue plugins
 * @param {type} param
 *
 */
//Vue.use(window["vue-validator"]);
//Vue.extend(Vue.prototype,window["vue-validator"])

/**
 * Setup VueApp : All further Vue instances should be childs of VueApp
 *
 * Store vueinit vars in this object allowing child object to use them
 *
 * @type Vue
 */

// config for live
// Vue.config.debug = false;
// Vue.config.silent = true;
// Vue.config.devtools = false;

Vue.config.debug = true;
Vue.config.silent = false;
Vue.config.devtools = true;

var VueData = {
};

var VueApp = new Vue({
    data: {
        lock: false,
        global: VueData
    },
    http: {
        emulateJSON: true
    },
    methods: {
        trackPageView: function () {
            // Information is sent to google through generic pageview
            ga('send', 'pageview');
        }
    }
});

$(document).ready(function () {
    VueApp.global = $("body").data("vueinit");
});
