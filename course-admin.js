import { uploadCourses } from './course-uploader.js';

document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('upload-json-btn');
    const fileInput = document.getElementById('json-file-input');

    if (uploadButton) {
        uploadButton.addEventListener('click', async () => {
            if (fileInput.files.length === 0) {
                alert('Please select a JSON file to upload.');
                return;
            }

            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = async (event) => {
                try {
                    const coursesData = JSON.parse(event.target.result);
                    await uploadCourses(coursesData);
                } catch (error) {
                    console.error('Error parsing or uploading file:', error);
                    alert(`Error parsing or uploading file: ${error.message}`);
                }
            };

            reader.readAsText(file);
        });
    }
});
