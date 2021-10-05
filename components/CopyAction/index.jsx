import React from "react";
import styled from "styled-components";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function CopyAction(props) {
  const { src } = props;
//const tocopy = "curl%20-X%20%22POST%22%20%22http%3A//setip.io/api/ip%22%20%5C%0A-H%20%27Content-Type%3A%20application/json%3B%20charset%3Dutf-8%27%20%5C%0A-d%20%24%27%7B%20%5C%0A%22email%22%3A%20%22TYPE/PASTE_YOUR_EMAIL%22%2C%20%5C%0A%22password%22%3A%20%22TYPE/PASTE_YOUR_PASSWORD%22%2C%20%5C%0A%22username%22%3A%20%22OPTIONAL_TYPE/PASTE_YOUR_USERNAME%22%2C%20%5C%0A%22dns%22%3A%20%22PASTE_YOUR_DOMAIN_NAME_IF_YOU_HAVE_ONE%22%2C%20%5C%0A%22coupon%22%20%3A%20%22PASTE_COUPON_CODE_TO_SKIP_THE_LINE%22%20%5C%0A%7D%27";
 const tocopy = `curl -X "POST" "https://api.setip.io/api/ip" \
 -H 'Content-Type: application/json; charset=utf-8' \
 -d $'{ \
 "email": "TYPE/PASTE_YOUR_EMAIL", \
 "password": "TYPE/PASTE_YOUR_PASSWORD", \
 "username": "OPTIONAL_TYPE/PASTE_YOUR_USERNAME", \
 "dns": "PASTE_YOUR_DOMAIN_NAME_IF_YOU_HAVE_ONE", \
 "coupon" : "PASTE_COUPON_CODE_TO_SKIP_THE_LINE" \
 }'` 
return <CopyToClipboard 
  text={decodeURI(tocopy)}
  onCopy={() => {
    console.log(tocopy)
  }}>
  <CopyAction1 className="smart-layers-pointers" style={{ backgroundImage: `url(${src})` }}></CopyAction1>
</CopyToClipboard>;
}

const CopyAction1 = styled.div`
  width: 27px;
  height: 30px;
  margin-left: 486px;
  margin-top: 18px;
  transition: all 0.2s ease-in-out;
  background-size: 100% 100%;
  pointer-events: auto;

  &:hover {
    transform: scale(1.1);
  }
`;

export default CopyAction;
