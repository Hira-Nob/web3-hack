import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import tokenPageStyles from "../styles/Token.module.css";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import SaleInfo from "../components/SaleInfo/SaleInfo";
import LumaEmbed from "../components/LumaApi/LumaEnbed";
import ImagePopup from "../components/PopUp/ImagePopup";

export default function Sell() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);

  const [selectedNft, setSelectedNft] = useState<NFTType>();

  const [slug, setSlug] = useState<string>();
  const [qrPath, setQRPath] = useState<string>();
  // const slug = (selectedNft?.metadata?.attributes as Array<{ trait_type: string; value: string }>)[0]?.value;


  return (
    <Container maxWidth="lg">
      <h1>Sell NFTs</h1>
      {!selectedNft ? (
        <>
          <p>Select which NFT you&rsquo;d like to sell below.</p>
          <NFTGrid
            data={data}
            isLoading={isLoading}
            overrideOnclickBehavior={(nft) => {
              setSelectedNft(nft);
              setSlug((nft.metadata.attributes as Array<{ trait_type: string; value: string }>)[0]?.value);
              setQRPath("/marker_"+(nft.metadata.attributes as Array<{ trait_type: string; value: string }>)[0]?.value+".png");
            }}
            emptyText={
              "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
            }
          />
        </>
      ) : (
        <div className={tokenPageStyles.container} style={{ marginTop: 0 }}>
          <div className={tokenPageStyles.metadataContainer}>
            <div className={tokenPageStyles.imageContainer}>
              {/* <ThirdwebNftMedia
                metadata={selectedNft.metadata}
                className={tokenPageStyles.image}
              /> */}
              <LumaEmbed slug={slug!} />
              <ImagePopup imageUrl={qrPath!} />
              <p>{qrPath}</p>
              <button
                onClick={() => {
                  setSelectedNft(undefined);
                }}
                className={tokenPageStyles.crossButton}
              >
                X
              </button>
            </div>
          </div>

          <div className={tokenPageStyles.listingContainer}>
            <p>You&rsquo;re about to list the following item for sale.</p>
            <h1 className={tokenPageStyles.title}>
              {selectedNft.metadata.name}
            </h1>
            <p className={tokenPageStyles.collectionName}>
              Token ID #{selectedNft.metadata.id}
            </p>

            <div className={tokenPageStyles.pricingContainer}>
              <SaleInfo nft={selectedNft} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
