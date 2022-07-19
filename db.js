const db_invitations = require('./jsons/db_invitations.json');
const db_salesRooms = require('./jsons/db_salesroom.json');
const db_tours = require('./jsons/db_tours.json');
const db_ids = require('./jsons/db_ids.json');
const contract_status = require('./jsons/contract_status.json');
const contract_roles = require('./jsons/contract_roles.json');
const guests = require('./jsons/guests.json');
const resorts = require('./jsons/catalogs/resorts.json');
const countries = require('./jsons/catalogs/countries.json');
const nationalities = require('./jsons/catalogs/nationalities.json');
const paymentCards = require('./jsons/paymentCards.json');
const registerdPaymentCards = require('./jsons/registeredPaymentCards.json');
const cardStamp = require('./mockApi/cardStamp.json');
const cardTypes = require('./mockApi/cardTypes.json');
const participants = require('./jsons/participantsByTour.json');

module.exports = function() {
  return Object.assign({},
    db_invitations,
    db_salesRooms,
    db_tours,
    db_ids,
    contract_status,
    contract_roles,
    guests,
    resorts,
    countries,
    nationalities,
    paymentCards,
    registerdPaymentCards,
    cardTypes,
    cardStamp,
    participants,
  )
}
