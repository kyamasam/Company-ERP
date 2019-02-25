/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ({

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(64);


/***/ }),

/***/ 64:
/***/ (function(module, exports) {

//portlets
!function ($) {
    "use strict";

    /**
    Portlet Widget
    */

    var Portlet = function Portlet() {
        this.$body = $("body"), this.$portletIdentifier = ".portlet", this.$portletCloser = '.portlet a[data-toggle="remove"]', this.$portletRefresher = '.portlet a[data-toggle="reload"]';
    };

    //on init
    Portlet.prototype.init = function () {
        // Panel closest
        var $this = this;
        $(document).on("click", this.$portletCloser, function (ev) {
            ev.preventDefault();
            var $portlet = $(this).closest($this.$portletIdentifier);
            var $portlet_parent = $portlet.parent();
            $portlet.remove();
            if ($portlet_parent.children().length == 0) {
                $portlet_parent.remove();
            }
        });

        // Panel Reload
        $(document).on("click", this.$portletRefresher, function (ev) {
            ev.preventDefault();
            var $portlet = $(this).closest($this.$portletIdentifier);
            // This is just a simulation, nothing is going to be reloaded
            $portlet.append('<div class="panel-disabled"><div class="loader-1"></div></div>');
            var $pd = $portlet.find('.panel-disabled');
            setTimeout(function () {
                $pd.fadeOut('fast', function () {
                    $pd.remove();
                });
            }, 500 + 300 * (Math.random() * 5));
        });
    },
    //
    $.Portlet = new Portlet(), $.Portlet.Constructor = Portlet;
}(window.jQuery),

/**
 * Notifications
 */
function ($) {
    "use strict";

    var Notification = function Notification() {};

    //simple notificaiton
    Notification.prototype.notify = function (style, position, title, text) {
        var icon = 'fa fa-adjust';
        if (style == "error") {
            icon = "fa fa-exclamation";
        } else if (style == "warning") {
            icon = "fa fa-warning";
        } else if (style == "success") {
            icon = "fa fa-check";
        } else if (style == "custom") {
            icon = "md md-album";
        } else if (style == "info") {
            icon = "fa fa-question";
        } else {
            icon = "fa fa-adjust";
        }
        $.notify({
            title: title,
            text: text,
            image: "<i class='" + icon + "'></i>"
        }, {
            style: 'metro',
            className: style,
            globalPosition: position,
            showAnimation: "show",
            showDuration: 0,
            hideDuration: 0,
            autoHide: true,
            clickToHide: true
        });
    },

    //auto hide notification
    Notification.prototype.autoHideNotify = function (style, position, title, text) {
        var icon = "fa fa-adjust";
        if (style == "error") {
            icon = "fa fa-exclamation";
        } else if (style == "warning") {
            icon = "fa fa-warning";
        } else if (style == "success") {
            icon = "fa fa-check";
        } else if (style == "custom") {
            icon = "md md-album";
        } else if (style == "info") {
            icon = "fa fa-question";
        } else {
            icon = "fa fa-adjust";
        }
        $.notify({
            title: title,
            text: text,
            image: "<i class='" + icon + "'></i>"
        }, {
            style: 'metro',
            className: style,
            globalPosition: position,
            showAnimation: "show",
            showDuration: 0,
            hideDuration: 0,
            autoHideDelay: 5000,
            autoHide: true,
            clickToHide: true
        });
    },
    //confirmation notification
    Notification.prototype.confirm = function (style, position, title) {
        var icon = "fa fa-adjust";
        if (style == "error") {
            icon = "fa fa-exclamation";
        } else if (style == "warning") {
            icon = "fa fa-warning";
        } else if (style == "success") {
            icon = "fa fa-check";
        } else if (style == "custom") {
            icon = "md md-album";
        } else if (style == "info") {
            icon = "fa fa-question";
        } else {
            icon = "fa fa-adjust";
        }
        $.notify({
            title: title,
            text: 'Are you sure you want to do nothing?<div class="clearfix"></div><br><a class="btn btn-sm btn-white yes">Yes</a> <a class="btn btn-sm btn-danger no">No</a>',
            image: "<i class='" + icon + "'></i>"
        }, {
            style: 'metro',
            className: style,
            globalPosition: position,
            showAnimation: "show",
            showDuration: 0,
            hideDuration: 0,
            autoHide: false,
            clickToHide: false
        });
        //listen for click events from this style
        $(document).on('click', '.notifyjs-metro-base .no', function () {
            //programmatically trigger propogating hide event
            $(this).trigger('notify-hide');
        });
        $(document).on('click', '.notifyjs-metro-base .yes', function () {
            //show button text
            alert($(this).text() + " clicked!");
            //hide notification
            $(this).trigger('notify-hide');
        });
    },
    //init - examples
    Notification.prototype.init = function () {},
    //init
    $.Notification = new Notification(), $.Notification.Constructor = Notification;
}(window.jQuery),

/**
 * Components
 */
function ($) {
    "use strict";

    var Components = function Components() {};

    //initializing tooltip
    Components.prototype.initTooltipPlugin = function () {
        $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip();
    },

    //initializing popover
    Components.prototype.initPopoverPlugin = function () {
        $.fn.popover && $('[data-toggle="popover"]').popover();
    },

    //initializing custom modal
    Components.prototype.initCustomModalPlugin = function () {
        $('[data-plugin="custommodal"]').on('click', function (e) {
            Custombox.open({
                target: $(this).attr("href"),
                effect: $(this).attr("data-animation"),
                overlaySpeed: $(this).attr("data-overlaySpeed"),
                overlayColor: $(this).attr("data-overlayColor")
            });
            e.preventDefault();
        });
    },

    //initializing nicescroll
    Components.prototype.initNiceScrollPlugin = function () {
        //You can change the color of scroll bar here
        $.fn.niceScroll && $(".nicescroll").niceScroll({ cursorcolor: '#98a6ad', cursorwidth: '6px', cursorborderradius: '5px' });
    },

    //initializing Slimscroll
    Components.prototype.initSlimScrollPlugin = function () {
        //You can change the color of scroll bar here
        $.fn.niceScroll && $(".slimscroll-noti").slimScroll({ position: 'right', size: "5px", color: '#98a6ad', height: '230px', wheelStep: 10 });
    },

    //range slider
    Components.prototype.initRangeSlider = function () {
        $.fn.slider && $('[data-plugin="range-slider"]').slider({});
    },

    /* -------------
     * Form related controls
     */
    //switch
    Components.prototype.initSwitchery = function () {
        $('[data-plugin="switchery"]').each(function (idx, obj) {
            new Switchery($(this)[0], $(this).data());
        });
    },
    //multiselect
    Components.prototype.initMultiSelect = function () {
        if ($('[data-plugin="multiselect"]').length > 0) $('[data-plugin="multiselect"]').multiSelect($(this).data());
    },

    /* -------------
    * small charts related widgets
    */
    //peity charts
    Components.prototype.initPeityCharts = function () {
        $('[data-plugin="peity-pie"]').each(function (idx, obj) {
            var colors = $(this).attr('data-colors') ? $(this).attr('data-colors').split(",") : [];
            var width = $(this).attr('data-width') ? $(this).attr('data-width') : 20; //default is 20
            var height = $(this).attr('data-height') ? $(this).attr('data-height') : 20; //default is 20
            $(this).peity("pie", {
                fill: colors,
                width: width,
                height: height
            });
        });
        //donut
        $('[data-plugin="peity-donut"]').each(function (idx, obj) {
            var colors = $(this).attr('data-colors') ? $(this).attr('data-colors').split(",") : [];
            var width = $(this).attr('data-width') ? $(this).attr('data-width') : 20; //default is 20
            var height = $(this).attr('data-height') ? $(this).attr('data-height') : 20; //default is 20
            $(this).peity("donut", {
                fill: colors,
                width: width,
                height: height
            });
        });

        $('[data-plugin="peity-donut-alt"]').each(function (idx, obj) {
            $(this).peity("donut");
        });

        // line
        $('[data-plugin="peity-line"]').each(function (idx, obj) {
            $(this).peity("line", $(this).data());
        });

        // bar
        $('[data-plugin="peity-bar"]').each(function (idx, obj) {
            var colors = $(this).attr('data-colors') ? $(this).attr('data-colors').split(",") : [];
            var width = $(this).attr('data-width') ? $(this).attr('data-width') : 20; //default is 20
            var height = $(this).attr('data-height') ? $(this).attr('data-height') : 20; //default is 20
            $(this).peity("bar", {
                fill: colors,
                width: width,
                height: height
            });
        });
    }, Components.prototype.initCounterUp = function () {
        var delay = $(this).attr('data-delay') ? $(this).attr('data-delay') : 100; //default is 100
        var time = $(this).attr('data-time') ? $(this).attr('data-time') : 1200; //default is 1200
        $('[data-plugin="counterup"]').each(function (idx, obj) {
            $(this).counterUp({
                delay: 100,
                time: 1200
            });
        });
    },

    //initilizing
    Components.prototype.init = function () {
        var $this = this;
        this.initTooltipPlugin(), this.initPopoverPlugin(), this.initNiceScrollPlugin(), this.initSlimScrollPlugin(), this.initCustomModalPlugin(), this.initRangeSlider(), this.initSwitchery(), this.initMultiSelect(), this.initPeityCharts(), this.initCounterUp(),
        //creating portles
        $.Portlet.init();
    }, $.Components = new Components(), $.Components.Constructor = Components;
}(window.jQuery),
//initializing main application module
function ($) {
    "use strict";

    $.Components.init();
}(window.jQuery);

/***/ })

/******/ });