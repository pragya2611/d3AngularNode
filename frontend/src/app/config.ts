let URL: string;
if(typeof window != "undefined")
    URL = window.location.protocol + "//" + window.location.host;
else
    URL = 'http://localhost:3006';

export const HOST_URL: string = URL;
// export const DEPLOY_URL : string = 'http://34.73.93.195:3006';
export const DEPLOY_URL : string = 'http://localhost:3000';
export const API_URL : string = '/api/';