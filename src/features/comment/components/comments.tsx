'use client';

import { CardCompact } from '@/components/card-compact';
import { Button } from '@/components/ui/button';

import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentItem } from './comment-item';

import { getComments } from '../queries/get-comments';
import { CommentWithMetadata } from '../types';

interface CommentsProps {
  ticketId: string;
  comments?: CommentWithMetadata[];
}

export const Comments = ({ ticketId, comments = [] }: CommentsProps) => {
  const handleMore = async () => {
    const result = await getComments(ticketId);
    console.log(result);
  };

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new component will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />

      <div className="ml-8 flex flex-col gap-y-4">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [<CommentDeleteButton key="0" id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="ml-8 flex flex-col justify-center">
        <Button variant="ghost" onClick={handleMore}>
          More
        </Button>
      </div>
    </>
  );
};
