import ReactGA from "react-ga4";

const getUTMParams = () => {
  if (typeof window === "undefined") return {};
  const urlParams = new URLSearchParams(window.location.search);

  return {
    utm_source: urlParams.get("utm_source") || urlParams.get("utmSource") || "",
    utm_medium: urlParams.get("utm_medium") || urlParams.get("utmMedium") || "",
    utm_campaign: urlParams.get("utm_campaign") || urlParams.get("utmCampaign") || "",
  };
};

export const trackContactFormOpen = (source) => {
  const utm = getUTMParams();
  
  ReactGA.event("CONTACT_FORM_SUBMIT", {
    form_name: "contact_form",
    project_name: "Brigade-Budigere",
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    lead_source: source,
  });
};
