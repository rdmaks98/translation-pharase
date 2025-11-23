  "use client";

  import { useState } from "react";
  import { Box, Typography, Button, TextField, MenuItem, Grid } from "@mui/material";
  import TranslationCard from "../component/TranslateCard";
  import { api } from "../utils/api";
  import { Phrase, Translation } from "../types/pharse";

  export default function HomePage() {
    const [query, setQuery] = useState("");
    const [sortField, setSortField] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("asc");
    const [status, setStatus] = useState("");
    const [results, setResults] = useState<Phrase[]>([]);
    const [loading, setLoading] = useState(false);

    const [singleId, setSingleId] = useState<number | "">("");
    const [lang, setLang] = useState("");
    const [singleResult, setSingleResult] = useState<Phrase | Translation | null>(null);
    const [loadingSingle, setLoadingSingle] = useState(false);

    const handleSearch = async () => {
      setLoading(true);
      try {
        
        const res = await api.searchPhrase({ query, sort: sortField, sortOrder, status });
        setResults(res.data || []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const handleFetchSingle = async () => {
      if (!singleId) return;
      setLoadingSingle(true);
      try {
        let res;
        if (lang) {
          res = await api.getTranslation(singleId, lang);
          setSingleResult(res);
        } else {
          res = await api.getPhrase(singleId);
          setSingleResult(res);
        }
      } catch (err) {
        console.error(err);
        setSingleResult(null);
      } finally {
        setLoadingSingle(false);
      }
    };

    return (
      <Box sx={{ p: 4, bgcolor: "#f0f2f5", minHeight: "100vh" }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontWeight: "bold", color: "primary.main" }}>
          Phrase Translator Dashboard
        </Typography>

        <Grid container spacing={4} alignItems="flex-start">
          {/* LEFT: Search + Results */}
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 2, p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Search Phrases</Typography>

              <TextField
                label="Search phrase"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Sort by"
                select
                fullWidth
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="createdAt">Created Date</MenuItem>
                <MenuItem value="updatedAt">Updated Date</MenuItem>
                <MenuItem value="phrase">Phrase</MenuItem>
              </TextField>

              <TextField
                label="Order"
                select
                fullWidth
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </TextField>

              <TextField
                label="Status"
                select
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="spam">Spam</MenuItem>
                <MenuItem value="deleted">Deleted</MenuItem>
              </TextField>

              <Button
                variant="contained"
                fullWidth
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
                  color: "white",
                  fontWeight: "bold",
                  py: 1.5,
                  borderRadius: 3,
                  mb: 2,
                  "&:hover": { background: "linear-gradient(90deg, #1565c0, #1e88e5)", boxShadow: 4 },
                }}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </Box>

            {/* Results */}
            <Box sx={{ mt: 3 }}>
              {results.length === 0 ? (
                <Typography>No phrases found</Typography>
              ) : (
                results.map(item => <TranslationCard key={item.id} phrase={item} />)
              )}
            </Box>
          </Grid>

          {/* RIGHT: Single / Translation */}
          <Grid item xs={12} md={5} sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Single Phrase / Translation</Typography>

              <TextField
                label="Phrase ID"
                type="number"
                fullWidth
                value={singleId}
                onChange={(e) => setSingleId(Number(e.target.value))}
                sx={{ mb: 2 }}
              />

            <TextField
              label="Language"
              select
              fullWidth
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Original</MenuItem>
              <MenuItem value="fr">French (FR)</MenuItem>
              <MenuItem value="es">Spanish (ES)</MenuItem>
            </TextField>


              <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={handleFetchSingle}
                disabled={loadingSingle}
                sx={{
                  fontWeight: "bold",
                  py: 1.5,
                  mb: 2,
                  background: "linear-gradient(90deg, #8e24aa, #ba68c8)",
                  "&:hover": { background: "linear-gradient(90deg, #6a1b9a, #9c27b0)" },
                }}
              >
                {loadingSingle ? "Fetching..." : "Fetch"}
              </Button>

              <Box sx={{ mt: 2 }}>
                {singleResult ? (
                  'language' in singleResult ? (
                    <TranslationCard translation={singleResult} />
                  ) : (
                    <TranslationCard phrase={singleResult} />
                  )
                ) : (
                  <Typography sx={{ mt: 2, textAlign: "center" }}>No phrase loaded</Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
