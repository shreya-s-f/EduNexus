import { Request, Response } from 'express';
import { Notice } from '../models/Notice';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getNotices = async (req: Request, res: Response) => {
  try {
    const { category, priority, department, search } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.notices];
      if (category && category !== 'ALL') {
        filtered = filtered.filter((n) => n.category.toLowerCase() === (category as string).toLowerCase());
      }
      if (priority) {
        filtered = filtered.filter((n) => n.priority.toLowerCase() === (priority as string).toLowerCase());
      }
      if (department && department !== 'ALL') {
        filtered = filtered.filter(
          (n) => n.department === 'ALL' || n.department.toLowerCase() === (department as string).toLowerCase()
        );
      }
      if (search) {
        const query = (search as string).toLowerCase();
        filtered = filtered.filter(
          (n) => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)
        );
      }
      return sendSuccess(res, filtered, 'Notices retrieved');
    }

    const filter: any = {};
    if (category && category !== 'ALL') filter.category = category;
    if (priority) filter.priority = priority;
    if (department && department !== 'ALL') filter.department = { $in: [department, 'ALL'] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const notices = await Notice.find(filter).sort({ isPinned: -1, createdAt: -1 });
    return sendSuccess(res, notices, 'Notices retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch notices: ' + error.message, 500);
  }
};

export const createNotice = async (req: Request, res: Response) => {
  try {
    const { title, content, category, priority, department = 'ALL', isPinned = false, tags = [] } = req.body;

    if (!title || !content) {
      return sendError(res, 'Notice title and content are required.', 400);
    }

    const publishedBy = req.user?.name || 'Academic Office';
    const authorRole = req.user?.role || 'ADMIN';

    // Fast AI summary generator heuristic for notice briefs
    const sentences = content.split('. ');
    const summary = sentences.length > 2 ? sentences.slice(0, 2).join('. ') + '.' : content;

    if (isUsingMemoryStore) {
      const newNotice = {
        _id: 'notice_' + Date.now(),
        title,
        content,
        summary,
        category: category || 'General',
        priority: priority || 'Medium',
        department,
        publishedBy,
        authorRole,
        date: new Date().toISOString().split('T')[0],
        isPinned,
        tags,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryStore.notices.unshift(newNotice);
      return sendSuccess(res, newNotice, 'Notice published successfully', 201);
    }

    const notice = await Notice.create({
      title,
      content,
      summary,
      category: category || 'General',
      priority: priority || 'Medium',
      department,
      publishedBy,
      authorRole,
      date: new Date().toISOString().split('T')[0],
      isPinned,
      tags,
    });

    return sendSuccess(res, notice, 'Notice published successfully', 201);
  } catch (error: any) {
    return sendError(res, 'Failed to publish notice: ' + error.message, 500);
  }
};
