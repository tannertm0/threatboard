import { VulnerabilityBoard } from "@/components/vulnerability-board";

export default function BoardPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Vulnerability Board</h1>
      <p className="text-muted-foreground mb-8">
        Tracking the latest 30 CVEs from the vulnerability.circl.lu database
      </p>
      <VulnerabilityBoard />
    </div>
  );
} 