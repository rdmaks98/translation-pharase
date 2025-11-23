import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

interface Phrase {
  id: number;
  phrase?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Translation {
  id: number;
  language: string;
  text: string;
  phraseId: number;
}

interface TranslationCardProps {
  phrase?: Phrase;
  translation?: Translation;
}

export default function TranslationCard({ phrase, translation }: TranslationCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active": return "success";
      case "pending": return "warning";
      case "spam": return "error";
      case "deleted": return "default";
      default: return "info";
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
      }}
    >
      <CardContent>
        {phrase && (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {phrase.phrase}
              </Typography>
              <Chip label={phrase.status} color={getStatusColor(phrase.status)} size="small" />
            </Stack>
             <Typography variant="body2" color="text.secondary">
              Id: {phrase.id ? phrase.id : ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created: {phrase.createdAt ? new Date(phrase.createdAt).toLocaleDateString() : "N/A"}
            </Typography>
          </>
        )}

        {translation && (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}>
              Translation ({translation.language})
            </Typography>
            <Typography variant="body1">{translation.text}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
