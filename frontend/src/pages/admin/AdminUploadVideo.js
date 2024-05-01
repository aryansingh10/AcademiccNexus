// Import React and useState hook
import React, { useState } from 'react';
// Import Firebase storage
import { storage } from './firebase'; // Adjust the path according to your actual folder structure

// Define AdminUploadVideo component
const AdminUploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);

  // Function to handle file input change
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  // Function to handle video upload
  const handleUpload = () => {
    if (!video) {
      console.error('No video selected');
      return;
    }
    const uploadTask = storage.uploadBytes(`videos/${video.name}`, video);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.error('Upload error:', error);
      },
      () => {
        // Completion function
        storage
          .ref('videos')
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            console.log('Video uploaded:', url);
            // Here, you can save the video URL to your database
          });
      }
    );
  };

  // Render component JSX
  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <progress value={progress} max="100" />
    </div>
  );
};

// Export AdminUploadVideo component
export default AdminUploadVideo;
