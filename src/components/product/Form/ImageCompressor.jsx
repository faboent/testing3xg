import Compressor from "compressorjs";

export const handleBeforeUpload = async (file) => {
  if (file.size / 1024 / 1024 > 2) {
    alert(`${file.name} is larger than 2MB.`);
    return false;
  }

  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      success(compressedFile) {
        resolve(compressedFile);
      },
      error(err) {
        console.error("Compression Error:", err);
        reject(err);
      },
    });
  });
};
