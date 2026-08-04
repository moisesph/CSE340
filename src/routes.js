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
    processLogout
} from './controllers/users.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/edit-organization/:id', processEditOrganizationForm);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', showNewProjectForm);
router.get('/edit-project/:id', showEditProjectForm);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetails);
router.get('/new-category', showNewCategoryForm);
router.get('/update-category/:id', showEditCategoryForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);

router.get('/register', showUserRegistrationForm);

router.get('/login', showLoginForm);
router.get('/logout', processLogout);

router.get('/test-error', testErrorPage);


router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

router.post('/new-category', categoryValidation, processNewCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

router.post('/register', processUserRegistrationForm);

router.post('/login', processLoginForm);

export default router;