I am <%=name%><%if(man){%> and I like playing <%=man.game%><%}%>.
My favorite animates are <% _.each(animates, function(animate){ %><% if (animate.type !== invisibleType ){ %><%=animate.name%>,<% } %><% }); %> etc.