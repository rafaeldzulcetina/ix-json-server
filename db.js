const db_invitations = require('./jsons/db_invitations.json');
const db_salesRooms = require('./jsons/db_salesroom.json');

module.exports = function() {
    return Object.assign({},
        db_invitations,
        db_salesRooms
    )
}