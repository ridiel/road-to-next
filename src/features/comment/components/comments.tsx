import { CardCompact } from '@/components/card-compact';

import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentItem } from './comment-item';

import { CommentWithMetadata } from '../types';

interface CommentsProps {
  ticketId: string;
  comments?: CommentWithMetadata[];
}

export const Comments = ({ ticketId, comments = [] }: CommentsProps) => {
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
    </>
  );
};
