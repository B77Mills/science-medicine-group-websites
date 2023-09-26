const Joi = require('@parameter1/joi');
const { get } = require('@parameter1/base-cms-object-path');
const regions = require('./regions');

/** Keys allowing authorization of alternate behavior */
const validKeys = JSON.parse(process.env.IDENTITYX_APP_API_KEYS || '[]');

/**
 * Ensures a valid auth key is present to modify default behavior
 *
 * @param {import('express').Request} req
 * @param {Boolean} defaultValue
 * @returns
 */
const validateAuthed = (req, defaultValue) => (v) => {
  if (v === defaultValue) return v;

  const authorization = req.get('authorization');
  if (!authorization) {
    const err = new Error('Authentication required to change this behavior.');
    err.statusCode = 401;
    throw err;
  }

  const [, key] = /^Bearer (.+)$/.exec(authorization) || [];
  if (!validKeys.includes(key)) {
    const err = new Error('Unauthorized');
    err.statusCode = 403;
    throw err;
  }

  return v;
};

/**
 * @typedef {import('@parameter1/base-cms-marko-web-identity-x/service')} IdentityX
 * @typedef {import('express').Request} Request
 * @typedef {Request & RequestContextProps} RequestContext
 * @typedef RequestContextProps
 * @prop {IdentityX} identityX
 * @prop {import('../service')} braze
 *
 * @param {RequestContext} req
 */
module.exports = (req) => {
  const { identityX, braze } = req;

  /**
   * @param {*} v
   * @param {import('joi').CustomHelpers} helpers
   */
  const customQuestionSchema = Joi.string().custom(async (v, helpers) => {
    const key = get(helpers, 'state.path.0');
    const questions = await braze.getDemographicQuestions(identityX);
    const question = questions.find((q) => q.externalId === key);
    if (!question) throw new Error(`Field ${key} is not present. Value cannot be accepted.`);
    // if (!question.active) throw new Error(`Field ${key} is not active. Cannot accept value.`);
    const answer = question.options.find((opt) => opt.externalIdentifier === v);
    if (!answer) throw new Error(`"${v}" is not a valid option for field "${key}."`);
    return answer.id;
  });

  return Joi.object({
    email: Joi.string().email().lowercase().required(),

    // Optional fields, used when inserting a new user or overwriting
    givenName: Joi.string(),
    familyName: Joi.string(),
    street: Joi.string(),
    addressExtra: Joi.string(),
    city: Joi.string(),
    countryCode: Joi.string().example('US')
      .length(2)
      .description('An ISO 3166-1 alpha-2 country code.'),
    regionCode: Joi
      .alternatives()
      .conditional('countryCode', [
        { is: 'US', then: Joi.string().valid(...Object.keys(regions.US)) },
        { is: 'MX', then: Joi.string().valid(...Object.keys(regions.MX)) },
        { is: 'CA', then: Joi.string().valid(...Object.keys(regions.CA)) },
        { is: true, then: Joi.string().min(1).max(3) },
      ])
      .example('WI')
      .description('An ISO 3166-2 region code.'),
    postalCode: Joi.string(),
    organization: Joi.string(),
    organizationTitle: Joi.string(),
    phoneNumber: Joi.string(),

    // IdX question/answers
    org_type: customQuestionSchema,
    profession: customQuestionSchema,
    technologies: Joi.array().items(customQuestionSchema),
    subspecialties: Joi.array().items(customQuestionSchema),

    // Behavior flags. An administrative API key is required to modify from the defaults.
    automaticOptIn: Joi.boolean().default(true)
      .description('Should the user be automatically added to the default subscription group?')
      .custom(validateAuthed(req, true)),
    sendVerificationEmail: Joi.boolean().default(true)
      .description('Should the user receive the IdentityX verification email?')
      .custom(validateAuthed(req, true)),
    overwriteIfPresent: Joi.boolean().default(false)
      .description('Should the supplied values overwrite existing profile data and sync to Braze?')
      .custom(validateAuthed(req, false)),
    automaticConfirm: Joi.boolean().default(false)
      .description('Should the user be automatically moved out of the unconfirmed subscription group?')
      .custom(validateAuthed(req, false)),
    updateBraze: Joi.boolean().default(true)
      .description('Should the user data be automatically synced to Braze?')
      .custom(validateAuthed(req, true)),
  });
};
