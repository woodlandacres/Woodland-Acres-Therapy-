import { createServerFn } from "@tanstack/react-start";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { getDb } from "./portalDb";

const SECRET = "WOODLAND_ACRES_SECRET_HIPAA_KEY";

// Token Helpers
export function signToken(payload: { userId: number; email: string; role: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: number; email: string; role: string } | null {
  try {
    return jwt.verify(token, SECRET) as any;
  } catch (error) {
    return null;
  }
}

// 1. Login Server Function
export const loginUser = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { email: string; password: string } }) => {
    const { email, password } = data;
    const db = await getDb();
    
    const user = db.query("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isValid = bcryptjs.compareSync(password, user.password_hash);
    if (!isValid) {
      throw new Error("Invalid email or password.");
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        role: user.role,
      },
    };
  });

// 2. Register Server Function
export const registerUser = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { email: string; password: string; displayName: string; role: "therapist" | "patient" } }) => {
    const { email, password, displayName, role } = data;
    const db = await getDb();

    // Check if exists
    const existing = db.query("SELECT id FROM users WHERE email = ?").get(email);
    if (existing) {
      throw new Error("Email is already registered.");
    }

    const hash = bcryptjs.hashSync(password, 10);
    const now = new Date().toISOString();

    const result = db.query(`
      INSERT INTO users (email, password_hash, display_name, role, created_at)
      VALUES (?, ?, ?, ?, ?)
      RETURNING id, email, display_name, role
    `).get(email, hash, displayName, role, now) as any;

    if (role === "patient") {
      // Auto-enroll new patient in existing published courses so their dashboard is not blank
      const courses = db.query("SELECT id FROM courses WHERE published = 1").all() as any[];
      for (const course of courses) {
        db.query(`
          INSERT OR IGNORE INTO enrollments (user_id, course_id, progress_pct, created_at)
          VALUES (?, ?, 0.0, ?)
        `).run(result.id, course.id, now);
      }
    }

    const token = signToken({ userId: result.id, email: result.email, role: result.role });

    return {
      success: true,
      token,
      user: {
        id: result.id,
        email: result.email,
        display_name: result.display_name,
        role: result.role,
      },
    };
  });

// 3. Verify Session Server Function
export const verifySession = createServerFn({ method: "GET" })
  .handler(async ({ data }: { data: { token: string } }) => {
    const payload = verifyToken(data.token);
    if (!payload) {
      throw new Error("Unauthorized or expired session.");
    }

    const db = await getDb();
    const user = db.query("SELECT id, email, display_name, role FROM users WHERE id = ?").get(payload.userId) as any;
    if (!user) {
      throw new Error("User no longer exists.");
    }

    return {
      user,
    };
  });

