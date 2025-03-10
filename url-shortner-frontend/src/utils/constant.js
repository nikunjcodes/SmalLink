import AppRouter, { SubDomainRouter } from "../AppRouter";

export const subDomainList = [
  { subdomain: "", app: AppRouter, main: true },
  { subdomain: "s", app: SubDomainRouter, main: false },
];
