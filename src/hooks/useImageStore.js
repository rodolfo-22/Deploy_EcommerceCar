import { useState } from "react";
import axios from "axios";

export const useImageStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImages = async (files) => {
    setLoading(true);
    setError(null);
    const urls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        urls.push(response.data.secure_url);
      } catch (err) {
        console.error("Error al subir la imagen:", err);
        setError("Error al subir una o más imágenes");
        break;
      }
    }

    setLoading(false);
      console.log("Uploaded image URLs:", urls); // Verifica todas las URLs subidas

    return urls;
  };

  return { uploadImages, loading, error };
};

