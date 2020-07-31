var Insites = /** @class */ (function () {
    function Insites() {
    }
    Insites.prototype.componentLists = function (element) {
        var self = this;
        var get_params = self.isValidParams(element, "Please include element.");
        var elements = document.querySelectorAll(get_params);
        return elements;
    };
    Insites.prototype.component = function (id) {
        var self = this;
        var get_params = self.isValidParams(id, "Please include element id.");
        var el = document.getElementById(get_params);
        return el;
    };
    Insites.prototype.isValidParams = function (params, message) {
        if (!params) {
            console.error(message);
            return;
        }
        return params;
    };
    return Insites;
 }());
 
 var ins = new Insites();