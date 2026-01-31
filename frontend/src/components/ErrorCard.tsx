import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  errorTitle: string;
  errorDetails: string | undefined;
}

const ErrorCard = ({ errorDetails, errorTitle }: Props) => {
  return (
    <>
      <div className="grid items-start my-2">
        <Alert
          variant="destructive"
          className="border rounded-md border-red-300/50 bg-red-50"
        >
          <AlertCircleIcon />
          <AlertTitle>{errorTitle}</AlertTitle>
          <AlertDescription>
            <p>{errorDetails}</p>
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};

export default ErrorCard;
