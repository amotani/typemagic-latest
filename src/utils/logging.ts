import mixpanel from "mixpanel-browser";
mixpanel.init("6c9df6d3354ff8bf3607e4c32c4ea07a");

export const log = (key: string, value?: { [key: string]: any }) => {
  // Implementing the mixpanel logging:
  // mixpanel.init('YOUR_TOKEN', {debug: true});
  mixpanel.track(key, value);
};

export const identify = (email: string) => {
  mixpanel.identify(email);
};

export const reset = () => {
  mixpanel.reset();
};
