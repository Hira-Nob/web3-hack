import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import LumaAIApiForm from "../components/LumaApi/LumaAIAPIForm";
import LumaEmbed from "../components/LumaApi/LumaEnbed";

export default function Mint() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  return (
    <Container maxWidth="lg">
      <h1>Mint NFTs</h1>
      <p>動画から3D NFTを生成</p>
      <LumaAIApiForm />
      {/* <LumaEmbed  slug="d2d2badd-8bdd-4874-84f7-9df2aae27f29" /> */}
    </Container>
  );
}
