import { Request, Response } from 'express';
import { generateAIResponse } from '../services/aiService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const askCampusAI = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string' || query.trim() === '') {
      return sendError(res, 'Please provide a valid question for the AI assistant.', 400);
    }

    const user = req.user
      ? {
          name: req.user.name,
          role: req.user.role,
          department: req.user.department,
          usn: req.user.usn,
          email: req.user.email,
        }
      : undefined;

    const answer = await generateAIResponse({ query, user });

    return sendSuccess(res, { answer, query, timestamp: new Date().toISOString() }, 'AI response generated');
  } catch (error: any) {
    return sendError(res, 'Failed to generate AI response: ' + error.message, 500);
  }
};
