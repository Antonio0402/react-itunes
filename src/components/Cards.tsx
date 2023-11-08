import { Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

interface Props {
    loading?: boolean;
    data?: SongInfo[];
  }

const Cards = (props: Props) => {
    const { loading = false, data } = props;
  return (
    <Grid container sx={{ gap: 2 }}>
      {(loading ? Array.from(new Array(3)) : data ? data : []).map((item: SongInfo, index) => (
        <Card key={index} sx={{ width: 210, maxWidth: 345, my: 5 }}>
          <CardActionArea>

          {item ? (
            <CardMedia
              component="img"
              sx={{ width: 210, height: 118 }}
              alt={`${item.artistId} images`}
              image={item.artworkUrl100}
              width={500}
              height={500}
            />
          ) : (
            <Skeleton variant="rectangular" width={500} height={500} />
          )}
          {item ? (
            <CardContent>
              <Typography gutterBottom variant="body2">
                {item.trackCensoredName}
              </Typography>
              <Typography display="block" variant="caption" color="text.secondary">
                {item.artistName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`${item.trackPrice} ${item.currency}`}
              </Typography>
            </CardContent>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
          </CardActionArea>
        </Card>
      ))}
    </Grid>
  );
}

export default Cards