// This script will handle the automatic uploading of courses to Firebase.
// It will be triggered by a button in the admin interface.

import { db } from './firebase-config.js';
import { ref, push, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

/**
 * Fetches the course data from the JSON file.
 * @returns {Promise<Array<object>>} A promise that resolves with the course data.
 */
async function getCoursesData() {
    const response = await fetch('courses.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

/**
 * Uploads courses from a JSON object to Firebase.
 */
export async function uploadCourses() {
    try {
        const coursesData = await getCoursesData();
        const coursesRef = ref(db, 'courses');

        for (const program of coursesData) {
            const newCourseRef = push(coursesRef);
            try {
                await set(newCourseRef, program);
                console.log(`Successfully uploaded program: ${program.title}`);
                alert(`Successfully uploaded program: ${program.title}`);
            } catch (error) {
                console.error(`Error uploading program ${program.title}:`, error);
                alert(`Error uploading program ${program.title}: ${error.message}`);
            }
        }
    } catch (error) {
        console.error('Error fetching or uploading courses:', error);
        alert(`Error fetching or uploading courses: ${error.message}`);
    }
}