// 4. Get Patient Dashboard Data
export const getPatientDashboardData = createServerFn({ method: "GET" })
  .handler(async ({ data }: { data: { token: string } }) => {
    const payload = verifyToken(data.token);
    if (!payload || payload.role !== "patient") {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();

    // Enrolled courses
    const courses = db.query(`
      SELECT c.*, e.progress_pct 
      FROM courses c
      JOIN enrollments e ON c.id = e.course_id
      WHERE e.user_id = ?
    `).all(payload.userId) as any[];

    // Zoom sessions for enrolled courses
    const zoomSessions = db.query(`
      SELECT z.*, c.title as course_title 
      FROM zoom_sessions z
      JOIN enrollments e ON z.course_id = e.course_id
      JOIN courses c ON c.id = z.course_id
      WHERE e.user_id = ?
      ORDER BY z.scheduled_at ASC
    `).all(payload.userId) as any[];

    // Downloadable resources
    const resources = db.query(`
      SELECT r.*, c.title as course_title
      FROM resources r
      JOIN enrollments e ON r.course_id = e.course_id
      JOIN courses c ON c.id = r.course_id
      WHERE e.user_id = ?
    `).all(payload.userId) as any[];

    return {
      courses,
      zoomSessions,
      resources,
    };
  });

// 5. Get Therapist Dashboard Data
export const getTherapistDashboardData = createServerFn({ method: "GET" })
  .handler(async ({ data }: { data: { token: string } }) => {
    const payload = verifyToken(data.token);
    if (!payload || payload.role !== "therapist") {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();

    // Student Roster with their course progress
    const students = db.query(`
      SELECT u.id as student_id, u.email, u.display_name, u.created_at,
             c.id as course_id, c.title as course_title, e.progress_pct
      FROM users u
      LEFT JOIN enrollments e ON u.id = e.user_id
      LEFT JOIN courses c ON c.id = e.course_id
      WHERE u.role = 'patient'
      ORDER BY u.display_name ASC
    `).all() as any[];

    // All Courses list
    const courses = db.query(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) as student_count,
        (SELECT COUNT(*) FROM course_modules m WHERE m.course_id = c.id) as module_count
      FROM courses c
      ORDER BY c.created_at DESC
    `).all() as any[];

    return {
      students,
      courses,
    };
  });

// 6. Get Course Viewer Data (Client / Student Course viewer)
export const getCourseViewerData = createServerFn({ method: "GET" })
  .handler(async ({ data }: { data: { token: string; courseId: number } }) => {
    const payload = verifyToken(data.token);
    if (!payload) {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();

    const course = db.query("SELECT * FROM courses WHERE id = ?").get(data.courseId) as any;
    if (!course) {
      throw new Error("Course not found.");
    }

    const enrollment = db.query("SELECT progress_pct FROM enrollments WHERE user_id = ? AND course_id = ?")
      .get(payload.userId, data.courseId) as any;

    const modules = db.query("SELECT * FROM course_modules WHERE course_id = ? ORDER BY order_index ASC")
      .all(data.courseId) as any[];

    const resourcesList = db.query("SELECT * FROM resources WHERE course_id = ? ORDER BY created_at DESC")
      .all(data.courseId) as any[];

    const zoomList = db.query("SELECT * FROM zoom_sessions WHERE course_id = ? ORDER BY scheduled_at ASC")
      .all(data.courseId) as any[];

    return {
      course,
      isEnrolled: !!enrollment,
      progressPct: enrollment ? enrollment.progress_pct : 0,
      modules,
      resources: resourcesList,
      zoomSessions: zoomList,
    };
  });

// 7. Update Module Progress
export const updateModuleProgress = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; courseId: number; progressPct: number } }) => {
    const payload = verifyToken(data.token);
    if (!payload) {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    db.query(`
      UPDATE enrollments 
      SET progress_pct = ? 
      WHERE user_id = ? AND course_id = ?
    `).run(data.progressPct, payload.userId, data.courseId);

    return { success: true, progressPct: data.progressPct };
  });

// 8. Get Discussions & Replies for a Course
export const getDiscussions = createServerFn({ method: "GET" })
  .handler(async ({ data }: { data: { token: string; courseId: number } }) => {
    const payload = verifyToken(data.token);
    if (!payload) {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();

    // Get threads
    const threads = db.query(`
      SELECT d.*, u.display_name as author_name, u.role as author_role
      FROM discussions d
      JOIN users u ON d.user_id = u.id
      WHERE d.course_id = ?
      ORDER BY d.created_at DESC
    `).all(data.courseId) as any[];

    // For each thread, get replies
    const enrichedThreads = threads.map((thread) => {
      const replies = db.query(`
        SELECT r.*, u.display_name as author_name, u.role as author_role
        FROM discussion_replies r
        JOIN users u ON r.user_id = u.id
        WHERE r.discussion_id = ?
        ORDER BY r.created_at ASC
      `).all(thread.id) as any[];

      return {
        ...thread,
        replies,
      };
    });

    return {
      threads: enrichedThreads,
    };
  });

// 9. Add Discussion Thread
export const addDiscussionThread = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; courseId: number; title: string; content: string } }) => {
    const payload = verifyToken(data.token);
    if (!payload) {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    const now = new Date().toISOString();

    db.query(`
      INSERT INTO discussions (course_id, user_id, title, content, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(data.courseId, payload.userId, data.title, data.content, now);

    return { success: true };
  });

// 10. Add Discussion Reply
export const addDiscussionReply = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; discussionId: number; content: string } }) => {
    const payload = verifyToken(data.token);
    if (!payload) {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    const now = new Date().toISOString();

    db.query(`
      INSERT INTO discussion_replies (discussion_id, user_id, content, created_at)
      VALUES (?, ?, ?, ?)
    `).run(data.discussionId, payload.userId, data.content, now);

    return { success: true };
  });

