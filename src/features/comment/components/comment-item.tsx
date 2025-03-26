import { format } from 'date-fns';

import { Card } from '@/components/ui/card';

import { CommentWithMetadata } from '../types';
type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
};

export const CommentItem = ({ comment, buttons }: CommentItemProps) => {
  return (
    <div className="flex gap-x-2">
      <Card className="flex flex-1 flex-col gap-y-1 p-4">
        <div className="flex justify-between">
          <p className="text-muted-foreground text-sm">
            {comment.user?.username ?? 'Deleted User'}
          </p>
          <p className="text-muted-foreground text-sm">
            {format(comment.createdAt, 'dd-MM-yyyy, HH:mm')}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>

      <div className="flex flex-col gap-x-1">{buttons}</div>
    </div>
  );
};
