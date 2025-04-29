'use client';

import { useEffect } from 'react';

/**
 * Custom hook to inject CSS styles into the document head
 * @param {string} styles - CSS styles as a string
 * @param {string} id - Optional unique ID for the style tag
 * @returns {void}
 */
export function useInjectStyles(styles, id = null) {
    useEffect(() => {
        // Create style element
        const styleTag = document.createElement('style');

        // Add ID if provided for better targeting/removal
        if (id) {
            styleTag.id = id;
        }

        // Set the CSS content
        styleTag.innerHTML = styles;

        // Add to document head
        document.head.appendChild(styleTag);

        // Cleanup function to remove the style tag when component unmounts
        return () => {
            // Find and remove by ID if available, otherwise by reference
            if (id) {
                const existingStyle = document.getElementById(id);
                if (existingStyle) {
                    document.head.removeChild(existingStyle);
                }
            } else {
                document.head.removeChild(styleTag);
            }
        };
    }, [styles, id]);
}