//any mongo collections that we want to share with the user
Waypoints = new Mongo.Collection("waypoints");

if (Meteor.isServer) {
    Meteor.publish("waypoints", function () {
        return Waypoints.find();
    });
}

if (Meteor.isClient) {
    Meteor.subscribe("waypoints");
}
