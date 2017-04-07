import Organization from '../../containers/Organization';
import Landlord from '../../containers/Landlord';
import Departments from '../../containers/Departments';
import InviteUser from '../../containers/Authorization/InviteUser';
import UserProfile from '../../containers/Authorization/Profile';
import RentContractsContainer from '../../containers/Contracts/contractsTable';
import Renters from '../../containers/Renters';
import Areas from '../../containers/Areas';
import CreateAreaContainer from '../../containers/Areas/CreateArea';
import EditArea from '../../containers/Areas/EditArea';
import ExchangeArea from '../../containers/Areas/ExchangeArea';
import CreateRenterForm from '../../containers/Renters/CreateRenterForm';
import CreateLandlordForm from '../../containers/Landlord/CreateLandlordForm';
import CreateContract from '../../containers/Contracts/CreateContract';
import EditRenterForm from '../../containers/Renters/EditRenterForm';
import EditContract from '../../containers/Contracts/EditContract';
import EditLandlordForm from '../../containers/Landlord/EditLandlordForm';
import FieldEdit from '../../containers/Fields/FieldEdit';

export default {
  renters: Renters,
  organization: Organization,
  landlord: Landlord,
  departments: Departments,
  inviteParticipants: InviteUser,
  profile: UserProfile,
  contracts: RentContractsContainer,
  areas: Areas,
  createNewArea: CreateAreaContainer,
  editArea: EditArea,
  exchangeArea: ExchangeArea,
  createRenter: CreateRenterForm,
  createLandlord: CreateLandlordForm,
  createContract: CreateContract,
  editRenter: EditRenterForm,
  editContract: EditContract,
  editLandlord: EditLandlordForm,
  editField: FieldEdit,
};
