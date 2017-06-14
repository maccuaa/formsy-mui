import injectTapEventPlugin from 'react-tap-event-plugin';

let INJECTED = false;

export default function () {
  if (!INJECTED) {
    injectTapEventPlugin();
    INJECTED = true;
  }
}
