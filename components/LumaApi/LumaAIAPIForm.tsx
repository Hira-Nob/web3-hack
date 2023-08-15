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
  const [file, setFile] = useState<File | null>(null);

  const apiClient = new LumaAIApiClient(process.env.NEXT_PUBLIC_LUMAAI_API_KEY || '');

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

  const handleUploadSubmit = async () => {
    try {
      if (file) {
        const status=await apiClient.upload(uploadURL,file);
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
    await handleUploadSubmit();
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


            {/* Upload File */}
            <h2>Upload File</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={handleUploadSubmit}>Upload</button>


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
      <button
                onClick={handleMakeNerf}>
                Make Nerf
      </button>
      {/* Success or Error Messages */}
      <div>{message}</div>

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
