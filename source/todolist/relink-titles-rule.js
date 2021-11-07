/*\
caption: Todolist data
description: This rule manages renaming data tiddlers for kookma Todolist plugin.
module-type: relinktitlesrule
title: $:/plugins/kookma/todolist/relink-titles-rule.js
type: application/javascript
\*/

'use strict';

exports.name = 'kookma-todolist';

var prefixes = $tw.wiki.getTiddlerList('$:/plugins/kookma/todolist/listOfConfigPrefixes');
var regexp = new RegExp('^(' + $tw.utils.escapeRegExp('$:/todolist/data/') + '(?:' + prefixes.filter($tw.utils.escapeRegExp).join('|') + ')\\/)(.+)')

exports.report = function(targetTitle, callback, options) {
    var match = targetTitle.match(regexp);
    if (match) {
        callback(match[2], match[1] + '...');
    }
};

exports.relink = function(targetTitle, fromTitle, toTitle, options) {
   var match = targetTitle.match(regexp);
   if (match && match[2] === fromTitle) {
        return {output: match[1] + toTitle};
   }
};
