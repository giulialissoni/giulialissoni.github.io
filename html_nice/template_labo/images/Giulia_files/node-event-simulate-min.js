YUI.add("node-event-simulate",function(a,b){a.Node.prototype.simulate=function(b,c){a.Event.simulate(a.Node.getDOMNode(this),b,c)},a.Node.prototype.simulateGesture=function(b,c,d){a.Event.simulateGesture(this,b,c,d)}},"3.14.1",{requires:["node-base","event-simulate","gesture-simulate"]});
