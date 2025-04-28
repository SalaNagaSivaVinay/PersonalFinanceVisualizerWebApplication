import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Dashboard from "../components/Dashboard";
import BudgetForm from "../components/BudgetForm";
import BudgetOverview from "../components/BudgetOverview";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const currentMonth = new Date()
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  const currentYear = new Date().getFullYear();
  const [editingBudget, setEditingBudget] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const transactionsResponse = await fetch("/api/transactions");
      if (!transactionsResponse.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);

      const budgetsResponse = await fetch(
        `/api/budgets?month=${currentMonth}&year=${currentYear}`
      );
      if (!budgetsResponse.ok) {
        throw new Error("Failed to fetch budgets");
      }
      const budgetsData = await budgetsResponse.json();
      setBudgets(budgetsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      const url = editingTransaction
        ? `/api/transactions/${editingTransaction._id}`
        : "/api/transactions";
      const method = editingTransaction ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save transaction");
      }

      await fetchData();
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error saving transaction:", error);
      setError(error.message);
    }
  };

  const handleBudgetSubmit = async (budgetData) => {
    try {
      const response = await fetch("/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...budgetData,
          month: currentMonth,
          year: currentYear,
        }),
      });

      if (!response.ok) throw new Error("Failed to save budget");

      await fetchData();
    } catch (error) {
      console.error("Error saving budget:", error);
      setError(error.message);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    document
      .getElementById("transaction-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      await fetchData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError(error.message);
    }
  };

  const handleBudgetEdit = async (data) => {
    try {
      const response = await fetch(`/api/budgets/${editingBudget._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          month: currentMonth,
          year: currentYear,
        }),
      });

      if (!response.ok) throw new Error("Failed to update budget");

      await fetchData();
      setEditingBudget(null);
    } catch (error) {
      console.error("Error updating budget:", error);
      setError(error.message);
    }
  };

  const handleBudgetDelete = async (budgetId) => {
    if (!budgetId) {
      throw new Error('Budget ID is required');
    }

    const response = await fetch(`/api/budgets/${budgetId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete budget');
    }

    await fetchData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-pulse">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-pulse">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-lime-200 to-amber-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <div className="flex items-center justify-between mb-14">
          <div>
            <h2 className="text-3xl font-semibold text-gray-700">
              Hello, <span className="text-teal-600">User!</span> 👋
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Welcome back to your Personal Finance Tracker.
            </p>
          </div>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4322/4322991.png"
              alt="Waving Cartoon"
              className="w-20 h-20 rounded-full shadow-lg object-cover bg-white p-2 transform transition-all duration-300 hover:scale-110"
            />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-teal-800 mb-14 text-center tracking-wide animate-fadeIn">
          Personal Finance Tracker
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-12">
            <div className="bg-gradient-to-br from-teal-100 to-teal-300 rounded-2xl shadow-xl p-8 border border-teal-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-teal-700 mb-6 tracking-wider">
                {editingTransaction ? "Edit Transaction" : "Add Transaction"}
              </h2>
              <TransactionForm
                onSubmit={handleSubmit}
                initialData={editingTransaction}
              />
            </div>

            <div className="bg-gradient-to-br from-amber-100 to-amber-300 rounded-2xl shadow-xl p-8 border border-amber-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-amber-700 mb-6 tracking-wider">
                {editingBudget ? "Edit Budget" : "Set Budget"}
              </h2>
              <BudgetForm
                onSubmit={editingBudget ? handleBudgetEdit : handleBudgetSubmit}
                initialData={editingBudget}
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-12">
            <div className="bg-gradient-to-br from-cyan-100 to-blue-300 rounded-2xl shadow-xl p-8 border border-cyan-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-cyan-700 mb-6 tracking-wider text-center">
                Dashboard Overview
              </h2>
              <Dashboard transactions={transactions} />
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-pink-300 rounded-2xl shadow-xl p-8 border border-pink-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-pink-700 mb-6 tracking-wider text-center">
                Budget Overview
              </h2>
              <BudgetOverview
                budgets={budgets}
                transactions={transactions.filter((t) => {
                  const date = new Date(t.date);
                  return (
                    date.toLocaleString("default", { month: "long" }).toLowerCase() === currentMonth &&
                    date.getFullYear() === currentYear
                  );
                })}
                onEdit={setEditingBudget}
                onDelete={handleBudgetDelete}
              />
            </div>

            <div className="bg-gradient-to-r from-purple-100 via-pink-200 to-blue-300 rounded-2xl shadow-xl p-8 border border-indigo-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-purple-700 mb-6 tracking-wide text-center">
                Recent Transactions
              </h2>
              <div className="space-y-4">
                <TransactionList
                  transactions={transactions}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
