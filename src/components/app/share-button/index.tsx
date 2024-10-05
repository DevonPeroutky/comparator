import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Share, CircleCheck } from "lucide-react"

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
        console.log('URL copied to clipboard: ', currentUrl);
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
    <Button onClick={handleShare}>
      <Share className='mr-2 h-4 w-4' />
      Copy URL to Share
    </Button>
  );
};
