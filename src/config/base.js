"use strict";

let urlFrontend, urlBase, urlApi, urlGallery, urlBackoffice;

switch (process.env.NODE_ENV) {
  case "development":
  default:
    urlFrontend = "";
    urlBase = "http://192.168.0.61:3002";
    urlApi = `${urlBase}/api/v1`;
    urlGallery = `${urlBase}/files`;
    urlBackoffice = "";
    break;

  case "staging":
    urlFrontend = "";
    urlBase = "https://ofertasqr.diarco.com.ar";
    urlApi = `${urlBase}/api/v1`;
    urlGallery = `${urlBase}/files`;
    urlBackoffice = "";
    break;

  case "production":
    urlFrontend = "";
    urlBase = "https://ofertasqr.diarco.com.ar";
    urlApi = `${urlBase}/api/v1`;
    urlGallery = `${urlBase}/files`;
    urlBackoffice = "";
    break;
}

const Config = {
  urlFrontend: urlFrontend,
  urlBase: urlBase,
  urlApi: urlApi,
  urlGallery: urlGallery,
  urlBackoffice: urlBackoffice,
};

module.exports = Config;
