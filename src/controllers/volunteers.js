import {
    enterVolunteerIntoProject
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