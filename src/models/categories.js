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

export async function getCategoriesByServiceProjectId(projectId) {
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


export const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO service_project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}


export const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM service_project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}


export const createCategory = async (name) => {
    const query = `
     INSERT INTO project_category (name)
     VALUES ($1)
     RETURNING category_id;
    `;

    const queryParams = [name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
};


export const updateCategory = async (categoryId, name) => {
    const query = `
UPDATE project_category
  SET name = $1
  WHERE category_id = $2
  RETURNING category_id;
  `;

    const queryParams = [name, categoryId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated Category with ID:', categoryId);
    }

    return result.rows[0].category_id;
};
