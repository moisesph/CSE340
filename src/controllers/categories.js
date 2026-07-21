import {
    getAllCategories,
    getCategoryById,
    getCategoriesByProject,
    getAllProjectsByCategory
} from '../models/categories.js';
 
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