import { useCallback } from "react";
import ReactGA from "react-ga4";

// ----------------------------------
// UTM utility
// ----------------------------------
const getUTMParams = () => {
  if (typeof window === "undefined") return {};
  const urlParams = new URLSearchParams(window.location.search);

  const getParam = (keys) => {
    for (const key of keys) {
      const val = urlParams.get(key);
      if (val) return val;
    }
    return null;
  };

  return {
    utm_source: getParam(["utm_source", "utmSource"]),
    utm_medium: getParam(["utm_medium", "utmMedium"]),
    utm_campaign: getParam(["utm_campaign", "utmCampaign"]),
    utm_keyword: getParam(["utm_keyword", "utmKeyword"]),
    utm_term: getParam(["utm_term", "utmTerm"]),
    utm_content: getParam(["utm_content", "utmContent"]),
  };
};

// ----------------------------------
// String normalizer helper
// ----------------------------------
const normalize = (str) => {
  return (str || "")
    .toLowerCase()
    .replace(/[_\s]+/g, "_")
    .trim();
};

// ----------------------------------
// Unified hook (fires both general + specific events)
// ----------------------------------
export const useLeadTracking = () => {
  const utmParams = getUTMParams();

  // 🔹 General Event
  const trackGeneralEvent = useCallback(
    (action, category, label, extra = {}) => {
      ReactGA.event({
        action,
        category,
        label,
        ...utmParams,
        ...extra,
      });
    },
    [utmParams]
  );

  // 🔹 Specific Event (Disabled to prevent multiple events)
  const trackSpecificEvent = useCallback(
    (action, category, label, extra = {}) => {
      // Disabled as requested to prevent redundant events like Footer_section_fill_form
    },
    []
  );

  // ----------------------------------
  // BUTTON CLICKS
  // ----------------------------------
  const trackButtonClick = useCallback(
    (source, action, propertyType = null) => {
      const label = `${source}${propertyType ? ` - ${propertyType}` : ""}`;

      // 1️⃣ General event
     
    },
    [trackGeneralEvent]
  );

  // ----------------------------------
  // FORM SUBMISSIONS
  // ----------------------------------
  const trackFormSubmission = useCallback(
    (source, formType, propertyType = null) => {
      const label = `${source}${propertyType ? ` - ${propertyType}` : ""}`;

      // 1️⃣ General event - use contact_form_submit as requested
      trackGeneralEvent("CONTACT_FORM_SUBMIT", "Form Submission", label, {
        lead_source: source,
        property_type: propertyType,
        funnel_stage:
          formType === "contact_form" ? "lead" : "site_visit_request",
      });
    },
    [trackGeneralEvent]
  );

  // ----------------------------------
  // FORM OPENS
  // ----------------------------------
  const trackFormOpen = useCallback(
    (source, formType, propertyType = null) => {
      const normalizedSource = normalize(source);
      const label =
        propertyType && !normalizedSource.includes(normalize(propertyType))
          ? `${source} - ${propertyType}`
          : source;

      // 1️⃣ General event - use contact_form_opened for opening
      
    },
    [trackGeneralEvent]
  );

  return {
    trackButtonClick,
    trackFormSubmission,
    trackFormOpen,
  };
};

// ----------------------------------
// Constants
// ----------------------------------
export const LEAD_SOURCES = {
  HERO: "hero_banner",
  OVERVIEW: "overview_section",
  PRICING_1BHK: "pricing_1BHK",
  PRICING_2BHK: "pricing_2BHK",
  PRICING_3BHK2T: "pricing_3BHK2T",
  PRICING_3BHK3T: "pricing_3BHK3T",
  PRICING_4BHK: "pricing_4BHK",
  PRICING_4BHKSTUDY: "pricing_4BHKstudy",
  MASTER_PLAN: "master_plan_section",
  FOOTER: "footer_section",
  CONTACT_FORM_LINK: "contact_form_internal_link",
  UNKNOWN: "unknown_source", 
};

export const PROPERTY_TYPES = {
  BHK1: "1BHK",
  BHK2: "2BHK",
  BHK32T: "3BHK2T",
  BHK33T: "3BHK3T",
  BHK4: "4BHK",
  BHK4STUDY: "4BHKstudy",
};
