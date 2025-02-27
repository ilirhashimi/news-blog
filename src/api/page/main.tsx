import { useContext, useEffect, useRef } from 'react';
import { NewsContext } from '../../contexts/news/news';
import { Card, CardSkeleton, Filters, Pagination } from '../../components';
import { Box, Dialog, Typography } from '@mui/material';
import { TArticles } from '../../contexts/news/news.types';

export const Main = () => {
  const { state, closeFilter } = useContext(NewsContext);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      window.scrollTo({
        top: contentRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [state.page]);

  return (
    <>
      <Box
        className="container flex h-full flex-col mx-auto px-4 py-8"
        ref={contentRef}
      >
        <Box className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.loader ? (
            [...Array(10)].map((_, index) => <CardSkeleton key={index} />)
          ) : state.articles && state.articles.length > 0 ? (
            <>
              <Box className="col-span-full mb-4">
                <Typography
                  variant="h4"
                  className="font-semibold text-gray-900"
                >
                  Found Articles
                </Typography>
              </Box>
              {state.articles.map((item: TArticles, index: number) => (
                <Card
                  key={index}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.urlToImage}
                  postedAt={item.publishedAt}
                  author={item.author || 'Unknown'}
                  articleUrl={item.articleUrl}
                />
              ))}
            </>
          ) : (
            <Box className="col-span-full text-center text-gray-500">
              <Typography variant="h5">
                We couldn't find any results matching your filters. Try
                modifying your search criteria or exploring different options.
              </Typography>
            </Box>
          )}
        </Box>
        {state.numberOfResults > 10 && (
          <Box className="flex justify-center mt-5">
            <Pagination numberOfResults={state.numberOfResults} />
          </Box>
        )}
      </Box>

      <Dialog open={state.filterIsOpen} onClose={closeFilter}>
        <Filters />
      </Dialog>
    </>
  );
};
