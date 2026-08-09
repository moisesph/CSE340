import db from './db.js';
import bcrypt from 'bcrypt';

export const enterVolunteerIntoProject = async (volunteerId, projectId) => {
    const query = `
        INSERT INTO project_volunteer (user_id, project_id) 
        VALUES ($1, $2) 
        RETURNING volunteer_id
    `;
    const queryParams = [volunteerId, projectId];
    const result = await db.query(query, queryParams);
    return result.rows[0];
};


export const getVolunteerAllProjects = async (volunteerId) => {
    const query = `
       SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.date
FROM service_project sp
JOIN project_volunteer pv ON sp.project_id = pv.project_id
WHERE pv.user_id = $1;
    `;
    const queryParams = [volunteerId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

export const deleteVolunteerFromProject = async (volunteerId, projectId) => {
    const query = `
        DELETE FROM project_volunteer 
WHERE user_id = $1 AND project_id = $2 
RETURNING volunteer_id;
    `;
    const queryParams = [volunteerId, projectId];
    const result = await db.query(query, queryParams);
    return result.rows[0];
};
