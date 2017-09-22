/*global window self*/

(function (definition) {
    'use strict';

    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        module.exports = definition();
    } else if (typeof window !== 'undefined' || typeof self !== 'undefined') {
        var global = typeof window !== 'undefined' ? window : self;

        var previousAmp = global.amp;
        global.amp = definition();
        global.amp.noConflict = function () {
            global.amp = previousAmp;
            return this;
        };
    } else {
        throw new Error('Environment was not anticipated.');
    }

})(function () {
    'use strict';

    var _isArray = Array.isArray || function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };

    var _keys = Object.keys || function (obj) {
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    var _forEach = function (arr, iterator, context) {
        if (!_isArray(arr)) {
            return;
        }

        if (arr.forEach) {
            arr.forEach(iterator, context);
        } else {
            for (var key = 0, len = arr.length; key < len; key++) {
                iterator.call(context, arr[key], key, arr);
            }
        }
    };

    function inlineContent(delivery) {
        var inlinedContent = [];
        var contentKeyMap = {};

        if (delivery) {
            _forEach(delivery['@graph'], function (content) {
                contentKeyMap[content['@id']] = content;
            });

            _forEach(delivery.result, function (result) {
                if (!result['@id']) {
                    return;
                }

                var content = inlineChildContent({'@id': result['@id']}, contentKeyMap);
                if (content) {
                    inlinedContent.push(content);
                }
            });
        }

        return inlinedContent;
    }

    function inlineChildContent(parentNode, contentKeyMap) {
        _forEach(_keys(parentNode), function (key) {
            var value = parentNode[key];
            if (key === '@id') {
                if (!contentKeyMap[value]) {
                    return;
                }
                _forEach(_keys(contentKeyMap[value]), function (childKey) {
                    parentNode[childKey] = contentKeyMap[value][childKey];
                })
            }
        });

        _forEach(_keys(parentNode), function (key) {
            var value = parentNode[key];
            if (value !== null && typeof value === 'object') {
                parentNode[key] = inlineChildContent(parentNode[key], contentKeyMap);
            } else if (_isArray(value)) {
                _forEach(value, function (item, i) {
                    parentNode[key][i] = inlineChildContent(parentNode[key][i], contentKeyMap);
                });
            }
        });

        return parentNode;
    }

    return {
        inlineContent: inlineContent
    };
});