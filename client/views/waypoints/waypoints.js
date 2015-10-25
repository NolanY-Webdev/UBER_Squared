Template.waypoints.helpers({
    'items': function () {
        return Waypoints.find({ owner: Meteor.userId() }, { sort: { index: 1 } });
    }
});

Template.waypoints.events({
    "click .delete": function () {
        Waypoints.remove(this._id)
    }
});
