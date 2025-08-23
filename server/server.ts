import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as faceapi from "@vladmandic/face-api";
import canvas from "canvas";

const app = express();
const port = 3000;

// Multer storage
const upload = multer({ dest: "uploads/" });

// Bind face-api.js to node-canvas
const { Canvas, Image, ImageData } = canvas as any;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Load models once at startup
const MODEL_PATH = path.join(__dirname, "models");
async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
  console.log("✅ FaceAPI models loaded!");
}

// Utility to compute face descriptor
async function getFaceDescriptor(imagePath: string) {
  const img = await canvas.loadImage(imagePath);
  const detection = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();
  if (!detection) throw new Error("No face detected in " + imagePath);
  return detection.descriptor;
}

// API endpoint
app.post(
  "/api/face-verification",
  upload.fields([
    { name: "documentPhoto", maxCount: 1 },
    { name: "selfie", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files)
        return res.status(400).json({ message: "No files uploaded" });

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const docPath = files["documentPhoto"][0].path;
      const selfiePath = files["selfie"][0].path;

      const desc1 = await getFaceDescriptor(docPath);
      const desc2 = await getFaceDescriptor(selfiePath);

      const distance = faceapi.euclideanDistance(desc1, desc2);
      console.log("Similarity distance:", distance);

      if (distance < 0.6) {
        res.json({ success: true, message: "✅ Face verified successfully" });
      } else {
        res.json({ success: false, message: "❌ Face does not match" });
      }

      // cleanup temp files
      fs.unlinkSync(docPath);
      fs.unlinkSync(selfiePath);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
);

loadModels().then(() => {
  app.listen(port, () =>
    console.log(`🚀 Server running on http://localhost:${port}`),
  );
});
