# Personal Finance Visualizer Web Application

A modern web application to visualize and track personal finances. Built with Next.js, MongoDB, and Tailwind CSS.

## Features

- 💰 Track income and expenses.
- 📊 Visual representation of financial data with charts.
- 📱 Responsive design that works seamlessly on all devices.
- 🗃️ Organize transactions by category.
- 📈 View monthly financial overviews.
- 🔍 Search and filter transaction history.
- 💾 Persistent data storage with MongoDB.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for production.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for custom styles.
  - [Recharts](https://recharts.org/) - Composable charting library for data visualization.

- **Backend:**
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing transaction data.
  - [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.

- **Deployment:**
  - [Vercel](https://vercel.com/) - Frontend deployment platform.
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Managed cloud database service.

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/SalaNagaSivaVinay/PersonalFinanceVisualizerWebApplication.git
    cd PersonalFinanceVisualizerWebApplication
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Environment Variables

- `MONGODB_URI`: Your MongoDB connection string (you can use MongoDB Atlas or a local MongoDB instance).

## Project Structure

Personal-Finance-Visualizer-Web-Application/ ├── components/ # React components │ ├── Dashboard.js # Dashboard with financial charts │ ├── TransactionForm.js # Form for adding/editing transactions │ └── TransactionList.js # List of transactions ├── lib/ │ └── mongodb.js # MongoDB connection utility ├── models/ │ └── Transaction.js # Mongoose model for transactions ├── pages/ │ ├── api/ # API routes for transactions │ │ └── transactions/ │ │ ├── index.js │ │ └── [id].js │ ├── _app.js │ └── index.js # Main page for dashboard ├── public/ # Static files (images, etc.) └── styles/ # Global styles (tailwind setup)



## API Routes

### Transactions

- `GET /api/transactions` - Get all transactions.
- `POST /api/transactions` - Create a new transaction.
- `PUT /api/transactions/:id` - Update an existing transaction.
- `DELETE /api/transactions/:id` - Delete a transaction.

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub.
2. Import your repository to Vercel.
3. Add your environment variables to Vercel.
4. Deploy!

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.


## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Author

**Sala Naga Siva Vinay**
- GitHub: [@SalaNagaSivaVinay](https://github.com/SalaNagaSivaVinay)
