import '../styles/globals.css'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

const supportedChainIds = [1, 4, 137];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    > 
    <Component {...pageProps} />
    </ThirdwebWeb3Provider>
    </div>
    );
}

export default MyApp
