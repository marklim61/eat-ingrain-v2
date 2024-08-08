// src/assets/instagram_gallery/index.js

// Import all images dynamically
const images = import.meta.glob('./*.{png,jpg,jpeg,svg}', { eager: true });

// Process images into a format suitable for exporting
const imagePaths = {};
for (const path in images) {
  const imageName = path.replace('./', '');
  imagePaths[imageName] = images[path].default;
}

export default imagePaths;