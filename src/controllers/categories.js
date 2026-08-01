import {
    getAllCategories,
    getCategoryById,
    getCategoriesByServiceProjectId,
    getAllProjectsByCategory,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails }
    from '../models/projects.js';

import { body, validationResult } from 'express-validator';

export const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

export const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
];


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



export const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

export const processNewCategoryForm = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategoryId = await createCategory(name);
        req.flash('success', 'New category created successfully!');
        res.redirect(`/category/${newCategoryId}`);
    } catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/new-category');
    }
};

export const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    const title = 'Edit Category';
    res.render('update-category', { title, category });
};

export const processEditCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/update-category/' + req.params.id);
    }
    const categoryId = req.params.id;
    const { name } = req.body;

    try {
        await updateCategory(categoryId, name);
        req.flash('success', 'Category updated successfully!');
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error updating category:', error);
        req.flash('error', 'There was an error updating the category.');
        res.redirect(`/update-category/${categoryId}`);
    }
};

