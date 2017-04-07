import React, { PropTypes } from 'react';
import { Container, Form, Button, Dropdown, Message } from 'semantic-ui-react';
import Visible from '../General/Visible';
import { Translate, I18n } from 'react-i18nify';
import DatePicker from 'react-datepicker';
import FormWarning from '../General/FormWarning';

const ExchangeAreaForm = ({
  toDropdownOptions,
  formState,
  currentArea,
  getRenterArea,
  getAreaCadastralNumber,
  getAreaRenterName,
  filterRenters,
  onSubmit,
  selectedRenterId,
  onRenterChange,
  onDatePick,
  dateOfExchange,
}) =>
  <div>
    <Container className="change-password-form">
      <div className="change-password-form">
        <Form
          onSubmit={onSubmit}
          loading={formState.loading}
          error={!!formState.error}
        >

          <Form.Field>
            <label>
              <Translate value="area" /> : {getAreaCadastralNumber(currentArea)}
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              <Translate value="renter" /> : {getAreaRenterName(currentArea.renterId)}
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              <Translate value="renters" />
            </label>
            <Dropdown
              placeholder={I18n.t('renters')}
              search selection
              options={filterRenters(toDropdownOptions('renters', 'name'))}
              name="renterId"
              onChange={onRenterChange}
            />
            <FormWarning isVisible={formState.warning.name === 'renterId'} />
          </Form.Field>

          <Visible isVisible={!!selectedRenterId} >
            <div>
              <Form.Field>
                <label>
                  <Translate value="area" />:
                  {getAreaCadastralNumber(getRenterArea(selectedRenterId))}
                </label>
              </Form.Field>

              <Form.Field>
                <label><Translate value="expiration" /></label>
                <Form.Input type="number" name="expiration" />
                <FormWarning isVisible={formState.warning.name === 'expiration'} />
              </Form.Field>

              <Form.Field>
                <label><Translate value="date-of-exchange" /></label>
                <DatePicker
                  className="datepicker"
                  placeholderText={I18n.t('select_date')}
                  locale="uk"
                  onChange={onDatePick}
                  selected={dateOfExchange}
                  name="dateOfExchange"
                />
                <FormWarning isVisible={formState.warning.name === 'dateOfExchange'} />
              </Form.Field>

              <Button primary type="submit">
                <Translate value="save_changes" />
              </Button>

              <Message
                error
                header={I18n.t('error')}
                content={formState.error}
              />
            </div>
          </Visible>
        </Form>
      </div>
    </Container>
  </div>;

ExchangeAreaForm.propTypes = {
  toDropdownOptions: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  currentArea: PropTypes.object.isRequired,
  getRenterArea: PropTypes.func.isRequired,
  getAreaCadastralNumber: PropTypes.func.isRequired,
  getAreaRenterName: PropTypes.func.isRequired,
  filterRenters: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedRenterId: PropTypes.string.isRequired,
  onRenterChange: PropTypes.func.isRequired,
  onDatePick: PropTypes.func.isRequired,
  dateOfExchange: PropTypes.object,
};

export default ExchangeAreaForm;
