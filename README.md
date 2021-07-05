# strapi-provider-email-gmail-api

Yet another Strapi email provider for Gmail using OAuth 2.0 ;)

## Installation

Please note that Strapi can't handle scoped provider packages. Therefor it's required to install this package with a different alias.

```bash
npm i --save strapi-provider-email-gmail-api@npm:@bztes/strapi-provider-email-gmail-api
```

The **`package.json`** should then look something like this:

```json
  "dependencies": {
    // ...
    "strapi-provider-email-gmail-api": "npm:@bztes/strapi-provider-email-gmail-api@1.0.0",
    // ...
  }
```

## Preparing Google API

Enable the Gmail API with OAuth authentication in 5 steps

### Create a new Project

1. Open the [Google Console](https://console.cloud.google.com/)
2. Create a new Project

### Enable Gmail API

1. In the [Google Console](https://console.cloud.google.com/) select 'APIs & Services' -> 'Library'
2. Search for 'Gmail' and click on enable

### Configure OAuth consent screen

1. In the [Google Console](https://console.cloud.google.com/) select 'APIs & Services' -> 'OAuth consent screen'
2. Select User Type 'Internal'
3. Provide an App name and email address and click on 'save and continue'
4. Click on 'add or remove scope'
5. Select 'Gmail API .../auth/gmail.send' and click on 'update' and then 'save and continue'

### Add Credentials

1. In the [Google Console](https://console.cloud.google.com/) select 'APIs & Services' -> 'Credentials'
2. Select 'create credentials' -> 'OAuth client ID'
3. Select 'Web application' and provide a name
4. For 'Authorized redirect URIs' add 'https://developers.google.com/oauthplayground'
5. Click on 'create'
6. Take the 'Client ID' and 'Client Secret'

### Connect a Gmail account

1. Open the [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click on settings and select 'Use your own OAuth credentials'
3. Enter your 'Client ID' and 'Client Secret' and click on 'close'
4. In Step 1 select 'Gmail API v1' -> '.../gmail.send' and click on 'Authorize APIs'
5. Authorize with your Gmail Account you want to send mails from
6. In Step 2 click on 'Exchange authorization code for tokens'
7. Click on Step 2 and take the 'Refresh Token'

## Provider Configuration

| Variable                          | Type   | Description                                                 | Required | Default |
| --------------------------------- | ------ | ----------------------------------------------------------- | -------- | ------- |
| provider                          | string | The name of this provider 'google'                          | yes      |         |
| providerOptions                   | object | Provider options                                            | yes      |         |
| providerOptions.auth.userId       | string | The mail address of the Google account to send e-mails from | yes      |         |
| providerOptions.auth.clientId     | string | OAuth 2.0 Client ID                                         | yes      |         |
| providerOptions.auth.clientSecret | string | OAuth 2.0 Client Secret                                     | yes      |         |
| providerOptions.auth.refreshToken | string | OAuth 2.0 Refresh Token                                     | yes      |         |
| settings                          | object | Settings                                                    | yes      |         |
| settings.defaultFrom              | string | Default sender mail address                                 | no       |         |
| settings.defaultReplyTo           | string | The receiver is asked to reply to                           | no       |         |

## Provider Configuration Example

config/plugins.js

```js
module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'gmail-api',
    providerOptions: {
      auth: {
        userId: 'mail@example.com',
        clientId: '123....321.apps.googleusercontent.com',
        clientSecret: 'ABC123...',
        refreshToken: '1//123XYZ...',
      },
    },
    settings: {
      defaultFrom: 'Example Inc. <no-reply@example.com>',
      defaultReplyTo: 'Example Inc. <mail@example.com>',
    },
  },
  // ...
});
```

## Resources

- [Google Console](https://console.cloud.google.com/)
- [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
- [Gmail API](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send)
