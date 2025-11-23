// types/pharse.ts

// Phrase interface (from search or single phrase)
export interface Phrase {
    id: number;
    phrase: string;
    status: "active" | "pending" | "spam" | "deleted";
    createdAt: string;
    updatedAt: string;
}

// Translation interface (from single translation API)
export interface Translation {
    id: number;
    language: string;  // e.g., "fr", "es"
    text: string;
    phraseId: number;
}
