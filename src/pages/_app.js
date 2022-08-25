import '../styles/globals.css'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
// import { MoralisProvider } from "react-moralis";

const supportedChainIds = [1, 4, 137];
const connectors = {
  injected: {},
};
// Moralis.initialize("aHfvLwbzNpErI12OK1uj2JaN6XUBEGwxL3FwQ2oU");
// Moralis.serverURL = "https://yimx3ecennxi.usemoralis.com:2053/server"
function MyApp({ Component, pageProps }) {
  return (
  <div>
    
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    > 
    {/* <MoralisProvider
      appId={"aHfvLwbzNpErI12OK1uj2JaN6XUBEGwxL3FwQ2oU"}
      serverUrl={"https://yimx3ecennxi.usemoralis.com:2053/server"}
    > */}
    <Component {...pageProps} />
    {/* </MoralisProvider> */}
    </ThirdwebWeb3Provider>
    
    </div>
    );
}

export default MyApp


// https://gateway.pinata.cloud/ipfs/bafkreiggxqgonlert4fizllyk6i34grhxdvg4bi24vpcy3zwsdcq2w3loa