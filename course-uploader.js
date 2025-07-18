// This script will handle the automatic uploading of courses to Firebase.
// It will be triggered by a button in the admin interface.

import { db } from './firebase-config.js';
import { ref, push, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

/**
 * Uploads courses from a JSON object to Firebase.
 * @param {Array<object>} coursesData The course data to upload.
 */
export async function uploadCourses(coursesData) {
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
}
