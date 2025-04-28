import dbConnect from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export default async function handler(req, res) {
    // Ensure database connection
    await dbConnect();

    try {
        switch (req.method) {
            case 'GET':
                // Fetch the latest 50 transactions sorted by date
                const transactions = await Transaction.find({})
                    .sort({ date: -1 })
                    .limit(50);
                return res.status(200).json(transactions);

            case 'POST':
                // Create a new transaction based on the request body
                const transaction = await Transaction.create(req.body);
                return res.status(201).json(transaction);

            default:
                // Respond with 405 if the method is not GET or POST
                res.setHeader('Allow', ['GET', 'POST']);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        // Log the error and return a 500 status with the error message
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
}
