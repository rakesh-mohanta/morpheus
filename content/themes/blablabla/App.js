/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostList = require('./PostList');
var Single = require('./Single');
var ApplicationStore = require('../../../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible-app').StoreMixin;
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;


var App = React.createClass({
  mixins: [RouterMixin, StoreMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },
  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  },
  onChange: function () {
    var state = this.getStore(ApplicationStore).getState();
    this.setState(state);
  },
  scroll: function(){
    return canUseDOM && window.scrollTo(0,0);
  },
  render: function(){
    this.scroll();
    if (this.state.currentPageName === 'home') {
      return <PostList context={this.props.context}/>;
    }
    if (this.state.currentPageName === 'single') {
      return <Single context={this.props.context} slug={this.state.route.params.slug}/>;
    }
  }
});

module.exports = App;
