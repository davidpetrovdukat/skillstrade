import { z } from 'zod';

export const AI_DOCUMENT_FORMAT_NAME = 'skills_trade_service_document';

export const AIDocumentSectionSchema = z.object({
    heading: z.string().min(2).max(120),
    body: z.string().min(20).max(3000),
    bullets: z.array(z.string().min(2).max(240)).max(8),
});

export const AIDocumentSchema = z.object({
    documentTitle: z.string().min(3).max(180),
    documentSubtitle: z.string().min(3).max(180),
    executiveSummary: z.string().min(40).max(2400),
    sections: z.array(AIDocumentSectionSchema).min(4).max(8),
    deliverables: z.array(z.string().min(2).max(240)).min(3).max(10),
    assumptions: z.array(z.string().min(2).max(240)).max(8),
    nextSteps: z.array(z.string().min(2).max(240)).min(3).max(8),
});

export type AIDocument = z.infer<typeof AIDocumentSchema>;
