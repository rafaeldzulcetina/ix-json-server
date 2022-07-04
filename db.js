const db_invitations = require('./jsons/db_invitations.json');
const db_salesRooms = require('./jsons/db_salesroom.json');
const db_tours = require('./jsons/db_tours.json');
const db_ids = require('./jsons/db_ids.json');
const contract_status = require('./jsons/contract_status.json');
const contract_roles = require('./jsons/contract_roles.json');

module.exports = function () {
    return Object.assign({},
        db_invitations,
        db_salesRooms,
        db_tours,
        db_ids,
        contract_status,
        contract_roles
    )
}
