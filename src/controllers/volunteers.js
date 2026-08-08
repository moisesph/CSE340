import {
    enterVolunteerIntoProject,
    getVolunteerAllProjects
} from '../models/volunteers.js';


export const showBeVolunteerOption = async (req, res) => {
    res.render('project', { titleVolunteer: 'Be a Volunteer' });
};

export const processVolunteerOption = async (req, res) => {
    const { projectId } = req.params;
    const { user_id } = req.session.user;
    try {
        // Create the new project in the database
        const enrollmentProject = await enterVolunteerIntoProject(user_id, projectId);

        req.flash('success', 'Volunteer enrollment created successfully!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error enrolling to the project:', error);
        req.flash('error', 'There was an error enrolling to the project.');
        res.redirect(`/project/${projectId}`);
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