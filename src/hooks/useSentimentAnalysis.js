import axios from "axios";
import { useQuery } from '@tanstack/react-query';


const analyzeText = async (text, kind) => {
  const { data } = await axios.post("http://localhost:4000/api/analyze", { text , kind } );
  return data.results.documents[0];
};

export const useSentimentAnalysis = (text, kind) => {
  return useQuery({
    queryKey: ["sentiment", text],
    queryFn: () => analyzeText(text, kind),
    enabled: !!text,
  });
};
