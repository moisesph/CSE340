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