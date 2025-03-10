import { subDomainList } from "./constant";

export const getApps = () => {
  const subdomain = getSubDomain(window.location.hostname);
  const mainApp = subDomainList.find((app) => app.main);

  if (!subdomain) return mainApp.app;

  const apps = subDomainList.find((app) => subdomain === app.subdomain);
  return apps ? apps.app : mainApp.app;
};

// url.localhost
// url.urlbestshort.com
export const getSubDomain = (location) => {
  // Handle production domain (vercel)
  if (location.includes("vercel.app")) {
    const parts = location.split(".");
    return parts[0] === "smal-link" ? "" : parts[0];
  }

  // Handle localhost
  if (location.includes("localhost")) {
    const parts = location.split(".");
    return parts[0] === "localhost" ? "" : parts[0];
  }

  // Handle custom domain if you add one in the future
  const parts = location.split(".");
  return parts.length > 2 ? parts[0] : "";
};
