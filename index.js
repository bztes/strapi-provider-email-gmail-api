const { google } = require("googleapis");
const MailComposer = require("nodemailer/lib/mail-composer");
const { removeUndefined } = require("strapi-utils");

function toWebsafeBase64(s) {
  return s.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createMail(options) {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return toWebsafeBase64(message.toString("base64"));
}

async function sendMail(providerOptions, settings, options) {
  const auth = new google.auth.OAuth2(
    providerOptions.auth.clientId,
    providerOptions.auth.clientSecret
  );
  auth.setCredentials({
    refresh_token: providerOptions.auth.refreshToken,
  });

  removeUndefined(options);
  options.from = options.from || settings.defaultFrom;
  options.replyTo = options.replyTo || settings.defaultReplyTo;
  const raw = await createMail(options);

  const gmail = google.gmail({ version: "v1", auth });
  return gmail.users.messages.send({
    auth,
    userId: providerOptions.auth.userId,
    resource: {
      raw,
    },
  });
}

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    return {
      send: async (options) => sendMail(providerOptions, settings, options),
    };
  },
};
