import { Box, CardContent, Card as MCard, Skeleton } from '@mui/material';

export const CardSkeleton = () => {
  return (
    <MCard className="overflow-hidden w-full max-w-md transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
      <Box className="p-4 pb-2">
        <Skeleton variant="text" width="80%" height={28} />
      </Box>
      <CardContent className="p-4 pt-0">
        <Skeleton variant="text" width="100%" height={48} />
      </CardContent>
      <Box className="p-4 pt-0 flex flex-wrap items-center text-sm text-muted-foreground gap-4">
        <div className="flex items-center gap-1">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={80} height={20} />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={100} height={20} />
        </div>
      </Box>
    </MCard>
  );
};