// 11. Add Zoom Session (Therapist only)
export const addZoomSession = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; courseId: number; title: string; zoomLink: string; scheduledAt: string; durationMin: number } }) => {
    const payload = verifyToken(data.token);
    if (!payload || payload.role !== "therapist") {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    const now = new Date().toISOString();

    db.query(`
      INSERT INTO zoom_sessions (course_id, title, zoom_link, scheduled_at, duration_min, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(data.courseId, data.title, data.zoomLink, data.scheduledAt, data.durationMin, now);

    return { success: true };
  });

// 12. Add Course Module (Therapist only)
export const addCourseModule = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; courseId: number; title: string; contentType: string; contentUrl: string } }) => {
    const payload = verifyToken(data.token);
    if (!payload || payload.role !== "therapist") {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    const now = new Date().toISOString();

    // Get max order_index
    const maxOrder = db.query("SELECT MAX(order_index) as max_order FROM course_modules WHERE course_id = ?")
      .get(data.courseId) as any;
    const nextOrder = (maxOrder?.max_order || 0) + 1;

    db.query(`
      INSERT INTO course_modules (course_id, title, content_type, content_url, order_index, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(data.courseId, data.title, data.contentType, data.contentUrl, nextOrder, now);

    return { success: true };
  });

// 13. Delete Course Module (Therapist only)
export const deleteCourseModule = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; moduleId: number } }) => {
    const payload = verifyToken(data.token);
    if (!payload || payload.role !== "therapist") {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    db.query("DELETE FROM course_modules WHERE id = ?").run(data.moduleId);

    return { success: true };
  });

// 14. Add Course Resource (Therapist only)
export const addCourseResource = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; courseId: number; title: string; fileType: string; fileUrl: string; description: string } }) => {
    const payload = verifyToken(data.token);
    if (!payload || payload.role !== "therapist") {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    const now = new Date().toISOString();

    db.query(`
      INSERT INTO resources (course_id, title, file_type, file_url, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(data.courseId, data.title, data.fileType, data.fileUrl, data.description, now);

    return { success: true };
  });

// 15. Delete Course Resource (Therapist only)
export const deleteCourseResource = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; resourceId: number } }) => {
    const payload = verifyToken(data.token);
    if (!payload || payload.role !== "therapist") {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    db.query("DELETE FROM resources WHERE id = ?").run(data.resourceId);

    return { success: true };
  });

// 16. Create Course (Therapist only)
export const createCourse = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; title: string; description: string; priceCents: number } }) => {
    const payload = verifyToken(data.token);
    if (!payload || payload.role !== "therapist") {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    const now = new Date().toISOString();

    db.query(`
      INSERT INTO courses (title, description, price_cents, published, created_at)
      VALUES (?, ?, ?, 1, ?)
    `).run(data.title, data.description, data.priceCents, now);

    return { success: true };
  });

// 17. Delete Course (Therapist only)
export const deleteCourse = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; courseId: number } }) => {
    const payload = verifyToken(data.token);
    if (!payload || payload.role !== "therapist") {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    db.query("DELETE FROM courses WHERE id = ?").run(data.courseId);

    return { success: true };
  });

// 18. Get All Courses (Checkout and General browse)
export const getAllCourses = createServerFn({ method: "GET" })
  .handler(async ({ data }: { data: { token: string } }) => {
    const payload = verifyToken(data.token);
    if (!payload) {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    const courses = db.query("SELECT * FROM courses WHERE published = 1 ORDER BY created_at DESC").all() as any[];
    
    // Check which ones are already enrolled
    const enrollments = db.query("SELECT course_id FROM enrollments WHERE user_id = ?").all(payload.userId) as any[];
    const enrolledIds = enrollments.map((e) => e.course_id);

    return {
      courses: courses.map((c) => ({
        ...c,
        isEnrolled: enrolledIds.includes(c.id),
      })),
    };
  });

// 19. Checkout / Enroll Course
export const checkoutCourse = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { token: string; courseId: number } }) => {
    const payload = verifyToken(data.token);
    if (!payload) {
      throw new Error("Unauthorized access.");
    }

    const db = await getDb();
    const now = new Date().toISOString();

    // Check if course exists
    const course = db.query("SELECT id, price_cents FROM courses WHERE id = ?").get(data.courseId) as any;
    if (!course) {
      throw new Error("Course not found.");
    }

    // Insert order record
    db.query(`
      INSERT INTO orders (user_id, course_id, amount_cents, status, stripe_session_id, created_at)
      VALUES (?, ?, ?, 'completed', ?, ?)
    `).run(payload.userId, data.courseId, course.price_cents, `mock_stripe_session_${Date.now()}`, now);

    // Enroll user
    db.query(`
      INSERT OR IGNORE INTO enrollments (user_id, course_id, progress_pct, created_at)
      VALUES (?, ?, 0.0, ?)
    `).run(payload.userId, data.courseId, now);

    return { success: true };
  });
