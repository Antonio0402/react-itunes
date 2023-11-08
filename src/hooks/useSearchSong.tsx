import { useGetSongsQuery } from "../store";
import Cards from "../components/Cards";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const useSearchSong = (term: string) => {
  const {
    data: songsInfo,
    isLoading,
    isSuccess,
    isError,
  } = useGetSongsQuery(term);
  const [price, setPrice] = useState(-1);
  const [explicitness, setExplicitness] = useState("");
  const [songsData, setSongsData] = useState<SongInfo[]>();

  useEffect(() => {
    if (isSuccess) {
      setSongsData(songsInfo?.results);
      console.log(songsData);
    }
    const filteredPriceData = (songsInfo?.results as SongInfo[])?.filter(
      (item) => {
        if (price > 0) {
          return item.trackPrice === price;
        } else {
          return true;
        }
      }
    );

    const filterdExplicitData = filteredPriceData?.filter((item) => {
      if (explicitness) {
        return item.trackExplicitness === explicitness;
      } else {
        return true;
      }
    });

    setSongsData(filterdExplicitData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explicitness, isSuccess, price, songsInfo?.results]);

  let content;
  let prices;

  if (isLoading) {
    content = <Cards loading />;
  } else if (isSuccess) {
    prices = new Set(
      (songsInfo?.results as SongInfo[])
        .map((item) => (item.trackPrice > 0 ? item.trackPrice : 0))
        .sort((a, b) => a - b)
    );
    content = <Cards data={songsData} />;
  } else if (isError) {
    content = (
      <Typography variant="h2" gutterBottom>
        Sorry, there no songs info at all
      </Typography>
    );
  }

  return { content, prices, setPrice, setExplicitness };
};
