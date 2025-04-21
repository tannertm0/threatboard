import UploadDetector from '@/components/UploadDetector';

export default function AIDetectorPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">AI Image Detector</h1>
      <p className="text-muted-foreground mb-8">
        Upload images to analyze their content using AI classification.
      </p>
      <UploadDetector />
    </div>
  );
} 