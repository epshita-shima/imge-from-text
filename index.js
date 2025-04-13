// const express = require("express");
// const bodyParser = require("body-parser");
// const { PNG } = require("pngjs");
// const port = 5001;
// const app = express();
// app.use(bodyParser.json({ limit: "10mb" }));

// app.post("/upload-image", (req, res) => {
//   try {
//     const data = req.body.image;
//     const imageData = data.replace(/^data:image\/png;base64,/, "");
    
//     const convertInBinary = Buffer.from(imageData, "base64");
//     const convertInPixel = PNG.sync.read(convertInBinary);

//     let textData = "";
//     for (let i = 0; convertInPixel.data.length; i += 4) {
//       const charCode = convertInPixel.data[i];
//       if (charCode === 0) break;
//       textData += String.fromCharCode(charCode);
//     }

//     const extractedJSON = JSON.parse(textData);
//     res.json({ success: true, data: extractedJSON });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // or specify your frontend domain
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // base64 image decoding and JSON extracting logic
  const imageData = image.replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(imageData, 'base64');

  // Simulate JSON extraction (in real usage, use image parser/decoder)
  const extractedData = {
    message: 'Successfully extracted!',
    size: buffer.length,
  };

  res.status(200).json(extractedData);
}
