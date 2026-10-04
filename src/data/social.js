import { SCHOOL } from "./school";

// Footer social buttons. A button only shows when its `url` is filled in.
// FACEBOOK: paste the school's real Facebook page link into FACEBOOK_PAGE below.
// Until then the icon opens a Facebook search for the school name.
const FACEBOOK_PAGE = "";
const FACEBOOK_SEARCH = `https://www.facebook.com/search/top?q=${encodeURIComponent("New Central Academy Barhalganj Gorakhpur")}`;
export const SOCIALS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    url: `https://wa.me/91${SCHOOL.whatsapp}?text=${encodeURIComponent(
      "Hello, I would like to know more about New Central Academy."
    )}`,
    icon: "M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21Zm6-12.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2L9 8.5Z",
  },
  {
    key: "facebook",
    label: "Facebook",
    url: FACEBOOK_PAGE || FACEBOOK_SEARCH,
    icon: "M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5a.5.5 0 0 1 .5-.5H15V3Z",
  },
  {
    key: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/@new_central_academy",
    icon: "M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Zm7 1.5v5l4.5-2.5L10 9.5Z",
  },
  {
    key: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/new_centralacademy/",
    icon: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-2.5h.01",
  },
];
