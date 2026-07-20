import { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

export const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

export const showProjectDetailsPage = async (req, res) => {
    const { id } = req.params;
    const project = await getProjectDetails(id);
    const title = 'Project Details';

    res.render('project', { title, project });
};
