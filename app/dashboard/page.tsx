import { useState } from "react";
import { User } from "lucide-react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";

import TranslucentHeader from "./components/TranslucentHeader";
import GreenFooter from "./components/GreenFooter";
import HomePageHeader from "./components/HomePageHeader";
import SoilTypeSelector from "./components/SoilTypeSelector";
import PestIdentification from "./components/PestIdentification";
import CropRecommendation from "./components/CropRecommendation";
import AuthModal from "./components/AuthModal";
import LandingPage from "./components/LandingPage";

interface CropData {
  nitrogen: number | "";
  phosphorus: number | "";
  potassium: number | "";
  temperature: number | "";
  humidity: number | "";
  ph: number | "";
  rainfall: number | "";
  soilType: string;
}

const steps = [
  { key: "nitrogen", label: "Nitrogen", placeholder: "Enter Nitrogen value", icon: User },
  { key: "phosphorus", label: "Phosphorus", placeholder: "Enter Phosphorus value", icon: User },
  { key: "potassium", label: "Potassium", placeholder: "Enter Potassium value", icon: User },
  { key: "temperature", label: "Temperature", placeholder: "Enter Temperature (°C)", icon: User },
  { key: "humidity", label: "Humidity", placeholder: "Enter Humidity (%)", icon: User },
  { key: "ph", label: "pH Level", placeholder: "Enter pH (0–14)", icon: User },
  { key: "rainfall", label: "Rainfall", placeholder: "Enter Rainfall (mm)", icon: User },
  { key: "soilType", label: "Soil Type", placeholder: "Select Soil Type", icon: User },
];

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cropData, setCropData] = useState<CropData>({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
    soilType: "",
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [predictionDone, setPredictionDone] = useState(false);

  const handleInputChange = (value: string | number) => {
    const key = steps[currentStep].key as keyof CropData;
    setCropData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSoilTypeChange = (value: string) => {
    setCropData((prev) => ({ ...prev, soilType: value }));
  };

  const handleLogin = () => {
    setShowAuthModal(false);
  };

  const handleSignup = () => {
    setShowAuthModal(false);
  };

  if (!steps[currentStep]) {
    return <LandingPage />;
  }

  const currentStepData = steps[currentStep];
  const currentValue = cropData[currentStepData.key as keyof CropData];

  return (
    <>
      <TranslucentHeader />
      <HomePageHeader />

      {!predictionDone ? (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="w-full bg-white/20 rounded-full h-2 mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">{currentStepData.label}</h2>
            <p className="text-white/70">{currentStepData.placeholder}</p>
          </div>

          <div className="max-w-md mx-auto">
            {currentStepData.key === "soilType" ? (
              <SoilTypeSelector value={currentValue} onChange={handleSoilTypeChange} />
            ) : (
              <input
                type="number"
                step="0.01"
                min="0"
                max={currentStepData.key === "ph" ? "14" : undefined}
                placeholder={currentStepData.placeholder}
                value={currentValue}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full px-6 py-4 text-xl text-center bg-white/90 rounded-2xl border-none outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 font-medium"
                autoFocus
              />
            )}
          </div>

          <div className="flex justify-between items-center mt-10">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-300"
              >
                Back
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => setPredictionDone(true)}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                Predict Crop
              </button>
            )}
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="prediction-result">
          <h2 className="text-4xl font-bold text-white mb-8 opacity-0 animate-fade-in">
            🌾 Your Perfect Crop Match
          </h2>
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 max-w-5xl mx-auto mb-6 shadow-2xl">
            <CropRecommendation cropData={cropData} />
          </div>
          <div className="flex justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <User className="inline-block mr-2" size={20} />
                  Save Your Results
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}

      <PestIdentification />

      <GreenFooter />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </>
  );
};

export default App;
