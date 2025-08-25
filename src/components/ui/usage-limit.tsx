import { AlertTriangle, Crown } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

interface UsageLimitProps {
  usageCount: number;
  maxUsage: number;
  onUpgrade: () => void;
}

export function UsageLimit({ usageCount, maxUsage, onUpgrade }: UsageLimitProps) {
  const percentage = (usageCount / maxUsage) * 100;
  const isNearLimit = percentage >= 80;
  const isAtLimit = usageCount >= maxUsage;
  
  if (!isNearLimit) return null;
  
  return (
    <Card className={`p-4 mb-6 border-2 ${isAtLimit ? 'border-destructive bg-destructive/5' : 'border-yellow-500 bg-yellow-500/5'}`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full ${isAtLimit ? 'bg-destructive/10' : 'bg-yellow-500/10'}`}>
          {isAtLimit ? (
            <AlertTriangle className="h-5 w-5 text-destructive" />
          ) : (
            <Crown className="h-5 w-5 text-yellow-600" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold mb-1">
            {isAtLimit ? 'Usage Limit Reached' : 'Approaching Usage Limit'}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3">
            {isAtLimit 
              ? `You've used all ${maxUsage} free calculations today. Upgrade for unlimited access!`
              : `You've used ${usageCount} of ${maxUsage} free calculations today.`
            }
          </p>
          
          <div className="w-full bg-muted rounded-full h-2 mb-3">
            <div 
              className={`h-2 rounded-full transition-all ${isAtLimit ? 'bg-destructive' : 'bg-yellow-500'}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          
          <Button 
            onClick={onUpgrade}
            size="sm"
            className="bg-gradient-primary"
          >
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </Card>
  );
}