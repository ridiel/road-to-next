'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { CardCompact } from '@/components/card-compact';
import { PaginatedData } from '@/types/pagination';

import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentItem } from './comment-item';

import { getComments } from '../queries/get-comments';
import { CommentWithMetadata } from '../types';
interface CommentsProps {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
}

export const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ['comments', ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage =>
      lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    initialData: {
      pages: [
        {
          list: paginatedComments.list,
          metadata: paginatedComments.metadata,
        },
      ],
      pageParams: [undefined],
    },
  });

  const comments = data.pages.flatMap(page => page.list);

  const queryClient = useQueryClient();

  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });

  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new component will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />

      <div className="ml-8 flex flex-col gap-y-4">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-center text-xs italic">No more comments.</p>
        )}
      </div>
    </>
  );
};
