import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

type CardCompactProps = {
  title?: string;
  description?: string;
  content: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
};

export const CardCompact = ({
  title,
  description,
  content,
  className,
  footer,
}: CardCompactProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter className="flex justify-between">{footer}</CardFooter>}
    </Card>
  );
};
