export class SSOConfiguration {
    enabled: boolean;
    issuer: string;
    url: string;
    clientId: string;
    responseType: string;
    scope: string;
    redirectUri: string;
    logout_redirect_uri: string;
    logLevel: number;
    origin: string;
    clientSecret: string;
    loginURL: string;
    logoutURL: string;
    grantTypes: string;
    endSessionURL: string;
}
