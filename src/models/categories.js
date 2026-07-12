import db from './db.js'

export async function getAllCategories() {
    try {
        const result = await db.query('SELECT * FROM project_category ORDER BY name ASC');
        return result.rows;
    } catch (error) {
        console.error("Error en getAllCategories:", error);
        throw error;
    }
}