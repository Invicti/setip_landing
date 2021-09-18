import React from "react";
import WindowAction from "../WindowAction";
import CopyAction from "../CopyAction";
import styled from "styled-components";
import {
  MonacoNormalSheenGreen18px,
  MonacoNormalSelectiveYellow18px,
  MonacoNormalEucalyptus18px,
  MonacoNormalEucalyptus16px,
  ValignTextMiddle,
} from "../../styledMixins";
import "./Artboard.css";

function Artboard(props) {
  const {
    poweredAndHostedB,
    setipioLlc2,
    oneApiOneIpOwn,
    commandarea,
    spanText,
    spanText2,
    spanText3,
    spanText4,
    spanText5,
    spanText6,
    spanText7,
    spanText8,
    spanText9,
    deployInternetFaci,
    supportsInternetSt,
    dnsIpEntriesToSh,
    autoSslForHttpH,
    copyActionProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="artboard screen">
        <StackFooter>
          <PoweredAndHostedB>{poweredAndHostedB}</PoweredAndHostedB>
          <SetipioLLC2>{setipioLlc2}</SetipioLLC2>
        </StackFooter>
        <StackTitle>
          <OneAPIOneIPOwn>{oneApiOneIpOwn}</OneAPIOneIPOwn>
        </StackTitle>
        <StackTerminal>
          <OverlapGroup1>
            <OverlapGroup>
              <WindowAction />
              <CopyAction src={copyActionProps.src} />
            </OverlapGroup>
            <CommandArea>{commandarea}</CommandArea>
          </OverlapGroup1>
          <PostingToThisAPI>
            <Span1>{spanText}</Span1>
            <Span2>{spanText2}</Span2>
            <Span3>{spanText3}</Span3>
            <Span4>{spanText4}</Span4>
            <Span3>{spanText5}</Span3>
            <Span4>{spanText6}</Span4>
            <Span3>{spanText7}</Span3>
            <Span4>{spanText8}</Span4>
            <Span3>{spanText9}</Span3>
          </PostingToThisAPI>
        </StackTerminal>
        <StackHeader>
          <StackUp>
            <DeployInternetFaci>{deployInternetFaci}</DeployInternetFaci>
            <SupportsInternetSt>{supportsInternetSt}</SupportsInternetSt>
            <DNSIPEntriesToSh>{dnsIpEntriesToSh}</DNSIPEntriesToSh>
            <AutoSSLForHTTPH>{autoSslForHttpH}</AutoSSLForHTTPH>
          </StackUp>
        </StackHeader>
      </div>
    </div>
  );
}

const StackFooter = styled.div`
  ${MonacoNormalEucalyptus16px}
  position: absolute;
  height: 20px;
  top: 1898px;
  left: 209px;
  display: flex;
  align-items: center;
`;

const PoweredAndHostedB = styled.p`
  width: 209px;
  text-align: center;
  letter-spacing: 1.27px;
  line-height: 21px;
  white-space: nowrap;
`;

const SetipioLLC2 = styled.div`
  width: 219px;
  text-align: center;
  letter-spacing: 1.27px;
  line-height: 21px;
  white-space: nowrap;
  margin-left: 200px;
`;

const StackTitle = styled.div`
  position: absolute;
  width: 685px;
  top: 133px;
  left: 169px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OneAPIOneIPOwn = styled.div`
  ${ValignTextMiddle}
  width: 687px;
  height: 40px;
  font-family: var(--font-family-monaco);
  color: var(--sheen-green);
  font-size: var(--font-size-l);
  text-align: center;
  letter-spacing: 1.67px;
  line-height: 1px;
`;

const StackTerminal = styled.div`
  position: absolute;
  width: 574px;
  top: 527px;
  left: 225px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OverlapGroup1 = styled.div`
  position: relative;
  width: 574px;
  height: 369px;
  border-radius: 8px;
`;

const OverlapGroup = styled.div`
  position: absolute;
  height: 369px;
  top: 0;
  left: 0;
  display: flex;
  padding: 12.5px 8.5px;
  align-items: flex-start;
  min-width: 574px;
  background-color: #000000d9;
  border-radius: 8px;
  border: 1.5px solid var(--sheen-green);
`;

const CommandArea = styled.p`
  position: absolute;
  width: 514px;
  top: 92px;
  left: 30px;
  font-family: var(--font-family-menlo-regular);
  color: var(--selective-yellow);
  font-size: var(--font-size-xs);
  letter-spacing: 0.5px;
  line-height: 29px;
`;

const PostingToThisAPI = styled.div`
  ${MonacoNormalSheenGreen18px}
  width: 575px;
  text-align: center;
  letter-spacing: 1.43px;
  line-height: 26px;
  margin-top: 46px;
`;

const Span1 = styled.span`
  ${MonacoNormalSheenGreen18px}
  letter-spacing: 0;
`;

const Span3 = styled.span`
  ${MonacoNormalEucalyptus18px}
  letter-spacing: 0;
`;

const Span4 = styled.span`
  ${MonacoNormalSelectiveYellow18px}
  letter-spacing: 0;
`;

const Span2 = styled.span`
  font-family: var(--font-family-monaco);
  color: var(--alizarin-crimson);
  font-size: var(--font-size-m);
  letter-spacing: 0;
`;

const StackHeader = styled.div`
  position: absolute;
  width: 561px;
  top: 183px;
  left: 224px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StackUp = styled.div`
  ${MonacoNormalEucalyptus18px}
  width: 561px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DeployInternetFaci = styled.div`
  ${ValignTextMiddle}
  width: 562px;
  height: 75px;
  text-align: center;
  letter-spacing: 1.43px;
  line-height: 25px;
`;

const SupportsInternetSt = styled.div`
  ${ValignTextMiddle}
  width: 287px;
  height: 75px;
  text-align: center;
  letter-spacing: 1.43px;
  line-height: 25px;
  margin-top: 20px;
`;

const DNSIPEntriesToSh = styled.div`
  ${ValignTextMiddle}
  width: 498px;
  height: 75px;
  text-align: center;
  letter-spacing: 1.43px;
  line-height: 25px;
  margin-top: 20px;
`;

const AutoSSLForHTTPH = styled.div`
  width: 467px;
  text-align: center;
  letter-spacing: 1.43px;
  line-height: 25px;
  margin-top: 20px;
`;

export default Artboard;
