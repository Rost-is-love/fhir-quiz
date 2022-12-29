import axios from "axios";

export const hasUser = async () => {
  try {
    await axios.get("https://fhirquiz.edge.aidbox.app/auth/userinfo");

    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
};

export const main = async () => {
  const isUserLoggedIn = await hasUser();
  const hash = window.location.hash;

  if (!isUserLoggedIn && hash.length > 0) {
    console.log("window.location.href");
    window.location.href =
      "https://fhirquiz.edge.aidbox.app/Static/index.html/$show";
  }

  if (isUserLoggedIn && hash.length === 0) {
    window.location.href =
      "https://fhirquiz.edge.aidbox.app/Static/index.html/$show/#/mode";
  }
};
