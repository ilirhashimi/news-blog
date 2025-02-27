import { Box, CardContent, Card as MCard, Typography } from '@mui/material';
import { ICardProps } from './card.types';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment';

export const Card = ({
  title,
  description,
  imageUrl,
  postedAt,
  author,
  articleUrl,
}: ICardProps) => {
  const openArticle = (url: string) => window.open(`${url}`, '_blank');

  return (
    <MCard
      className="overflow-hidden w-full max-w-md transition-all hover:shadow-lg cursor-pointer"
      component="div"
      onClick={() => openArticle(articleUrl)}
    >
      <Box className="relative h-48 w-full">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={imageUrl}
          className="h-full w-full object-cover"
        />
      </Box>
      <Box className="p-4 pb-2">
        <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
      </Box>
      <CardContent className="p-4 pt-0">
        <Typography className="text-muted-foreground line-clamp-3">
          {description}
        </Typography>
      </CardContent>
      <Box className="p-4 pt-0 flex flex-col text-sm text-muted-foreground gap-4">
        <Box className="flex items-center gap-1">
          <CalendarMonthIcon className="h-4 w-4" />
          <Typography>{moment(postedAt).format('YYYY-DD-MM')}</Typography>
        </Box>
        <Box className="flex items-center gap-1">
          <PersonIcon className="h-4 w-4" />
          <Typography variant="body2" className="truncate">
            {author}
          </Typography>
        </Box>
      </Box>
    </MCard>
  );
};
