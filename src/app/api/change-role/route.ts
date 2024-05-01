// Import necessary modules from Next.js
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/connectPrisma';

// Define the PUT handler as a named export
export const PUT = async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        // Update all users to have the 'ADMIN' role
        const updateResponse = await prisma.users.updateMany({
            data: {
                role: 'ADMIN'
            }
        });

        // Send a JSON response indicating the number of users updated
        res.status(200).json({
            message: `${updateResponse.count} users have been updated to ADMIN role.`
        });
    } catch (error) {
        // Handle potential errors during database operations
        console.error('Failed to update users:', error);
        res.status(500).json({
            error: 'An error occurred while updating user roles.'
        });
    }
}

