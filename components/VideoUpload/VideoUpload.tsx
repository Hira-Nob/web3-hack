import styles from './VideoUpload.module.css';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onFileChange: (file: File) => void;
}

export function VideoUpload({ onFileChange }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);  // (1)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);  // (2)
      onFileChange(file);
    }
  }, [onFileChange])

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          動画をアップロード
        </p>
      </div>
      {fileName && <p className={styles.fileName}>{fileName}</p>}  
    </div>
  );
}
