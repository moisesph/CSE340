import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';


import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetails,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    showEditCategoryForm,
    processNewCategoryForm,
    categoryValidation,
    processEditCategoryForm
} from './controllers/categories.js';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showAllUsers
} from './controllers/users.js';

import {
    processVolunteerOption
} from './controllers/volunteers.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', requireLogin, requireRole('admin'), showNewOrganizationForm);
router.get('/edit-organization/:id', requireLogin, requireRole('admin'), showEditOrganizationForm);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', requireLogin, requireRole('admin'), showNewProjectForm);
router.get('/edit-project/:id', requireLogin, requireRole('admin'), showEditProjectForm);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetails);
router.get('/new-category', requireLogin, requireRole('admin'), showNewCategoryForm);
router.get('/update-category/:id', requireLogin, requireRole('admin'), showEditCategoryForm);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);

router.get('/register', showUserRegistrationForm);

router.get('/login', showLoginForm);
router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireLogin, requireRole('admin'), showAllUsers);

router.get('/test-error', testErrorPage);


router.post('/new-organization', requireLogin, requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', requireLogin, requireRole('admin'), organizationValidation, processEditOrganizationForm);

router.post('/new-project', requireLogin, requireRole('admin'), projectValidation, processNewProjectForm);
router.post('/edit-project/:id', requireLogin, requireRole('admin'), projectValidation, processEditProjectForm);
router.post('/assign-categories/:projectId', requireLogin, requireRole('admin'), processAssignCategoriesForm);

router.post('/new-category', requireLogin, requireRole('admin'), categoryValidation, processNewCategoryForm);
router.post('/update-category/:id', requireLogin, requireRole('admin'), categoryValidation, processEditCategoryForm);

router.post('/register', processUserRegistrationForm);

router.post('/login', processLoginForm);

router.post('/project/:projectId', requireLogin, requireRole('user'), processVolunteerOption);

export default router;