let dbInstance: any = null;

export async function getDb() {
  if (typeof window !== "undefined") {
    throw new Error("getDb can only be called on the server");
  }

  if (!dbInstance) {
    const { Database } = await import("bun:sqlite");
    dbInstance = new Database("/home/team/shared/site/portal.db");
    dbInstance.exec("PRAGMA journal_mode = WAL;");
    await initDb(dbInstance);
  }
  return dbInstance;
}

async function initDb(db: any) {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT,
      display_name TEXT,
      role TEXT CHECK(role IN ('therapist','patient')),
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      price_cents INTEGER,
      published INTEGER DEFAULT 0,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      course_id INTEGER,
      progress_pct REAL DEFAULT 0,
      created_at TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE(user_id, course_id)
    );

    CREATE TABLE IF NOT EXISTS course_modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      title TEXT,
      content_type TEXT, -- 'video', 'pdf', 'text'
      content_url TEXT,
      order_index INTEGER,
      created_at TEXT,
      FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      title TEXT,
      file_type TEXT,
      file_url TEXT,
      description TEXT,
      created_at TEXT,
      FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS zoom_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      title TEXT,
      zoom_link TEXT,
      scheduled_at TEXT, -- ISO string
      duration_min INTEGER,
      created_at TEXT,
      FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS discussions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      user_id INTEGER,
      title TEXT,
      content TEXT,
      created_at TEXT,
      FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS discussion_replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discussion_id INTEGER,
      user_id INTEGER,
      content TEXT,
      created_at TEXT,
      FOREIGN KEY(discussion_id) REFERENCES discussions(id) ON DELETE CASCADE,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      course_id INTEGER,
      amount_cents INTEGER,
      status TEXT,
      stripe_session_id TEXT,
      created_at TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
      FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE SET NULL
    );
  `);

  // Seed data
  const now = new Date().toISOString();

  // Check if therapist exists
  const therapistEmail = "weaveraemily@gmail.com";
  const therapist = db.query("SELECT * FROM users WHERE email = ?").get(therapistEmail);
  let therapistId = therapist?.id;

  if (!therapist) {
    const hash = bcryptjs.hashSync("therapist123", 10);
    const result = db.query(`
      INSERT INTO users (email, password_hash, display_name, role, created_at)
      VALUES (?, ?, ?, 'therapist', ?)
      RETURNING id
    `).get(therapistEmail, hash, "Emily Weaver, LPC", now) as any;
    therapistId = result.id;
  }

  // Check if patient exists
  const patientEmail = "patient@test.com";
  const patient = db.query("SELECT * FROM users WHERE email = ?").get(patientEmail);
  let patientId = patient?.id;

  if (!patient) {
    const hash = bcryptjs.hashSync("patient123", 10);
    const result = db.query(`
      INSERT INTO users (email, password_hash, display_name, role, created_at)
      VALUES (?, ?, ?, 'patient', ?)
      RETURNING id
    `).get(patientEmail, hash, "Alex Mercer", now) as any;
    patientId = result.id;
  }

  // Seed sample courses if empty
  const courseCount = db.query("SELECT COUNT(*) as count FROM courses").get() as any;
  if (courseCount.count === 0) {
    // Course 1
    const course1 = db.query(`
      INSERT INTO courses (title, description, price_cents, published, created_at)
      VALUES (?, ?, ?, 1, ?)
      RETURNING id
    `).get(
      "ERP Mechanics for Severe OCD",
      "A rigorous, evidence-based online curriculum designed to guide individuals through the core mechanics of Exposure and Response Prevention (ERP) therapy. Learn how to map triggers, construct hierarchies, and execute systematic exposures to reclaim your life from OCD.",
      14900, // $149.00
      now
    ) as any;
    const c1Id = course1.id;

    // Course 2
    const course2 = db.query(`
      INSERT INTO courses (title, description, price_cents, published, created_at)
      VALUES (?, ?, ?, 1, ?)
      RETURNING id
    `).get(
      "Neurodivergent Relationships in Adulthood",
      "A specialized course for autistic and ADHD individuals, and their partners, focusing on communication styles, sensory regulation, emotional labor, and building deep mutual connection grounded in neurodivergent-affirming care.",
      19900, // $199.00
      now
    ) as any;
    const c2Id = course2.id;

    // Seed enrollments for the patient
    db.query(`
      INSERT INTO enrollments (user_id, course_id, progress_pct, created_at)
      VALUES (?, ?, 67.0, ?)
    `).run(patientId, c1Id, now);

    db.query(`
      INSERT INTO enrollments (user_id, course_id, progress_pct, created_at)
      VALUES (?, ?, 25.0, ?)
    `).run(patientId, c2Id, now);

    // Seed course modules for Course 1
    const modulesC1 = [
      { title: "Module 1: Mapping Obsessions and Compulsions", order: 1, type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "Module 2: Building Your Exposure Hierarchy", order: 2, type: "pdf", url: "/downloads/worksheets/erp_hierarchy_blank.pdf" },
      { title: "Module 3: The Golden Rule of Response Prevention", order: 3, type: "text", url: "" },
      { title: "Module 4: Executing Real-Life In-Vivo Exposures", order: 4, type: "video", url: "https://www.w3schools.com/html/movie.mp4" },
      { title: "Module 5: Dealing with Imaginal Exposure Scenarios", order: 5, type: "text", url: "" }
    ];

    for (const m of modulesC1) {
      db.query(`
        INSERT INTO course_modules (course_id, title, content_type, content_url, order_index, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(c1Id, m.title, m.type, m.url, m.order, now);
    }

    // Seed course modules for Course 2
    const modulesC2 = [
      { title: "Module 1: Neurodivergent Communication Patterns", order: 1, type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "Module 2: Sensory Profiles and Shared Space", order: 2, type: "pdf", url: "/downloads/worksheets/sensory_profile_assessment.pdf" },
      { title: "Module 3: Dismantling Masking in Intimate Settings", order: 3, type: "text", url: "" }
    ];

    for (const m of modulesC2) {
      db.query(`
        INSERT INTO course_modules (course_id, title, content_type, content_url, order_index, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(c2Id, m.title, m.type, m.url, m.order, now);
    }

    // Seed resources
    db.query(`
      INSERT INTO resources (course_id, title, file_type, file_url, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      c1Id,
      "Blank ERP Hierarchy Template",
      "PDF",
      "/downloads/worksheets/erp_hierarchy_blank.pdf",
      "Printable worksheet to build your exposure hierarchy lists with subjective units of distress (SUDs).",
      now
    );

    db.query(`
      INSERT INTO resources (course_id, title, file_type, file_url, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      c1Id,
      "Daily Exposure Tracking Log",
      "PDF",
      "/downloads/worksheets/daily_exposure_log.pdf",
      "Record your daily distress rates before, during, and after exposures.",
      now
    );

    db.query(`
      INSERT INTO resources (course_id, title, file_type, file_url, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      c2Id,
      "Sensory Profile Assessment Checklist",
      "PDF",
      "/downloads/worksheets/sensory_profile_assessment.pdf",
      "A collaborative check-list for couples to share their tactile, auditory, and visual needs.",
      now
    );

    // Seed Zoom classroom schedules
    db.query(`
      INSERT INTO zoom_sessions (course_id, title, zoom_link, scheduled_at, duration_min, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      c1Id,
      "The ERP Integration Lounge",
      "https://zoom.us/j/98877665544",
      new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // 2 hours from now
      60,
      now
    );

    db.query(`
      INSERT INTO zoom_sessions (course_id, title, zoom_link, scheduled_at, duration_min, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      c2Id,
      "Neurodivergent Connections Live Integration Meeting",
      "https://zoom.us/j/11122233344",
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days from now
      90,
      now
    );

    // Seed discussion boards
    const disc1 = db.query(`
      INSERT INTO discussions (course_id, user_id, title, content, created_at)
      VALUES (?, ?, ?, ?, ?)
      RETURNING id
    `).get(
      c1Id,
      patientId,
      "How to prevent immediate handwashing after touch exposures?",
      "Hi everyone, I am currently doing Module 4 exposures. When I touch the bathroom door handle, my anxiety spikes to 75 SUDs and I immediately run to wash my hands. Does anyone have tips for delaying the response even by 5 minutes?",
      now
    ) as any;

    db.query(`
      INSERT INTO discussion_replies (discussion_id, user_id, content, created_at)
      VALUES (?, ?, ?, ?)
    `).run(
      disc1.id,
      therapistId,
      "Great question, Alex. Try sitting on your hands or walking outside of the bathroom immediately after touching the handle. Changing your physical environment helps disrupt the automatic habit loop. You can also start with a 1-minute delay timer and build up!",
      now
    );

    db.query(`
      INSERT INTO discussion_replies (discussion_id, user_id, content, created_at)
      VALUES (?, ?, ?, ?)
    `).run(
      disc1.id,
      patientId,
      "Thank you Emily! Sitting on my hands immediately and stepping away worked for a 2 minute delay yesterday. I'll keep practicing.",
      now
    );
  }
}
