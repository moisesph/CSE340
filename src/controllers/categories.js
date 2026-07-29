import {
    getAllCategories,
    getCategoryById,
    getCategoriesByServiceProjectId,
    getAllProjectsByCategory,
    updateCategoryAssignments
} from '../models/categories.js';

import { getProjectDetails }
    from '../models/projects.js';

export const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

export const showCategoryDetails = async (req, res) => {
    const { id } = req.params;
    const category = await getCategoryById(id);
    const title = 'Category Details';
    const projects = await getAllProjectsByCategory(id);

    res.render('category', { title, category, projects });
};

export const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

export const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};
