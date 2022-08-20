import { LSPFactory } from '@lukso/lsp-factory.js';


export const startProcess= async(myLSP3MetaData)=>{

   const account= await ethereum.request({ method: 'eth_requestAccounts', params: [] });

    const lspFactory = new LSPFactory(ethereum, {
    chainId: 2828,
    });
    const myContracts = await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
        digitalAssetMetadata: myLSP3MetaData,
      });
    //   console.log({myContracts})
}