import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import Backablenav from '../../Layouts/navs/backable';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';

export default function AddNewProduct({ auth, nav, categories }) {
    const [editorContent, setEditorContent] = useState('');
    const [variantList, setVariantList] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [backendErrors, setBackendErrors] = useState({});

    const { data, setData, post, processing, errors } = useForm({
        product_name: '',
        pSimple_description: '',
        product_description: '',
        price: '',
        publish: false,
        product_url: '',
        product_images: [],
        categories: [],
        variants: [],
    });

    const logFormData = () => {
        console.log({
            product_name: data.product_name,
            pSimple_description: data.pSimple_description,
            product_description: editorContent,
            price: data.price,
            publish: data.publish,
            product_url: data.product_url,
            product_images: data.product_images,
            variants: variantList,
            categories: selectedCategories,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('product_name', data.product_name);
        formData.append('pSimple_description', data.pSimple_description);
        formData.append('product_description', editorContent);
        formData.append('price', data.price);
        formData.append('publish', data.publish);
        formData.append('product_url', data.product_url);
        data.product_images.forEach((image, index) => {
            formData.append(`product_images[${index}]`, image);
        });
        formData.append('categories', JSON.stringify(selectedCategories));
        formData.append('variants', JSON.stringify(variantList));

        try {
            const response = await axios.post('/admin/api/add-Product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // console.log('Product added successfully:', response.data);
            setMessage({ type: 'success', text: 'Product added successfully.' });
            setTimeout(() => {
                window.location.href = '/admin/products';
            }, 3000);
        } catch (error) {
            if (error.response) {
                // Check if there are backend validation errors
                if (error.response.data.errors) {
                    setBackendErrors(error.response.data.errors);
                    setMessage({ type: 'error', text: 'Please fill all required inputs!' });
                } else {
                    setMessage({ type: 'error', text: error.response.data.message || 'Failed to add product!' });
                }
                console.error('Error adding product:', error.response.data);
                // setMessage({ type: 'error', text: error.response.data.message });
            } else {
                console.error('Error adding product:', error.message);
                setMessage({ type: 'error', text: 'An unexpected error occurred.' });
            }
        }
    };

    const Catoptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const noOptionsMessage = () => "No more categories, go to categories and add more categories.";

    const addVariant = () => {
        setVariantList([
            ...variantList,
            { name: '', value: '', price: '' }
        ]);
    };

    const removeVariant = (index) => {
        setVariantList(variantList.filter((_, i) => i !== index));
    };

    const updateVariant = (index, field, value) => {
        const updatedVariants = [...variantList];
        updatedVariants[index][field] = value;
        setVariantList(updatedVariants);
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files);

        setData('product_images', [...data.product_images, ...newImages]);

        const previews = newImages.map(file => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...previews]);
    };

    const removeImage = (index) => {
        const updatedImages = data.product_images.filter((_, i) => i !== index);
        setData('product_images', updatedImages);

        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(updatedPreviews);
    };

    return (
        <>
            <Head title='Add New Product' />
            <Adminnav user={auth.user} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-sm-3 d-flex justify-content-center p-3">
                        <Backablenav navdata={nav} />
                    </div>
                    <div className="col-sm-9 ps-5 p-4 mt-3 bg-light border-radius container shadow-sm">
                    {message.text && (
                        <div
                            className={`alert ${
                                message.type === 'success' ? 'alert-success' : 'alert-danger'
                            }`}
                            role="alert"
                        >
                            {message.text}
                        </div>
                    )}

                        <h2>Add New Product</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="product_name"
                                    placeholder="Product Name"
                                    value={data.product_name}
                                    onChange={e => setData('product_name', e.target.value)}
                                />
                                <label htmlFor="product_name">Product Name</label>
                                {backendErrors.product_name && <div className="text-danger">{backendErrors.product_name}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="product_images">Product Images</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="product_images"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                {imagePreviews.length > 0 && (
                                    <div className="mt-3">
                                        <h4>Image Previews:</h4>
                                        <div className="row">
                                            {imagePreviews.map((preview, index) => (
                                                <div key={index} className="col-3 mb-2">
                                                    <div className="d-flex flex-column align-items-center">
                                                        <img
                                                            src={preview}
                                                            alt={`Preview ${index}`}
                                                            className="img-thumbnail"
                                                            width="150"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger mt-2"
                                                            onClick={() => removeImage(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {backendErrors.product_images && <div className="text-danger">{backendErrors.product_images}</div>}
                            </div>

                            <div className="form-floating mb-3">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="pSimple_description"
                                    placeholder="Simple Description"
                                    value={data.pSimple_description}
                                    onChange={e => setData('pSimple_description', e.target.value)}
                                    rows="3"
                                />
                                <label htmlFor="pSimple_description">Simple Description</label>
                                {backendErrors.pSimple_description && <div className="text-danger">{backendErrors.pSimple_description}</div>}
                            </div>
                            <div className="alert alert-warning">Don't use images for product description!!!</div>
                            <div className="mb-3">
                                <label htmlFor="product_description">Product Description</label>
                                <Editor
                                    apiKey="rnqe0azuy2i2ylck6pmszl7hzzmzm9s2i48akdmmwv1q1ak5"
                                    value={editorContent}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                                            'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                                            'media', 'table', 'emoticons', 'help'
                                        ],
                                        toolbar: 'undo redo | styles | bold italic | forecolor backcolor emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media',
                                    }}
                                    onEditorChange={(content) => setEditorContent(content)}
                                />
                                {backendErrors.product_description && <div className="text-danger">{backendErrors.product_description}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    placeholder="Price"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                />
                                <label htmlFor="price">Price</label>
                                {backendErrors.price && <div className="text-danger">{backendErrors.price}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Catselect">Categories</label>
                                <Select
                                    isMulti
                                    name="Categories"
                                    options={Catoptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    closeMenuOnSelect={false}
                                    id="Catselect"
                                    isSearchable
                                    noOptionsMessage={noOptionsMessage}
                                    onChange={(selected) => setSelectedCategories(selected.map(option => option.value))}
                                />
                            </div>

                            <div className="mb-3 border p-3 rounded">
                                <h4>Variants</h4>
                                <div className="d-flex flex-column gap-3">
                                    {variantList.map((variant, index) => (
                                        <div key={index} className="grid-container border p-3 rounded">
                                            <div className="d-flex flex-wrap gap-2">
                                                <input
                                                    type="text"
                                                    className="form-control w-25"
                                                    placeholder="Variant Name (e.g., Size)"
                                                    value={variant.name}
                                                    onChange={e => updateVariant(index, 'name', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control w-25"
                                                    placeholder="Variant Value (e.g., A, B)"
                                                    value={variant.value}
                                                    onChange={e => updateVariant(index, 'value', e.target.value)}
                                                />
                                                <input
                                                    type="number"
                                                    className="form-control w-25"
                                                    placeholder="Variant Price (e.g., 2950)"
                                                    value={variant.price}
                                                    onChange={e => updateVariant(index, 'price', e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => removeVariant(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary mt-3"
                                    onClick={addVariant}
                                >
                                    Add Variant
                                </button>
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="publish"
                                    checked={data.publish}
                                    onChange={e => setData('publish', e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="publish">
                                    Publish
                                </label>
                                {backendErrors.publish && <div className="text-danger">{backendErrors.publish}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={processing}>Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
