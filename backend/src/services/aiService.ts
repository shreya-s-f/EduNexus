import { ENV } from '../config/env';

interface AskAIParams {
  query: string;
  user?: {
    name?: string;
    role?: string;
    department?: string;
    usn?: string;
    email?: string;
  };
  context?: any;
}

export const generateAIResponse = async ({ query, user, context }: AskAIParams): Promise<string> => {
  const lowerQuery = query.toLowerCase();

  // Knowledge base retrieval heuristics
  if (lowerQuery.includes('where is the library') || lowerQuery.includes('library location')) {
    return 'The Central Library is located on the 2nd Floor of the Academic Block. It spans Floors 2 and 3, featuring a digital reading wing, reference section, and study pods. Working hours: 8:00 AM – 9:00 PM on weekdays.';
  }

  if (lowerQuery.includes('today\'s timetable') || lowerQuery.includes('timetable') || lowerQuery.includes('class today')) {
    return 'Here is today\'s class schedule:\n• 09:00 AM – 10:00 AM: Database Management Systems (21IS51) in LH-201\n• 10:00 AM – 11:00 AM: Artificial Intelligence & Machine Learning (21IS52) in LH-201\n• 11:15 AM – 01:15 PM: DBMS & Network Laboratory (21ISL56) in Lab 3\n• 02:00 PM – 03:00 PM: Computer Networks (21IS53) in LH-201';
  }

  if (lowerQuery.includes('next internal exam') || lowerQuery.includes('cie') || lowerQuery.includes('exam')) {
    return 'The Continuous Internal Evaluation (CIE-II) is scheduled from March 16 to March 21, 2026. Daily timing: 10:00 AM – 11:30 AM in Block 2, Room 301. Hall tickets and college ID cards are mandatory.';
  }

  if (lowerQuery.includes('hod') || lowerQuery.includes('ise hod') || lowerQuery.includes('head of department')) {
    return 'The Head of Department for Information Science & Engineering is Dr. B. N. Radhika (Ph.D., M.Tech). Her office is in Academic Block 1, Room 201. Contact: hod.ise@edunexus.edu.';
  }

  if (lowerQuery.includes('upcoming events') || lowerQuery.includes('event') || lowerQuery.includes('hackathon')) {
    return 'Upcoming campus events:\n1. HackNexus 2026 – 36-hr National Hackathon (March 28, Innovation Hub)\n2. AI & GenAI Summit with Google Cloud experts (April 04, Central Auditorium)\n3. Samskruthi Annual Cultural Fest 2026 (April 18–19, Open Air Theatre)';
  }

  if (lowerQuery.includes('placement') || lowerQuery.includes('job') || lowerQuery.includes('companies')) {
    return 'Placement Highlights:\n• Highest Package: ₹48.0 LPA (Microsoft)\n• Average Package: ₹9.4 LPA across branches\n• 154+ recruiting partners including Google, Microsoft, Amazon, Cisco, and Oracle.\n• Active drive: Cloud Software Engineer at Google Cloud (₹44 LPA, deadline approaching).';
  }

  if (lowerQuery.includes('attendance') || lowerQuery.includes('my attendance')) {
    if (!user) {
      return 'Please log in to your EduNexus student account to view your live attendance and personalized shortage alerts.';
    }
    return `Hello ${user.name || 'Student'}! Your overall attendance currently stands at 87.5% (Eligible for all examinations). Your highest attendance is in DBMS (91.6%) and lowest in Automata Theory (68.4%). You need 4 consecutive classes in Automata Theory to reach the safe 75% threshold.`;
  }

  if (lowerQuery.includes('assignment deadline') || lowerQuery.includes('assignment') || lowerQuery.includes('homework')) {
    return 'Active Assignment Deadlines:\n• DBMS: Normalization & B+ Tree Indexing Report – Due in 3 days\n• Computer Networks: Socket Programming in C++/Python – Due next Monday\nSubmit directly via your Student Portal.';
  }

  if (lowerQuery.includes('hostel') || lowerQuery.includes('mess')) {
    return 'EduNexus Campus provides on-campus Boys & Girls Hostels with 24/7 security, high-speed Wi-Fi, solar heating, and modern mess facilities serving hygienic vegetarian & non-vegetarian meals. Curfew: 9:30 PM.';
  }

  if (lowerQuery.includes('bus') || lowerQuery.includes('transport')) {
    return 'Campus transport operates across 18 designated routes spanning Bengaluru city. Real-time GPS tracking is available directly under the Campus Transport section of EduNexus.';
  }

  // If Gemini API Key is provided, call Google Gemini model
  if (ENV.GEMINI_API_KEY && ENV.GEMINI_API_KEY.trim() !== '') {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ENV.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are EduNexus AI, the smart virtual campus assistant for EduNexus University platform ("Your Campus, Connected.").
Answer the following campus inquiry accurately, politely, and concisely based on standard university policies:
User Question: "${query}"
User Role: ${user?.role || 'Guest'}
User Name: ${user?.name || 'Visitor'}
`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
    } catch (err: any) {
      console.warn('[Gemini API Fallback] ' + err.message);
    }
  }

  // Intelligent conversational fallback
  return `Welcome to EduNexus! As your Campus AI Assistant, I can help you with timetable details, attendance predictions, examination schedules, departmental information, placement drives, club registrations, campus map locations, and grievance status. Feel free to ask: "Where is the library?", "When is the next CIE exam?", or "Show placement opportunities."`;
};
