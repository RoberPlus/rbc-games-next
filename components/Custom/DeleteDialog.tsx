import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { AlertDialog, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { Button } from '../ui/button';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type DeleteModalProps = {
  itemId?: string | undefined;
  actionFn: (itemId?: string | any) => void | Promise<void>;
  deleteText: string;
  Icon: React.ReactNode;
};

export default function DeleteDialog({ itemId, actionFn, deleteText, Icon }: DeleteModalProps) {
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
            className="bg-destructive hover:bg-red-800 text-white"
            onClick={() => actionFn(itemId)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
