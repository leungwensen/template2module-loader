# template2module-loader
a webpack loader based on template2module, supports multiple template engines, generates high performance code.

## configuration

```js
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

template file content

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

module file content

```js
```
