import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import KnowledgeCard from "../components/KnowledgeCard";

const Lens = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detectedData, setDetectedData] = useState(null);

  // Load Model
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Detect Loop
  useEffect(() => {
    const interval = setInterval(async () => {
      if (model && webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const predictions = await model.classify(video);
        
        if (predictions && predictions.length > 0) {
          const bestGuess = predictions[0];

          // SIMULATION LOGIC: 
          // Real logic will go here later. For now, if it sees ANYTHING with > 60% confidence, 
          // show a mock card so you can see the UI.
          if (bestGuess.probability > 0.6 && !detectedData) {
            setDetectedData({
              title: bestGuess.className.split(',')[0], // Take first word
              origin: "Recognized Object",
              description: "This is an AI detected object. During the hackathon, this will pull real cultural data from Firebase based on the identified craft.",
            });
          }
        }
      }
    }, 2000); // Check every 2 seconds to save battery

    return () => clearInterval(interval);
  }, [model, detectedData]);

  return (
    <div className="h-screen w-full relative bg-black">
      <Webcam
        ref={webcamRef}
        audio={false}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        videoConstraints={{ facingMode: "environment" }}
      />
      
      {/* Scanner Line Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-1 bg-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.8)] animate-[scan_3s_ease-in-out_infinite] top-0 absolute"></div>
      </div>

      {/* The Popup Card */}
      {detectedData && (
        <KnowledgeCard 
          data={detectedData} 
          onClose={() => setDetectedData(null)} 
        />
      )}
    </div>
  );
};

export default Lens;