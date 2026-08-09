import db from './db.js';

export const getAllProjects = async () => {
    const query = `
        SELECT 
            p.project_id, 
            p.organization_id, 
            p.title, 
            p.description, 
            p.location, 
            p.date,
            o.name AS organization_name
        FROM public.service_project p
        INNER JOIN public.organization o ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

export const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export const getUpcomingProjects = async (number_of_projects) => {
    const query = `
SELECT 
    sp.project_id,
    sp.title,
    sp.description,
    sp.date,
    sp.location,    
    o.organization_id,
    o.name AS organization_name
FROM 
    service_project sp
INNER JOIN 
    organization o ON sp.organization_id = o.organization_id
WHERE 
    sp.date::date >= CURRENT_DATE
ORDER BY 
    sp.date::date ASC
LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export const getProjectDetails = async (id) => {
    const query = `
SELECT 
    sp.project_id,
    sp.title,
    sp.description,
    sp.date,
    sp.location,    
    o.organization_id,
    o.name AS organization_name,
    pv.volunteer_id,
    pv.user_id
FROM 
    service_project sp
INNER JOIN 
    organization o ON sp.organization_id = o.organization_id
LEFT JOIN 
    project_volunteer pv ON sp.project_id = pv.project_id
WHERE 
    sp.project_id = $1;
      `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

export const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO service_project (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

export const updateProject = async (projectId, title, description, location, date, organizationId) => {
    const query = `
  UPDATE public.service_project
    SET title = $1, description = $2, location = $3, date = $4, organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

    const queryParams = [title, description, location, date, organizationId, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated Project with ID:', projectId);
    }

    return result.rows[0].project_id;
};