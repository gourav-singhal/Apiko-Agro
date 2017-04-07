const actions = require('./constants');

module.exports = {
  owner: [
    actions.INVITE_USER,
    actions.UPLOAD_FILES,

    actions.EDIT_ORGANIZATIONS,
    actions.VIEW_ORGANIZATIONS,

    actions.EDIT_AREAS,
    actions.VIEW_AREAS,

    actions.VIEW_LOCALITIES,
    actions.EDIT_LOCALITIES,

    actions.EDIT_LANDLORDS,
    actions.VIEW_LANDLORDS,

    actions.EDIT_DEPARTMENTS,
    actions.VIEW_DEPARTMENTS,

    actions.EDIT_FIELDS,
    actions.VIEW_FIELDS,

    actions.EDIT_ACCOUNT,

    actions.VIEW_CONTRACTS,
    actions.EDIT_CONTRACTS,

    actions.VIEW_RENTERS,
    actions.EDIT_RENTERS,

    actions.EDIT_EXCHANGE_ACTS,
    actions.VIEW_EXCHANGE_ACTS,
  ],
  user: [
    actions.UPLOAD_FILES,

    actions.EDIT_ORGANIZATIONS,
    actions.VIEW_ORGANIZATIONS,

    actions.EDIT_AREAS,
    actions.VIEW_AREAS,

    actions.VIEW_LOCALITIES,
    actions.EDIT_LOCALITIES,

    actions.EDIT_LANDLORDS,
    actions.VIEW_LANDLORDS,

    actions.EDIT_DEPARTMENTS,
    actions.VIEW_DEPARTMENTS,

    actions.EDIT_FIELDS,
    actions.VIEW_FIELDS,

    actions.EDIT_ACCOUNT,

    actions.VIEW_CONTRACTS,
    actions.EDIT_CONTRACTS,

    actions.VIEW_RENTERS,
    actions.EDIT_RENTERS,

    actions.EDIT_EXCHANGE_ACTS,
    actions.VIEW_EXCHANGE_ACTS,
  ],
  admin: [
    actions.ALL_RIGHT,
  ],
};
