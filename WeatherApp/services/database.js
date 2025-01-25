import * as SQLite from 'expo-sqlite';

let db;

const initializeDatabase = async () => {
  db = await SQLite.openDatabaseAsync('reminderManager', { useNewConnection: true });
  await createTable();
};

export const createTable = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        reminderDate TEXT,
        isCompleted INTEGER
      );
    `);
    console.log("Tables and indexes created successfully.");
  } catch (error) {
    console.log("Error creating tables and indexes: ", error);
  }
};

export const insertReminder = async (title, description, reminderDate, isCompleted = 0) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO reminders (title, description, reminderDate, isCompleted) VALUES (?, ?, ?, ?);`,
      [title, description, reminderDate.toISOString().slice(0, 10), isCompleted]
    );
    console.log("Inserted Data Into Reminders:", result);
  } catch (error) {
    console.error("Error during Reminder insertion:", error);
  }
};

export const getReminders = async (successCallback) => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM reminders;`);
    console.log("Reminders fetched successfully:");
    successCallback(result);
  } catch (error) {
    console.error("Error fetching reminders:", error);
  }
};

export const updateReminder = async (id, title, description, reminderDate, isCompleted, successCallback) => {
  try {
    const result = await db.runAsync(
      `UPDATE reminders SET title = ?, description = ?, reminderDate = ?, isCompleted = ? WHERE id = ?;`,
      [title, description, reminderDate.toISOString().slice(0, 10), isCompleted, id]
    );
    successCallback(result);
  } catch (error) {
    console.error("Error updating reminder:", error);
  }
};

export const deleteReminder = async (id, successCallback) => {
  try {
    const result = await db.runAsync(`DELETE FROM reminders WHERE id = ?;`, [id]);
    successCallback(result);
  } catch (error) {
    console.error("Error deleting reminder:", error);
  }
};

initializeDatabase();