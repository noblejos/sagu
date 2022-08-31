//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//the rarible dependency files are needed to setup sales royalties on Rarible 
import "./raribles/royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "./raribles/royalties/contracts/LibPart.sol";
import "./raribles/royalties/contracts/LibRoyaltiesV2.sol";



contract NFTickets is ERC721Enumerable, Ownable, RoyaltiesV2Impl{
    using Strings for uint256;
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    string public baseURI;
    string public baseExtension = "";
    uint256 public cost = 0.000002 ether;
    uint256 public maxSupply = 2000;
    uint256 public maxMintAmount = 5;

    uint customCounter;

    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    // ipfs://QmY2hWG4hTN7LZvYZALRd7T5n2HYVXUGkCw2Ft9aAaq75i/;
 
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
      

    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }


  

    // Minting function
    function mint(
        uint256 _mintAmount,
        string memory _tokenURI
    ) public payable returns (bool){
        require(_mintAmount > 0);
        // require(msg.value >= cost * _mintAmount, "Insufficient amount for mint");

        // set metada url
        setBaseURI(_tokenURI);

        // execute mint
        for (uint256 i = 0; i < _mintAmount; i++) {
            uint256 newTokenID = _tokenIds.current();
            _safeMint(msg.sender, newTokenID);
            _tokenIds.increment();
        }

        return true;
    }

   


    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    //functions below can only be executed by owner

    // set or update mint cost/price
    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    // set or update max number of mint per mint call
    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    // set metadata url function
    function setBaseURI(string memory _newBaseURI) private {
        baseURI = _newBaseURI;
    }

    // set metadata base extention
    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }


    function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
        tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function withdraw() public onlyOwner {
    
     (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
    require(success);
    
  }

  function getBalance() public onlyOwner view returns (uint256) {
    
   uint256 bal = address(this).balance;
   return bal;
    
  }

     //configure royalties for Rariable
    function setRoyalties(uint _tokenId, address payable _royaltiesRecipientAddress, uint96 _percentageBasisPoints) public onlyOwner {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesRecipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }


    //configure royalties for Mintable using the ERC2981 standard
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
      //use the same royalties that were saved for Rariable
      LibPart.Part[] memory _royalties = royalties[_tokenId];
      if(_royalties.length > 0) {
        return (_royalties[0].account, (_salePrice * _royalties[0].value) / 10000);
      }
      return (address(0), 0);
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable) returns (bool) {
        if(interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }

        if(interfaceId == _INTERFACE_ID_ERC2981) {
          return true;
        }

        return super.supportsInterface(interfaceId);
    }


    
}


