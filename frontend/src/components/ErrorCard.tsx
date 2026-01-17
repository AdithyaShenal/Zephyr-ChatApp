import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  errorTitle: string;
  errorDetails: string | undefined;
}

const ErrorCard = ({ errorDetails, errorTitle }: Props) => {
  return (
    <>
      <div className="grid items-start gap-4 m-2">
        <Alert variant="destructive">
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
