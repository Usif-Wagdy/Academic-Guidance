import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageDropzone({ onImageSelected }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onImageSelected(acceptedFiles[0]);
      }
    },
    [onImageSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border p-3 rounded-4 text-center bg-white pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>Drag 'n' drop or click to upload an image</p>
      )}
    </div>
  );
}
