const _ = require('lodash');

/**
 * Send email for users
 *
 * Provides rendering email templates ana sending emails for users
 *
 * Example of usage
 *
 * new EmailSender('your subject', 'template_name', res, {}).
 *       sendFor(['email1', 'email2'], err => ...);
 *
 * @constructor
 *
 * @param {String}
 * @param {String} name of template for rendering from private/templates
 * @param {Object} data for template
 * @param {Object} res from api
 */
class EmailSender {
  constructor(subject, templateName, res, templateDate) {
    this._res = res;
    this._subject = subject;
    this._templateName = templateName;
    this._templateDate = templateDate;

    this._sendEmail = this._sendEmail.bind(this);
  }
  /**
   * Send Email
   *
   * @private
   * @param {String}
   * @param {Function}
   */
  _sendEmail(recipient, callback) {
    this._res.mailer.send(this._templateName, {
      to: recipient,
      subject: this._subject,
      otherProperty: this._templateDate,
    }, callback);
  }

  /**
   * Send email for email addresses
   *
   * @param [Object] email addresses
   */
  sendFor(recipients, callback) {
    const emails = _.isArray(recipients) ? recipients : [recipients];
    emails.forEach(email => this._sendEmail(email, callback));
  }

  static hrefFor(req, path, data, asParams) {
    const rootUrl = `${req.protocol}://${req.get('host')}`;
    const domainPath = rootUrl.slice(-1) === '/' && rootUrl || `${rootUrl}/`;
    const dataToPath = !asParams ? key => `${data[key]}/` : key => `?${key}=${data[key]};`;
    const datePath = data ? Object.keys(data).map(dataToPath).join('') : '';

    return `${domainPath}${path}${datePath}`;
  }
  /**
   * Rerurn site name from full domain path
   *
   * @param {String} domain path
   * @return {String} site name
   */
  static extractDomain(url) {
    const domain = url.indexOf('://') > -1 ?
      url.split('/')[2] : url.split('/')[0];
    return domain.split(':')[0];
  }
}

module.exports = EmailSender;
