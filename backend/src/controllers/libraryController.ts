import { Request, Response } from 'express';
import { LibraryBook } from '../models/LibraryBook';
import { BookIssue } from '../models/BookIssue';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getLibraryBooks = async (req: Request, res: Response) => {
  try {
    const { category, department, search } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.books];
      if (category && category !== 'ALL') {
        filtered = filtered.filter((b) => b.category.toLowerCase() === (category as string).toLowerCase());
      }
      if (department && department !== 'ALL') {
        filtered = filtered.filter((b) => b.department === 'ALL' || b.department === department);
      }
      if (search) {
        const query = (search as string).toLowerCase();
        filtered = filtered.filter(
          (b) =>
            b.title.toLowerCase().includes(query) ||
            b.author.toLowerCase().includes(query) ||
            b.isbn.toLowerCase().includes(query)
        );
      }
      return sendSuccess(res, filtered, 'Library books retrieved');
    }

    const filter: any = {};
    if (category && category !== 'ALL') filter.category = category;
    if (department && department !== 'ALL') filter.department = { $in: [department, 'ALL'] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } },
      ];
    }

    const books = await LibraryBook.find(filter).sort({ title: 1 });
    return sendSuccess(res, books, 'Library books retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch library books: ' + error.message, 500);
  }
};

export const requestBookIssue = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.body;
    if (!bookId) {
      return sendError(res, 'Book ID is required', 400);
    }

    const studentUsn = req.user?.usn || '1EN21IS045';
    const studentName = req.user?.name || 'Rahul Sharma';

    const issueDate = new Date().toISOString().split('T')[0];
    const dueDateObj = new Date();
    dueDateObj.setDate(dueDateObj.getDate() + 15);
    const dueDate = dueDateObj.toISOString().split('T')[0];

    if (isUsingMemoryStore) {
      const book = memoryStore.books.find((b) => b._id === bookId);
      if (!book) {
        return sendError(res, 'Book not found', 404);
      }

      if (book.availableCopies <= 0) {
        return sendError(res, 'No copies currently available for issue.', 400);
      }

      book.availableCopies -= 1;

      const newIssue = {
        _id: 'issue_' + Date.now(),
        bookId,
        bookTitle: book.title,
        isbn: book.isbn,
        studentUsn,
        studentName,
        issueDate,
        dueDate,
        returnDate: '',
        status: 'Issued',
        fineAmount: 0,
        createdAt: new Date(),
      };
      memoryStore.bookIssues.push(newIssue);

      return sendSuccess(res, newIssue, 'Book issued successfully! Due in 15 days.', 201);
    }

    const book = await LibraryBook.findById(bookId);
    if (!book) {
      return sendError(res, 'Book not found', 404);
    }

    if (book.availableCopies <= 0) {
      return sendError(res, 'No copies currently available for issue.', 400);
    }

    book.availableCopies -= 1;
    await book.save();

    const bookIssue = await BookIssue.create({
      bookId,
      bookTitle: book.title,
      isbn: book.isbn,
      studentUsn,
      studentName,
      issueDate,
      dueDate,
      status: 'Issued',
      fineAmount: 0,
    });

    return sendSuccess(res, bookIssue, 'Book issued successfully! Due in 15 days.', 201);
  } catch (error: any) {
    return sendError(res, 'Failed to issue book: ' + error.message, 500);
  }
};

export const getStudentIssuedBooks = async (req: Request, res: Response) => {
  try {
    const studentUsn = req.user?.usn || '1EN21IS045';

    if (isUsingMemoryStore) {
      const issues = memoryStore.bookIssues.filter((i) => i.studentUsn === studentUsn);
      return sendSuccess(res, issues, 'Issued books retrieved');
    }

    const issues = await BookIssue.find({ studentUsn }).sort({ createdAt: -1 });
    return sendSuccess(res, issues, 'Issued books retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch issued books: ' + error.message, 500);
  }
};
