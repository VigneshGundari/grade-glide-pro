import { Crown, X } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

interface PremiumUpgradeProps {
  onClose: () => void;
  onUpgrade: () => void;
}

export function PremiumUpgrade({ onClose, onUpgrade }: PremiumUpgradeProps) {
  return (
    <Card className="fixed top-4 right-4 w-80 bg-gradient-primary text-primary-foreground p-6 shadow-glow z-50">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-primary-foreground/70 hover:text-primary-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-center space-x-2 mb-3">
        <Crown className="h-5 w-5 text-yellow-300" />
        <h3 className="font-semibold">Upgrade to Premium</h3>
      </div>
      
      <p className="text-sm mb-4 text-primary-foreground/90">
        Remove ads, get unlimited calculations, and access advanced features!
      </p>
      
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
          <span>Ad-free experience</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
          <span>Unlimited calculations</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
          <span>Export to PDF</span>
        </div>
      </div>
      
      <Button 
        onClick={onUpgrade}
        className="w-full bg-white text-primary hover:bg-white/90"
      >
        Upgrade Now - $4.99
      </Button>
    </Card>
  );
}