'use client';

import { LoaderCircle, LucideTrash } from 'lucide-react';

import useConfirmDialog from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';

import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  id: string;
  onDeleteComment?: (id: string) => void;
};

export const CommentDeleteButton = ({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (isPending: boolean) => (
      <Button variant="outline" size="icon" disabled={isPending}>
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <LucideTrash className="size-4" />
        )}
      </Button>
    ),
    onSuccess: () => {
      onDeleteComment?.(id);
    },
  });

  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
};
