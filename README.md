# template2module-loader

a webpack loader based on template2module, supports multiple template engines, generates high performance code.

this loader allows you to write `var tpl = require('./some/template.tpl');` in your js code, and forget about everything (performance? compiling?).

## usage

```shell
npm install template2module-loader --save-dev
```

```javascript
{
  module: {
    loaders: [
      {
        test: /\.(apl|html|tpl|ztpl)(\?.+)?$/,
        loader: 'template2module-loader',
        exclude: /demo/,
        query: {
          engine: 'underscore',
          format: 'commonjs',
          outerScopeVars: [
            'translate',
            '_',
          ],
          preOuterScope: [
            'var translate = require("zero-text/i18n").translate;',
            'var _ = require("underscore");',
          ].join('\n'),
        }
      }
    ]
  }
}
```

this configuration will transform template file as followed into a module like this:

template file content (`src/greeting.tpl`)

```html
I am <%=name%><%if(man){%> and I like playing <%=man.game%><%}%>.
My favorite animates are
<% _.each(animates, function(animate){ %>
   <% if (animate.type !== invisibleType ){ %>
       <%=animate.name%>
   <% } %>
<% }); %>
etc.
```

compiled module file content

```javascript
var translate = require("zero-text/i18n").translate;;
var _ = require("underscore");
module.exports = function(data, helper) {
  data = data || {};
  helper = helper || {};
  var __t;
  var __p = '';
  var __j = Array.prototype.join;
  var print = function() {
    __p += __j.call(arguments, '');
  };
  return (function(name, man, animates, invisibleType) {
    __p += 'I am ' +
      ((__t = (name)) == null ? '' : __t) +
      '';
    if (man) {
      __p += ' and I like playing ' +
        ((__t = (man.game)) == null ? '' : __t) +
        '';
    }
    __p += '.\nMy favorite animates are ';
    _.each(animates, function(animate) {
      __p += '';
      if (animate.type !== invisibleType) {
        __p += '' +
          ((__t = (animate.name)) == null ? '' : __t) +
          ',';
      }
      __p += '';
    });
    __p += ' etc.';;
    return __p;
  })(data.name, data.man, data.animates, data.invisibleType);
};
```

usage: in `src/entry.js`

```javascript
var greetingTpl = require('./greeting.tpl');
```

see [test](./test) and [webpack.config.js](./webpack.config.js) for more details.

