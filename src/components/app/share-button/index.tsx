import { useToast } from "@/hooks/use-toast"
import { Share, CircleCheck } from "lucide-react"
import { AnimatedButton } from "@/animation-test";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { CSSProperties, useEffect, useRef } from "react";
import "./index.css";
import { cn } from "@/lib/utils";

export const ShareButton: React.FC = () => {
  const { toast } = useToast();

  const handleShare = () => {
    const currentUrl = window.location.href;

    if (currentUrl.length >= 2048) {
      toast({
        title: "Link is too long to share",
        description: "Can't fit all the job offer data in the URL. Try sharing with <=6 job offers.",
        variant: "destructive"
      })
      return
    }

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        toast({
          title: "Sharable link copied to clipboard",
          description: "Share this link with your friends & colleagues!",
        })
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      });

  };

  return (
    <AnimatedButton
      className="font-semibold"
      text="Copy URL to share"
      icon={
        <Share className='h-4 w-4' />
      }
      onClick={handleShare}
      alternativeText="Copied!"
      alternativeIcon={<ClipboardDocumentIcon className='h-4 w-4' />}
    />
  );
};


interface AnimatedShareButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedShareButton: React.FC<AnimatedShareButtonProps> = ({ children, className }) => {
  return (
    <div className={cn("rainbow-border rounded-lg overflow-hidden", className)}>{children}</div>
  );
};

export const TestButton = () => {
  return (
    <div className="rainbow-border"><button>Copy URL to share</button></div>
  )
}
