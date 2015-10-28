'use strict';

var React = require('react-native');
var {connect} = require('react-redux');

var ItemList = require('./dumb/ItemList');
// var ItemDetails = require('./dumb/ItemDetails');
// var ItemAdd = require('./ItemAdd/ItemAdd');

// var {
//   Text,
// } = React;

var Items = React.createClass({

  render() {
    switch (this.props.itemsViewMode) {
    case 'list':
      return this.renderItemList();
    }
  },

  renderItemList() {
    console.log('rendering item list');
    return <ItemList
      itemsFilter={this.props.itemsFilter}
      items={this.props.items}
    />;
  },

});


function select(state) {

  var items = (state.uiMode.itemsFilter === 'pending')
    ? state.data.items.pending
    : state.data.items.bought;

  return {
    itemsViewMode: state.uiMode.itemsViewMode,
    itemsFilter: state.uiMode.itemsFilter,
    itemDetails: state.uiMode.itemDetails,
    items,
    selectedItemId: state.uiMode.selectedItemId,
  };
}

// var itemListHandlers = {
//   gotoPendingItemsList() {
//     //TODO: ACTION - UPDATE uiMode.itemsFilter to pending
//     //set items to pendingItems
//   },
//   gotoBoughtItemsList() {
//     //TODO: ACTION - UPDATE uiMode.itemsFilter to bought
//     //set items to boughtItems
//   },
//   // goToItemDetailsView(item) {
//   //   //TODO: ACTION - UPDATE uiMode.itemsViewMode to details
//   // },
//   gotoAddItemView() {
//     //TODO: ACTION - UPDATE uiMode.itemsViewMode to add
//   },
// };

// var itemDetailsHandlers = {
//   //TODO
// };

// var itemAddHandlers = {
//   //TODO
// };

module.exports = connect(select)(Items);
