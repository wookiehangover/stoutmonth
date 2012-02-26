this['JST'] = this['JST'] || {};

(function(){
this['JST'] || (this['JST'] = {});
this.JST["leaderboard"] = function(context) { return HandlebarsTemplates["leaderboard"](context); };
this.HandlebarsTemplates || (this.HandlebarsTemplates = {});
this.HandlebarsTemplates["leaderboard"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<li class=\"three columns\">\n  <h2>";
  stack1 = helpers.profile || depth0.profile
  stack1 = stack1.fb;
  stack1 = stack1.name;
  stack1 = stack1.full;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "profile.fb.name.full", { hash: {} }); }
  buffer += escapeExpression(stack1);
  stack1 = helpers.profile || depth0.profile
  stack1 = stack1.github;
  stack1 = stack1.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "profile.github.name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h2>\n  <h1>";
  stack1 = helpers.count || depth0.count
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "count", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n  ";
  stack1 = helpers.profile || depth0.profile
  stack1 = stack1.fb;
  stack1 = stack1.id;
  stack2 = helpers['if']
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers.profile || depth0.profile
  stack1 = stack1.github;
  stack1 = stack1.id;
  stack2 = helpers['if']
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <img src=\"https://graph.facebook.com/";
  stack1 = helpers.profile || depth0.profile
  stack1 = stack1.fb;
  stack1 = stack1.id;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "profile.fb.id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/picture?type=large\" />\n  ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <img src=\"http://www.gravatar.com/avatar/";
  stack1 = helpers.profile || depth0.profile
  stack1 = stack1.github;
  stack1 = stack1.gravatarId;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "profile.github.gravatarId", { hash: {} }); }
  buffer += escapeExpression(stack1) + "?s=200\" />\n  ";
  return buffer;}

  stack1 = helpers.leaders || depth0.leaders
  stack2 = helpers.each
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
}).call(this);