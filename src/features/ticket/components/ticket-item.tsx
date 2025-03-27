import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ticketEditPath, ticketPath } from '@/paths';
import { toCurrencyFromCent } from '@/utils/currency';

import { TicketMoreMenu } from './ticket-more-menu';

import { TICKET_ICONS } from '../constants';
import { TicketWithMetadata } from '../types';

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  comments?: React.ReactNode;
};

export const TicketItem = ({
  ticket,
  isDetail = false,
  comments,
}: TicketItemProps) => {
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = ticket.isOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={`${ticketEditPath(ticket.id)}`}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = ticket.isOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={cn('flex w-full flex-col gap-y-4', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card key={ticket.id} className="w-full gap-y-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2 text-2xl">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate">{ticket.title}</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <span
              className={cn('whitespace-break-spaces', {
                'line-clamp-2': !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>

          <CardFooter className="flex justify-between">
            <p className="text-muted-foreground text-sm">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-muted-foreground text-sm">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>

      {comments}
    </div>
  );
};
