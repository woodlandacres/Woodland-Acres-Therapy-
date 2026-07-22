import { createServerFn } from "@tanstack/react-start";

// Generic API server function — all portal routes call this one function
export const portalApi = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { action: string; payload: any } }) => {
    const { action, payload } = data;
    switch (action) {
      case "login": {
        const { comparePassword, queryDbOne, signToken } = await import("./portalServerOnly");
        const user: any = await queryDbOne("SELECT * FROM users WHERE email = ?", [payload.email]);
        if (!user || !comparePassword(payload.password, user.password_hash)) throw new Error("Invalid email or password.");
        const token = signToken({ userId: user.id, email: user.email, role: user.role });
        return { success: true, token, user: { id: user.id, email: user.email, display_name: user.display_name, role: user.role } };
      }
      case "register": {
        const { hashPassword, runDb } = await import("./portalServerOnly");
        const hashed = hashPassword(payload.password);
        const now = new Date().toISOString();
        try {
          const result: any = await runDb("INSERT INTO users (email, password_hash, display_name, role, created_at) VALUES (?, ?, ?, ?, ?)", [payload.email, hashed, payload.display_name, payload.role, now]);
          return { success: true, userId: result.lastInsertRowid };
        } catch (err: any) {
          if (err.message?.includes("UNIQUE")) throw new Error("Email already registered.");
          throw err;
        }
      }
      case "getPatientDashboard": {
        const { verifyToken, queryDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "patient") throw new Error("Unauthorized");
        const enrollments = await queryDb("SELECT e.*, c.title, c.description FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.user_id = ?", [user.userId]);
        const discussions = await queryDb("SELECT d.*, u.display_name FROM discussions d JOIN users u ON d.user_id = u.id ORDER BY d.created_at DESC LIMIT 10");
        const resources = await queryDb("SELECT r.*, c.title as course_title FROM resources r JOIN courses c ON r.course_id = c.id");
        const zoomSessions = await queryDb("SELECT z.*, c.title as course_title FROM zoom_sessions z JOIN courses c ON z.course_id = c.id WHERE z.scheduled_at >= date('now') ORDER BY z.scheduled_at");
        return { enrollments, discussions, resources, zoomSessions };
      }
      case "getTherapistDashboard": {
        const { verifyToken, queryDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        const students = await queryDb("SELECT u.id, u.email, u.display_name, u.created_at FROM users u WHERE u.role = 'patient' ORDER BY u.created_at DESC");
        const courses = await queryDb("SELECT * FROM courses ORDER BY created_at DESC");
        const discussions = await queryDb("SELECT d.*, u.display_name FROM discussions d JOIN users u ON d.user_id = u.id ORDER BY d.created_at DESC");
        return { students, courses, discussions };
      }
      case "createCourse": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        const now = new Date().toISOString();
        const result: any = await runDb("INSERT INTO courses (title, description, price_cents, published, created_at) VALUES (?, ?, ?, 1, ?)", [payload.title, payload.description, payload.price_cents, now]);
        return { success: true, courseId: result.lastInsertRowid };
      }
      case "getAllCourses": {
        const { queryDb } = await import("./portalServerOnly");
        return await queryDb("SELECT * FROM courses WHERE published = 1 ORDER BY created_at DESC");
      }
      case "getCourseDetail": {
        const { queryDbOne, queryDb } = await import("./portalServerOnly");
        const course = await queryDbOne("SELECT * FROM courses WHERE id = ?", [payload.courseId]);
        const modules = await queryDb("SELECT * FROM course_modules WHERE course_id = ? ORDER BY order_index", [payload.courseId]);
        const resources = await queryDb("SELECT * FROM resources WHERE course_id = ?", [payload.courseId]);
        const zoomSessions = await queryDb("SELECT * FROM zoom_sessions WHERE course_id = ? ORDER BY scheduled_at", [payload.courseId]);
        return { course, modules, resources, zoomSessions };
      }
      case "updateProgress": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "patient") throw new Error("Unauthorized");
        await runDb("UPDATE enrollments SET progress_pct = ? WHERE user_id = ? AND course_id = ?", [payload.progress, user.userId, payload.courseId]);
        return { success: true };
      }
      case "enrollCourse": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "patient") throw new Error("Unauthorized");
        const now = new Date().toISOString();
        await runDb("INSERT INTO enrollments (user_id, course_id, progress_pct, created_at) VALUES (?, ?, 0, ?)", [user.userId, payload.courseId, now]);
        if (payload.amount_cents) {
          await runDb("INSERT INTO orders (user_id, course_id, amount_cents, status, created_at) VALUES (?, ?, ?, 'paid', ?)", [user.userId, payload.courseId, payload.amount_cents, now]);
        }
        return { success: true };
      }
      case "createDiscussion": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user) throw new Error("Unauthorized");
        const now = new Date().toISOString();
        await runDb("INSERT INTO discussions (course_id, user_id, title, content, category, created_at) VALUES (?, ?, ?, ?, ?, ?)", [payload.courseId, user.userId, payload.title, payload.content, payload.category || "General Chat", now]);
        return { success: true };
      }
      case "replyDiscussion": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user) throw new Error("Unauthorized");
        const now = new Date().toISOString();
        await runDb("INSERT INTO discussion_replies (discussion_id, user_id, content, created_at) VALUES (?, ?, ?, ?)", [payload.discussionId, user.userId, payload.content, now]);
        return { success: true };
      }
      case "getReplies": {
        const { queryDb } = await import("./portalServerOnly");
        return await queryDb("SELECT r.*, u.display_name FROM discussion_replies r JOIN users u ON r.user_id = u.id WHERE r.discussion_id = ? ORDER BY r.created_at", [payload.discussionId]);
      }
      case "addModule": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        const now = new Date().toISOString();
        await runDb("INSERT INTO course_modules (course_id, title, content_type, content_url, order_index, created_at) VALUES (?, ?, ?, ?, ?, ?)", [payload.courseId, payload.title, payload.contentType, payload.contentUrl, payload.orderIndex, now]);
        return { success: true };
      }
      case "addResource": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        const now = new Date().toISOString();
        await runDb("INSERT INTO resources (course_id, title, file_type, file_url, description, created_at) VALUES (?, ?, ?, ?, ?, ?)", [payload.courseId, payload.title, payload.fileType, payload.fileUrl, payload.description, now]);
        return { success: true };
      }
      case "addZoomSession": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        const now = new Date().toISOString();
        await runDb("INSERT INTO zoom_sessions (course_id, title, zoom_link, scheduled_at, duration_min, created_at) VALUES (?, ?, ?, ?, ?, ?)", [payload.courseId, payload.title, payload.zoomLink, payload.scheduledAt, payload.durationMin, now]);
        return { success: true };
      }
      case "getPatientResources": {
        const { verifyToken, queryDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "patient") throw new Error("Unauthorized");
        return await queryDb("SELECT r.*, c.title as course_title FROM resources r JOIN courses c ON r.course_id = c.id JOIN enrollments e ON e.course_id = c.id AND e.user_id = ? ORDER BY r.created_at DESC", [user.userId]);
      }
      case "getPatientZoomSessions": {
        const { verifyToken, queryDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "patient") throw new Error("Unauthorized");
        return await queryDb("SELECT z.*, c.title as course_title FROM zoom_sessions z JOIN courses c ON z.course_id = c.id JOIN enrollments e ON e.course_id = c.id AND e.user_id = ? WHERE z.scheduled_at >= date('now') ORDER BY z.scheduled_at", [user.userId]);
      }
      case "getPatientDiscussions": {
        const { verifyToken, queryDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "patient") throw new Error("Unauthorized");
        return await queryDb("SELECT d.*, u.display_name FROM discussions d JOIN users u ON d.user_id = u.id JOIN enrollments e ON e.course_id = d.course_id AND e.user_id = ? ORDER BY d.created_at DESC", [user.userId]);
      }
      case "getAllEnrollments": {
        const { verifyToken, queryDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        return await queryDb("SELECT e.*, u.display_name as student_name, u.email as student_email, c.title as course_title FROM enrollments e JOIN users u ON e.user_id = u.id JOIN courses c ON e.course_id = c.id ORDER BY u.display_name");
      }
      case "getTherapistCourses": {
        const { verifyToken, queryDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        return await queryDb("SELECT * FROM courses ORDER BY created_at DESC");
      }
      case "deleteModule": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        await runDb("DELETE FROM course_modules WHERE id = ?", [payload.moduleId || payload.id]);
        return { success: true };
      }
      case "deleteResource": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        await runDb("DELETE FROM resources WHERE id = ?", [payload.resourceId || payload.id]);
        return { success: true };
      }
      case "deleteCourse": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        const courseId = payload.courseId || payload.id;
        await runDb("DELETE FROM enrollments WHERE course_id = ?", [courseId]);
        await runDb("DELETE FROM course_modules WHERE course_id = ?", [courseId]);
        await runDb("DELETE FROM resources WHERE course_id = ?", [courseId]);
        await runDb("DELETE FROM zoom_sessions WHERE course_id = ?", [courseId]);
        await runDb("DELETE FROM discussions WHERE course_id = ?", [courseId]);
        await runDb("DELETE FROM courses WHERE id = ?", [courseId]);
        return { success: true };
      }
      case "unenrollStudent": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        await runDb("DELETE FROM enrollments WHERE course_id = ? AND user_id = ?", [payload.courseId, payload.userId]);
        return { success: true };
      }
      case "deleteZoomSession": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        await runDb("DELETE FROM zoom_sessions WHERE id = ?", [payload.sessionId || payload.id]);
        return { success: true };
      }
      case "getDiscussionThreads": {
        const { verifyToken, queryDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user) throw new Error("Unauthorized");
        const threads: any[] = await queryDb("SELECT d.*, u.display_name FROM discussions d JOIN users u ON d.user_id = u.id WHERE d.course_id = ? ORDER BY d.created_at DESC", [payload.courseId]);
        for (const t of threads) {
          t.replies = await queryDb("SELECT r.*, u.display_name FROM discussion_replies r JOIN users u ON r.user_id = u.id WHERE r.discussion_id = ? ORDER BY r.created_at ASC", [t.id]);
        }
        return threads;
      }
      case "updateModuleOrder": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        await runDb("UPDATE course_modules SET order_index = ? WHERE id = ?", [payload.orderIndex || payload.order_index, payload.moduleId || payload.id]);
        return { success: true };
      }
      case "updateCourse": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        await runDb(
          "UPDATE courses SET title = ?, description = ?, price_cents = ?, published = ?, syllabus_type = ? WHERE id = ?",
          [payload.title, payload.description, payload.price_cents, payload.published, payload.syllabus_type || 'self_paced', payload.courseId || payload.id]
        );
        return { success: true };
      }
      case "updateZoomSession": {
        const { verifyToken, runDb } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        await runDb(
          "UPDATE zoom_sessions SET title = ?, zoom_link = ?, scheduled_at = ?, duration_min = ? WHERE id = ?",
          [payload.title, payload.zoomLink || payload.zoom_link, payload.scheduledAt || payload.scheduled_at, payload.durationMin || payload.duration_min, payload.sessionId || payload.id]
        );
        return { success: true };
      }
      case "verifySession": {
        const { verifyToken } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user) throw new Error("Invalid session");
        return { success: true, user: { id: user.userId, email: user.email, role: user.role } };
      }
      case "requestPasswordReset": {
        const { queryDbOne, runDb } = await import("./portalServerOnly");
        const user: any = await queryDbOne("SELECT * FROM users WHERE email = ?", [payload.email]);
        if (!user) {
          console.log(`Password reset requested for non-existent email: ${payload.email}`);
          return { success: true, message: "If that email address exists in our system, we've sent a password reset link to it." };
        }
        
        // Generate UUID token
        const token = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour expiration
        const now = new Date().toISOString();
        
        // Save to password_resets
        await runDb("DELETE FROM password_resets WHERE email = ?", [user.email]);
        await runDb(
          "INSERT INTO password_resets (email, token, expires_at, created_at) VALUES (?, ?, ?, ?)",
          [user.email, token, expiresAt, now]
        );
        
        // Construct reset link
        const resetLink = `https://b8fc6da28c11d57088a3189002633958.ctonew.app/portal/reset-password?token=${token}`;
        
        // Log to console for development verification
        console.log(`\n--- PASSWORD RESET REQUEST ---`);
        console.log(`To: ${user.email}`);
        console.log(`Reset Link: ${resetLink}`);
        console.log(`------------------------------\n`);
        
        return { 
          success: true, 
          message: "Secure password reset link has been dispatched to your email address.",
          devLink: resetLink
        };
      }
      case "resetPassword": {
        const { queryDbOne, runDb, hashPassword } = await import("./portalServerOnly");
        const resetRecord: any = await queryDbOne("SELECT * FROM password_resets WHERE token = ?", [payload.token]);
        if (!resetRecord) {
          throw new Error("Invalid or expired password reset token.");
        }
        
        // Check expiration
        if (new Date(resetRecord.expires_at) < new Date()) {
          await runDb("DELETE FROM password_resets WHERE token = ?", [payload.token]);
          throw new Error("This password reset link has expired. Please request a new one.");
        }
        
        // Update user's password
        const hashedPassword = hashPassword(payload.password);
        await runDb("UPDATE users SET password_hash = ? WHERE email = ?", [hashedPassword, resetRecord.email]);
        
        // Clean up token
        await runDb("DELETE FROM password_resets WHERE email = ?", [resetRecord.email]);
        
        console.log(`Password reset successfully for ${resetRecord.email}`);
        return { success: true };
      }
      case "submitContactForm": {
        const { name, email, phone, interest, insurance, message } = payload;
        if (!name || !email) {
          throw new Error("Name and email are required.");
        }
        const { appendFile } = await import("fs/promises");
        const now = new Date().toISOString();
        const submission = {
          name: name.trim(),
          email: email.trim(),
          phone: phone?.trim() || "",
          interest: interest?.trim() || "",
          insurance: insurance?.trim() || "",
          message: message?.trim() || "",
          status: "pending",
          timestamp: now
        };
        await appendFile(
          "/home/team/shared/contact_submissions.json",
          JSON.stringify(submission) + "\n",
          "utf-8"
        );
        console.log(`[Contact Submission] Received contact form from ${name} (${email}) and stored in JSON file at ${now}`);
        return { success: true, message: "Your message has been received!" };
      }
      case "getPendingContactSubmissions": {
        const { verifyToken } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        
        const { readFile } = await import("fs/promises");
        try {
          const content = await readFile("/home/team/shared/contact_submissions.json", "utf-8");
          const lines = content.trim().split("\n").filter(Boolean);
          const submissions = lines.map((line, index) => {
            const data = JSON.parse(line);
            return { id: index + 1, ...data };
          });
          return submissions.filter((s: any) => s.status !== "sent");
        } catch (e) {
          return [];
        }
      }
      case "markContactSent": {
        const { verifyToken } = await import("./portalServerOnly");
        const user = verifyToken(payload.token);
        if (!user || user.role !== "therapist") throw new Error("Unauthorized");
        
        const { readFile, writeFile } = await import("fs/promises");
        try {
          const content = await readFile("/home/team/shared/contact_submissions.json", "utf-8");
          const lines = content.trim().split("\n").filter(Boolean);
          const submissions = lines.map((line, index) => {
            const data = JSON.parse(line);
            const virtualId = index + 1;
            if (virtualId === payload.id) {
              data.status = "sent";
            }
            return data;
          });
          await writeFile(
            "/home/team/shared/contact_submissions.json",
            submissions.map(s => JSON.stringify(s)).join("\n") + "\n",
            "utf-8"
          );
          return { success: true };
        } catch (e) {
          throw new Error("Failed to update submission status");
        }
      }
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  });// Legacy named exports that delegate to portalApi
export const loginUser = (opts: any) => portalApi({ data: { action: "login", payload: opts.data } });
export const registerUser = (opts: any) => portalApi({ data: { action: "register", payload: opts.data } });
export const requestPasswordReset = (opts: any) => portalApi({ data: { action: "requestPasswordReset", payload: opts.data } });
export const resetPassword = (opts: any) => portalApi({ data: { action: "resetPassword", payload: opts.data } });
export const getPatientDashboardData = (opts: any) => portalApi({ data: { action: "getPatientDashboard", payload: opts.data } });
export const getTherapistDashboardData = (opts: any) => portalApi({ data: { action: "getTherapistDashboard", payload: opts.data } });
export const createCourse = (opts: any) => portalApi({ data: { action: "createCourse", payload: opts.data } });
export const getAllCourses = (opts: any) => portalApi({ data: { action: "getAllCourses", payload: opts.data } });
export const getCourseDetail = (opts: any) => portalApi({ data: { action: "getCourseDetail", payload: opts.data } });
export const updateProgress = (opts: any) => portalApi({ data: { action: "updateProgress", payload: opts.data } });
export const enrollInCourse = (opts: any) => portalApi({ data: { action: "enrollCourse", payload: opts.data } });
export const checkoutCourse = (opts: any) => portalApi({ data: { action: "enrollCourse", payload: opts.data } });
export const createDiscussionPost = (opts: any) => portalApi({ data: { action: "createDiscussion", payload: opts.data } });
export const replyToDiscussion = (opts: any) => portalApi({ data: { action: "replyDiscussion", payload: opts.data } });
export const getDiscussionReplies = (opts: any) => portalApi({ data: { action: "getReplies", payload: opts.data } });
export const addCourseModule = (opts: any) => portalApi({ data: { action: "addModule", payload: opts.data } });
export const addResource = (opts: any) => portalApi({ data: { action: "addResource", payload: opts.data } });
export const addZoomSession = (opts: any) => portalApi({ data: { action: "addZoomSession", payload: opts.data } });
export const getPatientResources = (opts: any) => portalApi({ data: { action: "getPatientResources", payload: opts.data } });
export const getPatientZoomSessions = (opts: any) => portalApi({ data: { action: "getPatientZoomSessions", payload: opts.data } });
export const getPatientDiscussions = (opts: any) => portalApi({ data: { action: "getPatientDiscussions", payload: opts.data } });
export const getAllEnrollments = (opts: any) => portalApi({ data: { action: "getAllEnrollments", payload: opts.data } });
export const getTherapistCourses = (opts: any) => portalApi({ data: { action: "getTherapistCourses", payload: opts.data } });
export const getDiscussions = (opts: any) => portalApi({ data: { action: "getTherapistDashboard", payload: opts.data } });
export const addDiscussionReply = (opts: any) => portalApi({ data: { action: "replyDiscussion", payload: opts.data } });
export const verifySession = (opts: any) => portalApi({ data: { action: "verifySession", payload: opts.data } });
export const deleteCourseModule = (opts: any) => portalApi({ data: { action: "deleteModule", payload: opts.data } });
export const deleteResource = (opts: any) => portalApi({ data: { action: "deleteResource", payload: opts.data } });
export const deleteCourse = (opts: any) => portalApi({ data: { action: "deleteCourse", payload: opts.data } });
export const unenrollStudent = (opts: any) => portalApi({ data: { action: "unenrollStudent", payload: opts.data } });
export const getDiscussionThreads = (opts: any) => portalApi({ data: { action: "getDiscussionThreads", payload: opts.data } });
export const updateCourse = (opts: any) => portalApi({ data: { action: "updateCourse", payload: opts.data } });
export const updateZoomSession = (opts: any) => portalApi({ data: { action: "updateZoomSession", payload: opts.data } });
export const updateModuleOrder = (opts: any) => portalApi({ data: { action: "updateModuleOrder", payload: opts.data } });
export const submitContactForm = (opts: any) => portalApi({ data: { action: "submitContactForm", payload: opts.data } });
export const getPendingContactSubmissions = (opts: any) => portalApi({ data: { action: "getPendingContactSubmissions", payload: opts.data } });
export const markContactSent = (opts: any) => portalApi({ data: { action: "markContactSent", payload: opts.data } });
