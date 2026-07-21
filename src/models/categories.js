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

export async function getCategoryById(id) {
    try {
        const query = `
SELECT 
    category_id,
    name
FROM 
    public.project_category
WHERE 
    category_id = $1;`;
        const queryParams = [id];
        const result = await db.query(query, queryParams);
        return result.rows[0];
    } catch (error) {
        console.error("Error in", error);
        throw error;
    }
} 

export async function getCategoriesByProject(projectId) {
    try {
        const query = `
SELECT 
    pc.category_id,
    pc.name
FROM 
    project_category pc
INNER JOIN 
    service_project_category spc ON pc.category_id = spc.category_id
WHERE 
    spc.project_id = $1
ORDER BY 
    pc.name ASC;`;
        const queryParams = [projectId];
        const result = await db.query(query, queryParams);
        return result.rows;
    } catch (error) {
        console.error("Error in", error);
        throw error;
    }
}

export async function getAllProjectsByCategory(categoryId) {
    try {
        const query = `SELECT 
    sp.project_id,
    sp.organization_id,
    sp.title,
    sp.description,
    sp.location,
    sp.date
FROM 
    service_project sp
INNER JOIN 
    service_project_category spc ON sp.project_id = spc.project_id
WHERE 
    spc.category_id = $1
ORDER BY 
    sp.date ASC;`;
        const queryParams = [categoryId];
        const result = await db.query(query, queryParams);
        return result.rows;
    } catch (error) {
        console.error("Error in", error);
        throw error;
    }
}