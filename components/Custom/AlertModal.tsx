import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteModalProps = {
  itemId?: string | undefined;
  actionFn: (itemId?: string | any) => void | Promise<void>;
  deleteText: string;
  Icon: React.ReactNode;
};

export default function AlertModal({
  itemId,
  actionFn,
  deleteText,
  Icon,
}: DeleteModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{Icon}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. {deleteText}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white hover:bg-red-800"
            onClick={() => actionFn(itemId)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
