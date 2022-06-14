const db_invitations = require('./jsons/db_invitations.json');
const db_salesRooms = require('./jsons/db_salesroom.json');
const db_tours = require('./jsons/db_tours.json');

module.exports = function() {
    return Object.assign({},
        db_invitations,
        db_salesRooms,
        db_tours
    )
}