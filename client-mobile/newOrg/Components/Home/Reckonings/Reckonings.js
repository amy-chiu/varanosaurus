'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var ReckoningList = require('./dumb/ReckoningList');
var ReckoningDetails = require('./ReckoningDetail/ReckoningDetails');

var Reckoning = React.createClass({

  render() {
    switch (this.props.reckoningsViewMode) {
      case 'list':
        return this.renderList();
      case 'details':
        return this.renderDetails();
      default:
        return this.renderList();
    }
  },

  renderList() {
    return (
      <ReckoningList
        reckonings={this.props.reckonings}
        handleSelect={this.handleSelect}
      />
    );
  },

  renderDetails() {
    var reckoning;

    this.props.reckonings.forEach((dataReckoning) => {
      if (dataReckoning.id === this.props.selectedReckoning) {
        reckoning = dataReckoning;
      }
    });

    return (
      <ReckoningDetails
        reckoning={reckoning}
      />
    );
  },

  handleSelect(/* reckoningId */) {
    /* dispatch SELECT_RECKONING */
  },

});

function select(state) {
  return {
    reckoningsViewMode: state.uiMode.reckoningsViewMode,
    reckonings: state.data.reckonings,
    selectedReckoning: state.uiMode.selectedReckoning,
  };
}

module.exports = connect(select)(Reckoning);