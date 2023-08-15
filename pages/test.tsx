import { useState } from "react";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";

export default function Buy() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  const [searchText, setSearchText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [mediaKey, setMediaKey] = useState(0);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleShowText = () => {
    setDisplayText(searchText);
  };

  const handleShowTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setCurrentTime(currentTime);
  };

  const handleMediaSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedMedia(file);
      setMediaType(file.type.startsWith("video") ? "video" : "image");
      setMediaKey(mediaKey + 1);
    }
  };

  return (
    <Container maxWidth="lg">
      <h1>Buy NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>

      <div>
        <label htmlFor="searchInput">Search NFTs:</label>
        <input
          type="text"
          id="searchInput"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <button onClick={handleShowText}>Show Text</button>
        <button onClick={handleShowTime}>Show Time</button>
      </div>

      {displayText && <p>Entered Text: {displayText}</p>}

      {currentTime && <p>Current Time: {currentTime}</p>}

      <div>
        <label htmlFor="mediaInput">Select Media:</label>
        <input
          type="file"
          id="mediaInput"
          accept="image/*, video/*"
          onChange={handleMediaSelect}
        />
      </div>

      {selectedMedia && (
        <div key={mediaKey}>
          <p>Selected {mediaType === "video" ? "Video" : "Image"}:</p>
          <div style={{ maxWidth: "100%", overflow: "hidden" }}>
            {mediaType === "video" ? (
              <video controls autoPlay loop width="100%" style={{ maxWidth: "400px" }}>
                <source src={URL.createObjectURL(selectedMedia)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={URL.createObjectURL(selectedMedia)}
                alt="Selected"
                style={{ width: "100%", maxWidth: "400px" }}
              />
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
