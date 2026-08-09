import {
    enterVolunteerIntoProject,
    getVolunteerAllProjects,
    deleteVolunteerFromProject
} from '../models/volunteers.js';


export const showBeVolunteerOption = async (req, res) => {
    res.render('project', { titleVolunteer: 'Be a Volunteer' });
};

export const modifyVolunteerEnrollment = async (req, res) => {
    const { user_id } = req.session.user;
    const { projectId } = req.params;
    const { modifyBeVolunteer } = req.body;
    try {
        if (modifyBeVolunteer === 'add') {
            const enrollmentProject = await enterVolunteerIntoProject(user_id, projectId);
            req.flash('success', 'You have been enrolled in the project.');
        } else {
            await deleteVolunteerFromProject(user_id, projectId);
            req.flash('success', 'You have been removed from the project.');
        }

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Process Volunteer Enrollment or Disenrollment:', error);
        req.flash('error', 'There was an error trying to modify your Enrolling.');
        res.redirect(`/project/${projectId}`);
    }
};

export const inDashboardModifyVolunteerEnrollment = async (req, res) => {
    const { user_id } = req.session.user;
    const { projectId } = req.params;
    const { modifyBeVolunteer } = req.body;
    try {
        if (modifyBeVolunteer === 'addInDashboard') {
            const enrollmentProject = await enterVolunteerIntoProject(user_id, projectId);
            req.flash('success', 'You have been enrolled in the project.');
        } else {
            await deleteVolunteerFromProject(user_id, projectId);
            req.flash('success', 'You have been removed from the project.');
        }

        res.redirect(`/dashboard`);
    } catch (error) {
        console.error('Process Volunteer Enrollment or Disenrollment:', error);
        req.flash('error', 'There was an error trying to modify your Enrolling.');
        res.redirect(`/dashboard`);
    }
};

export const showVolunteerAllProjects = async (req, res, next) => {
    const { user_id } = req.session.user;
    try {
        const projects = await getVolunteerAllProjects(user_id);
        res.locals.projects = projects;
        next();
    } catch (error) {
        console.error('Error fetching volunteer projects:', error);
        req.flash('error', 'There was an error fetching your projects.');
        res.redirect('/dashboard');
    }
};

