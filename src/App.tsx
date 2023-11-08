import {
  Box,
  Chip,
  Container,
  Divider,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useDeferredValue, useState } from "react";
import { useSearchSong } from "./hooks/useSearchSong";
import { JSX } from "react/jsx-runtime";

function App() {
  const [search, setSearch] = useState("");
  const searchTerm = useDeferredValue(search);
  const { content, prices, setPrice, setExplicitness } =
    useSearchSong(searchTerm);
  const selectPrices: JSX.Element[] = [];
  if (prices) {
    prices?.forEach((price, index) => {
      const item = (
        <MenuItem key={`item ${index} with price`} value={price}>
          {price}
        </MenuItem>
      );
      selectPrices.push(item);
    });
  }
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "grid",
          width: "100%",
          gap: 2,
          minHeight: "100%",
          p: 2,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          justifyContent="space-around"
        >
          <TextField
            sx={{ width: "100%" }}
            id="search"
            label="Search"
            type="search"
            variant="filled"
            value={searchTerm}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            sx={{
              width: 120,
            }}
            id="prices"
            select
            label="Prices"
            defaultValue="USD"
            disabled={!prices}
            onChange={(e) => setPrice(Number(e.target.value))}
          >
            {prices ? selectPrices : []}
          </TextField>
          <TextField
            sx={{
              width: 120,
            }}
            id="trackExplicitness"
            select
            label="Explicit/Non-Explicit"
            defaultValue=""
            disabled={!content}
            onChange={(e) => setExplicitness(e.target.value)}
          >
            {["explicit", "notExplicit"].map((item, index) => (
              <MenuItem key={`item ${index}`} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Divider>
          <Chip label="Songs" />
        </Divider>
        {content}
      </Box>
    </Container>
  );
}

export default App;
