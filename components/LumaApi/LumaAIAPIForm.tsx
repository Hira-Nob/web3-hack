// components/LumaAIApiForm.tsx
import React, { useState } from 'react';
import LumaAIApiClient from '../../lib/api/LumaAIApiClient';
import LumaEmbed from './LumaEnbed';

const LumaAIApiForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [uploadURL, setUploadURL] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [downloadData, setDownloadData] = useState<string>('');
  const [responseData, setResponseData] = useState<any>(null);  // Add this line for response data
  const [videofile, setVideoFile] = useState<File | null>(null);
  const [imagefile, setImageFile] = useState<File | null>(null);
  const apiClient = new LumaAIApiClient(process.env.NEXT_PUBLIC_LUMAAI_API_KEY || '');
  const [imageIpfsHash, setImageIpfsHash] = useState<string>(""); // 画像のIPFSハッシュを保持
  const [metaIpfsHash, setMetaIpfsHash] = useState<string>(""); // メタデータのIPFSハッシュを保持

  const handleCreateSubmit = async () => {
    try {
        const data = await apiClient.create(title);
        setSlug(data["capture"]["slug"]);
        setMessage('Capture created successfully!');
        setResponseData(data);
        setUploadURL(data["signedUrls"]["source"]);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };



  const handleVideoUploadSubmit = async () => {
    try {
      if (videofile) {
        const status=await apiClient.upload(uploadURL,videofile);
        if (status==200){
          setMessage('Uploaded successfully!');
        }
        else{
          setMessage('Status: '+status+' Error: Upload failed!');
        }
      } else {
        setMessage('No file selected.');
      }
    } catch (error :any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleTriggerSubmit = async () => {
    try {
      const respponse = await apiClient.trigger(slug);
      if(respponse.status==200){
        setMessage('Triggered successfully!');
        setResponseData(respponse.data);
      }else{  
        setMessage('Status: '+respponse.status+' Error: Trigger failed!');
      }

    } catch (error :any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handlePinstaSubmit = async () => {
    const formData = new FormData();
    formData.append("file", imagefile!);
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: formData,
    });

    const data = await response.json();
    setResponseData(data);
    setImageIpfsHash(data.IpfsHash); //ImageのIPFSハッシュをセット


    const metadata = {
        title: title,
        slug: slug,
        image: "ipfs://"+imageIpfsHash,
    };
        
    const metaresponse = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body:  JSON.stringify(metadata),
    });


    const metaResponse = await metaresponse.json();
    setResponseData(metaResponse);
    setMetaIpfsHash(metaResponse.IpfsHash); //ImageのIPFSハッシュをセット



    // スマートコントラクトにNFTを作成するトランザクションを送信
    // ここで、newIpfsHashをNFTのメタデータとして指定することができます
    // スマートコントラクトの関数呼び出しやトランザクションは、
    // プロジェクトの環境に合わせて適切に実装する必要があります
  };


  



  // const handleCheckAndDownloadSubmit = async () => {
  //   try {
  //     const data = await apiClient.checkAndDownload(slug);
  //     setDownloadData(JSON.stringify(data, null, 2));
  //     setMessage('Data fetched successfully!');
  //   } catch (error :any ) {
  //     setMessage(`Error: ${error.message}`);
  //   }
  // };

  const handleMakeNerf = async () => {
    await handleCreateSubmit();
    await handleVideoUploadSubmit();
    // await handleTriggerSubmit();
  };

  return (
    <div>
      {/* Create Capture */}
      <h2>Create Capture</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreateSubmit}>Submit</button>

      {/* Upload Imagw */}
      <h2>Upload Thumbnail</h2>
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
      />

      {/* Upload Video */}
      <h2>Upload Video</h2>
      <input
        type="file"
        onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={handleVideoUploadSubmit}>Upload</button>


      {/* Trigger */}
      <h2>Trigger Capture</h2>

      <button onClick={handleTriggerSubmit}>Trigger</button>

      {/* Check and Download
      <h2>Check and Download Capture</h2>
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <button onClick={handleCheckAndDownloadSubmit}>Check and Download</button>
      <pre>{downloadData}</pre> */}
      <br/>
      <h2>Make Nerf Create Upload Trigger を順にすべて実行するボタン</h2>

      <button
          onClick={handleMakeNerf}>
          Make Nerf
      </button>

      <h2>Pinataにメタデータを保存する</h2>

      <button
          onClick={handlePinstaSubmit}>
          To Pinata
      </button>
      {/* Success or Error Messages */}
      <h3>{message}</h3>

      {responseData && (
        <div>
          <h3>Response Data</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
          <h4>{uploadURL}</h4>
          <h4>{slug}</h4>
        </div>

      )}
    </div>
  );
}

export default LumaAIApiForm;
