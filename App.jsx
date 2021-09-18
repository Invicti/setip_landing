import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Artboard from "./components/Artboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:path(|artboard)">
          <Artboard {...artboardData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
const copyActionData = {
  src: "/img/artboard-shape-E34485C9-10E2-48DF-BEB7-FC195C7212AF@2x.png",
};

const artboardData = {
  poweredAndHostedB: "Powered and hosted by setip.io",
  setipioLlc2: "© setipio, LLC. 2021",
  oneApiOneIpOwn: "One API, one IP, own your cloud",
  commandarea: (
    <>
      curl -X &quot;POST&quot; &quot;http://api.setip.io/api/ip&quot; \<br /> -H
      &#x27;Content-Type: application/json; charset=utf-8&#x27; \<br /> -d
      $&#x27;&#x7B; \<br /> &quot;email&quot;:
      &quot;TYPE/PASTE_YOUR_EMAIL&quot;, \<br /> &quot;password&quot;:
      &quot;TYPE/PASTE_YOUR_PASSWORD&quot;, \<br /> &quot;username&quot;:
      &quot;OPTIONAL_TYPE/PASTE_YOUR_USERNAME&quot;, \<br /> &quot;dns&quot;:
      &quot;PASTE_YOUR_DOMAIN_NAME_IF_YOU_HAVE_ONE&quot;, \<br />{" "}
      &quot;coupon&quot; : &quot;PASTE_COUPON_CODE_TO_SKIP_THE_LINE&quot; \
      <br /> &#x7D;&#x27;
    </>
  ),
  spanText:
    "Posting to this API will returns your IP address and bundled services.",
  spanText2: " ",
  spanText3: (
    <>
      <br />
      <br />
      For security reason: The service becomes available to you only after your
      confirm the email sent to you after POSTing to the API, so replace the
      json payload with:
      <br />{" "}
    </>
  ),
  spanText4: (
    <>
      TYPE/PASTE_YOUR_EMAIL.
      <br />
    </>
  ),
  spanText5: (
    <>
      <br />
      If you would like to bring your own domain you also get a pre-configured
      DNS server. DNS will provide you with end-points such as domain.org,
      api.domain.org, app.domain.org. <br />
      In that case enter the name for the domain in:
      <br />
    </>
  ),
  spanText6: "PASTE_YOUR_DOMAIN_NAME_IF_YOU_HAVE_ONE",
  spanText7: (
    <>
      {" "}
      <br />
      <br />
      You will be provided with common DNS entries to reach any of of your
      devices securely: on any port and no routing configuration.
      <br />
      <br />
      IF you got a coupon to skip the line, congrats! then replace:
      <br />
    </>
  ),
  spanText8: "PASTE_COUPON_CODE_TO_SKIP_THE_LINE",
  spanText9: (
    <>
      {" "}
      <br />
      <br />
      Access to your network is secured and compatible and supports wireguard
      encryption, so you can also connect many supported routers. But you get a
      very cool router attached to your new IP, so: no sweat.
      <br />
      <br />
      Think a web server, of course, but also an ethereum node, or just a bunch
      of people who work remotely and want to share the same LAN across the
      universe without intruding their existing network setup.
    </>
  ),
  deployInternetFaci: "Deploy Internet facing servers without a dedicated IP",
  supportsInternetSt: "Supports Internet standards",
  dnsIpEntriesToSh: "DNS/IP entries to share your IP for easy access",
  autoSslForHttpH: "Auto SSL for HTTP, HTTP2 and QUIC end-points",
  copyActionProps: copyActionData,
};
