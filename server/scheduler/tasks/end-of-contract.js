const Contracts = require('../../model/contract');
const Area = require('../../model/area');
const moment = require('moment');

const AREA_STATUS = 'inRegister';

const only = fieldName => field => field[fieldName];

const isTimeUp = (date, year) =>
  moment(moment(date).year(moment(date).year() + year)).isBefore(new Date());

const isContractTimeUp = contract => {
  const afterDate = moment(contract.registrationDate).isAfter(contract.signatureDate) ?
    contract.registrationDate : contract.signatureDate;
  return isTimeUp(afterDate, contract.validity);
};

const findEndingContracts = async () => {
  const contractns = await Contracts.find({ areaId: { $exists: true } });
  const areaIds = contractns.filter(isContractTimeUp).map(only('areaId'));
  Area.update({ _id: { $in: areaIds } }, { status: AREA_STATUS }, () => {});
};

module.exports = findEndingContracts;

