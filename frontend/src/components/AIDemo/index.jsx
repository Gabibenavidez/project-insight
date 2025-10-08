import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSentimentAnalysis } from "../../hooks/useSentimentAnalysis";
import { useDebounce } from "../../hooks/useDebounce";
import { getSentimentColor } from "../../utils/getSentimentColor";

const kinds = [
  "SentimentAnalysis",
  "KeyPhraseExtraction",
  "EntityRecognition",
  "EntityLinking",
  "PiiEntityRecognition"
];


export default function TextAnalysisDemo() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 800);

  const [kind, setKind] = useState("SentimentAnalysis");

  const { data, isLoading, isError, refetch } = useSentimentAnalysis(debouncedInput, kind);

  const handleAnalyze = () => {
    if (input.trim()) refetch();
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4, bgcolor: "#121212", borderRadius: 2 }}>
      <Typography variant="h5" color="white" mb={2}>
        Azure Text Analysis Demo
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "white" }}>Select Analysis Type</InputLabel>
        <Select
          value={kind}
          label="Select Analysis Type"
          onChange={(e) => setKind(e.target.value)}
          sx={{ color: "white", bgcolor: "#1E1E1E" }}
        >
        { kinds.map((kind) => (
            <MenuItem key={kind} value={kind}>{kind}</MenuItem>
        ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        multiline
        minRows={4}
        variant="outlined"
        label="Enter text to analyze"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2, bgcolor: "#1E1E1E", input: { color: "white" } }}
      />

      <Button variant="contained" onClick={handleAnalyze} disabled={!input || isLoading}>
        {isLoading ? "Analyzing..." : "Analyze"}
      </Button>

      {isLoading && <CircularProgress size={24} sx={{ mt: 2 }} />}
      {isError && <Alert severity="error" sx={{ mt: 2 }}>Error analyzing text</Alert>}

      {data && (
        <Box sx={{ mt: 2 }}>
          {/* Sentiment */}
          {data.sentiment && (
            <Chip
              label={`Sentiment: ${data.sentiment}`}
              color={getSentimentColor(data.sentiment)}
              sx={{ mr: 1, mb: 1 }}
            />
          )}

          {data.confidenceScores && (
            <Chip
              label={`Score: ${data.confidenceScores[data.sentiment]?.toFixed(2)}`}
              color={getSentimentColor(data.sentiment)}
              sx={{ mr: 1, mb: 1 }}
            />
          )}

          {/* Key Phrases */}
          {data.keyPhrases?.length > 0 &&
            data.keyPhrases.map((key, index) => (
              <Chip key={index} label={key} color="primary" sx={{ mr: 1, mb: 1 }} />
            ))}

          {/* Entity Recognition */}
          {data.entities?.length > 0 &&
            data.entities.map((ent, index) => (
              <Chip
                key={index}
                label={`${ent.text} (${ent.category})`}
                color="secondary"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
        </Box>
      )}
    </Box>
  );
}
