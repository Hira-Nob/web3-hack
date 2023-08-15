import { useState } from "react";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";

export default function Buy() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [mediaKey, setMediaKey] = useState(0);
  const [ipfsHash, setIpfsHash] = useState(""); // IPFSハッシュを保持

  const handleMediaSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedMedia(file);
      setMediaType(file.type.startsWith("image") ? "image" : "");
      setMediaKey(mediaKey + 1);
    }
  };

  const handleNFTCreate = async () => {
    const formData = new FormData();
    formData.append("file", selectedMedia);

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NTQ3NjJiOS04ZjhiLTQzZTQtYjk2MS1kNjMxMDlhYjAzZjQiLCJlbWFpbCI6IjJhcmEyNWF0MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjFmM2FjODYwMmYxZWE2MTdmMmMiLCJzY29wZWRLZXlTZWNyZXQiOiJmMjQ1N2Q1NDc0ZDViMWQ3Mjg5MDM0NDhjZDY5YWEyNGI1MjM3MWY0MWVjYWIxODFjMTVkYjhmODRmOTE4MzZiIiwiaWF0IjoxNjkyMDc1MTE4fQ.01oaaySnD-85mnpZBEm0Ut9abQN3fM5XNSt08Uma2tw`, // PinataのAPIキーを設定
      },
      body: formData,
    });

    const data = await response.json();
    const newIpfsHash = data.IpfsHash; // IPFSハッシュを取得
    setIpfsHash(newIpfsHash); // IPFSハッシュをセット

    // スマートコントラクトにNFTを作成するトランザクションを送信
    // ここで、newIpfsHashをNFTのメタデータとして指定することができます
    // スマートコントラクトの関数呼び出しやトランザクションは、
    // プロジェクトの環境に合わせて適切に実装する必要があります
  };

  return (
    <Container maxWidth="lg">
      <h1>Buy NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>

      <div>
        <label htmlFor="mediaInput">Select Media:</label>
        <input
          type="file"
          id="mediaInput"
          accept="image/*"
          onChange={handleMediaSelect}
        />
      </div>

      {selectedMedia && (
        <div key={mediaKey}>
          <p>Selected {mediaType === "image" ? "Image" : ""}:</p>
          {mediaType === "image" && (
            <div style={{ maxWidth: "100%", overflow: "hidden" }}>
              <img
                src={URL.createObjectURL(selectedMedia)}
                alt="Selected"
                style={{ width: "100%", maxWidth: "400px" }}
              />
            </div>
          )}
        </div>
      )}

      <button onClick={handleNFTCreate}>Create NFT</button>

      {/* IPFSハッシュを表示 */}
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
    </Container>
  );
}
