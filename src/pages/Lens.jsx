import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const Lens = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState("Loading AI...");

  // 1. Load the AI Model on mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Loading MobileNet...");
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        console.log("Model Loaded");
      } catch (err) {
        console.error("Failed to load model", err);
      }
    };
    loadModel();
  }, []);

  // 2. Run detection loop
  useEffect(() => {
    const interval = setInterval(async () => {
      if (model && webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const predictions = await model.classify(video);
        
        if (predictions && predictions.length > 0) {
          setPrediction(`${predictions[0].className} (${Math.round(predictions[0].probability * 100)}%)`);
        }
      }
    }, 1000); // Run every 1 second

    return () => clearInterval(interval);
  }, [model]);

  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden">
      {/* Camera Feed */}
      <Webcam
        ref={webcamRef}
        audio={false}
        className="absolute inset-0 w-full h-full object-cover"
        videoConstraints={{ facingMode: "environment" }} 
      />

      {/* Overlay UI */}
      <div className="absolute bottom-10 left-5 right-5 bg-white/90 p-4 rounded-xl text-black shadow-lg backdrop-blur-md">
        <h2 className="font-bold text-lg text-yellow-600">CultureVerse Lens</h2>
        <p className="text-sm text-gray-700">Detected: {prediction}</p>
      </div>
    </div>
  );
};

export default Lens;