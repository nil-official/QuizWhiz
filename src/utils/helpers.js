/**
 * Format time in milliseconds to MM:SS format
 * @param {number} timeInMs 
 * @returns {string} formatted time
 */
export const formatTime = (timeInMs) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Validates the JSON structure for quiz questions with object-based options
 * @param {Object} data - The parsed JSON data
 * @returns {boolean} - Whether the data is valid
 */
export const validateQuizData = (data) => {
    if (!Array.isArray(data)) {
        return false;
    }

    for (const question of data) {
        // Check if each question has the required properties
        if (!question.question || !question.options || !question.answer) {
            return false;
        }

        // Check if options is an object
        if (typeof question.options !== 'object' || Array.isArray(question.options)) {
            return false;
        }

        // Check if options object is not empty
        if (Object.keys(question.options).length < 2) {
            return false;
        }

        // Check if answer key exists in options
        if (!Object.keys(question.options).includes(question.answer)) {
            return false;
        }
    }

    return true;
};

/**
 * Get the option keys from options object
 * @param {object} options 
 * @returns {array} array of option keys
 */
export const getOptionKeys = (options) => {
    return Object.keys(options);
};

/**
 * Get the option value by key
 * @param {object} options 
 * @param {string} key 
 * @returns {string} option value
 */
export const getOptionValue = (options, key) => {
    return options[key];
};