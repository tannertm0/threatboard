'use client';
import React, { useState, useRef } from 'react';
import { classifyImage } from '@/lib/aiDetection';
import { Loader2, Upload, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import Image from 'next/image';

export default function UploadDetector() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResults(null);
    setShowDetails(false);

    try {
      // Convert file to blob
      const blob = new Blob([file], { type: file.type });
      
      // Get comprehensive classification results
      const classificationResults = await classifyImage(blob);
      
      // Calculate weighted confidence score
      const confidencePercentage = Math.round(classificationResults.combinedScore * 10000) / 100;
      
      setResults({
        percentage: confidencePercentage,
        details: {
          aiScore: classificationResults.aiScore,
          artifactScore: classificationResults.artifactScore,
          metadataScore: classificationResults.metadataScore,
          patternScore: classificationResults.patternScore
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    } else {
      setError('Please upload an image file');
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  // Determine the result message based on confidence level
  const getResultMessage = (confidence) => {
    if (confidence < 10) {
      return "Definitely AI-generated";
    } else if (confidence < 30) {
      return "Most likely AI-generated";
    } else if (confidence < 40) {
      return "Pretty sure it's AI-generated";
    } else if (confidence < 60) {
      return "Uncertain - inconclusive result";
    } else if (confidence < 70) {
      return "Pretty sure it's real";
    } else if (confidence < 90) {
      return "Most likely real";
    } else {
      return "Definitely real";
    }
  };

  // Determine the result color based on confidence level
  const getResultColor = (confidence) => {
    if (confidence < 10) {
      return "text-destructive";
    } else if (confidence < 30) {
      return "text-destructive/80";
    } else if (confidence < 40) {
      return "text-yellow-500";
    } else if (confidence < 60) {
      return "text-yellow-500";
    } else if (confidence < 70) {
      return "text-green-500/80";
    } else if (confidence < 90) {
      return "text-green-500";
    } else {
      return "text-green-600";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-lg border border-border">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32">
          <Image
            src="/logo.png"
            alt="ThreatBoard Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Upload Image for AI Analysis
        </label>
        <div 
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          } border-dashed rounded-lg transition-colors cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleAreaClick}
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click or drag and drop an image here</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-6 rounded-md bg-yellow-500/10 p-4 border border-yellow-500/20">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-foreground">Disclaimer</h3>
            <div className="mt-2 text-sm text-muted-foreground">
              <p>This AI Detector is still wrong sometimes, especially with artwork. Results should be considered as guidance only and not definitive proof.</p>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Analyzing image...</span>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-destructive/10 p-4 border border-destructive/20">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-foreground">Error</h3>
              <div className="mt-2 text-sm text-muted-foreground">{error}</div>
            </div>
          </div>
        </div>
      )}

      {results !== null && !loading && !error && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Confidence Level</span>
            <span className="text-sm font-medium text-foreground">{results.percentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                results.percentage >= 90 ? 'bg-green-600' : 
                results.percentage >= 70 ? 'bg-green-500' : 
                results.percentage >= 60 ? 'bg-green-500/80' : 
                results.percentage >= 40 ? 'bg-yellow-500' : 
                results.percentage >= 30 ? 'bg-yellow-500' : 
                results.percentage >= 10 ? 'bg-destructive/80' : 
                'bg-destructive'
              }`}
              style={{ width: `${results.percentage}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm font-medium">
            <span className={getResultColor(results.percentage)}>{getResultMessage(results.percentage)}</span>
          </div>
          
          {/* Detailed breakdown */}
          <div className="mt-4">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Info className="h-4 w-4 mr-1" />
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
            
            {showDetails && (
              <div className="mt-2 p-3 bg-muted rounded-md">
                <h4 className="text-sm font-medium mb-2">Detection Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">AI Pattern Detection</span>
                    <span className="text-xs font-medium">{Math.round(results.details.aiScore * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Artifact Analysis</span>
                    <span className="text-xs font-medium">{Math.round(results.details.artifactScore * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Pattern Analysis</span>
                    <span className="text-xs font-medium">{Math.round(results.details.patternScore * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Metadata Analysis</span>
                    <span className="text-xs font-medium">{Math.round(results.details.metadataScore * 100)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 