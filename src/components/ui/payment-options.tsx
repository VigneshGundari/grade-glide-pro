import { Crown, CreditCard, Wallet } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

interface PaymentOptionsProps {
  onClose: () => void;
}

export function PaymentOptions({ onClose }: PaymentOptionsProps) {
  // Stripe Checkout (no backend needed)
  const handleStripeCheckout = () => {
    window.open('https://buy.stripe.com/test_XXXXXXXXXX', '_blank');
  };

  // PayPal (no backend needed)
  const handlePayPalCheckout = () => {
    window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XXXXXXXXXX', '_blank');
  };

  // Paddle (no backend needed)
  const handlePaddleCheckout = () => {
    // @ts-ignore
    window.Paddle?.Checkout.open({
      product: 'PRODUCT_ID',
      email: 'customer@example.com'
    });
  };

  return (
    <Card className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center space-x-2 mb-4">
          <Crown className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-bold">Choose Payment Method</h2>
        </div>

        <div className="space-y-3">
          {/* Stripe Checkout */}
          <Button 
            onClick={handleStripeCheckout}
            className="w-full flex items-center justify-center space-x-2"
            variant="outline"
          >
            <CreditCard className="h-4 w-4" />
            <span>Pay with Stripe - $4.99</span>
          </Button>

          {/* PayPal */}
          <Button 
            onClick={handlePayPalCheckout}
            className="w-full flex items-center justify-center space-x-2 bg-[#0070ba] hover:bg-[#005ea6] text-white"
          >
            <Wallet className="h-4 w-4" />
            <span>Pay with PayPal - $4.99</span>
          </Button>

          {/* Paddle */}
          <Button 
            onClick={handlePaddleCheckout}
            className="w-full flex items-center justify-center space-x-2"
            variant="secondary"
          >
            <CreditCard className="h-4 w-4" />
            <span>Pay with Paddle - $4.99</span>
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
}