"use client";

import { useState, useEffect } from "react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  ssn: string | null;
  ssn_date: string | null;
  page_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  submitted_at: string;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (data.ok) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setPasswordError("סיסמה שגויה");
      }
    } catch (err) {
      setPasswordError("שגיאה בבדיקת הסיסמה");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/leads");
      const data = await response.json();
      if (data.ok) {
        setLeads(data.leads);
      } else {
        setError("שגיאה בטעינת הלידים");
      }
    } catch (err) {
      setError("שגיאה בתקשורת עם השרת");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setLeads([]);
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("אין לידים לייצוא");
      return;
    }

    const headers = [
      "שם",
      "טלפון",
      "תעודת זהות",
      "תאריך הנפקה",
      "דף",
      "מקור",
      "בינוני",
      "קמפיין",
      "תאריך שליחה",
    ];

    const rows = leads.map((lead) => [
      lead.name,
      lead.phone,
      lead.ssn || "",
      lead.ssn_date || "",
      lead.page_url || "",
      lead.utm_source || "",
      lead.utm_medium || "",
      lead.utm_campaign || "",
      new Date(lead.submitted_at).toLocaleString("he-IL"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => {
            const str = String(cell);
            return str.includes(",") || str.includes('"') || str.includes("\n")
              ? `"${str.replace(/"/g, '""')}"`
              : str;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `leads-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-[#0072A8] to-[#005A88] flex items-center justify-center px-4"
        dir="rtl"
      >
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-[#0072A8] mb-8">
            פאנל ניהול
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                סיסמה
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0072A8]"
                placeholder="הזן סיסמה"
              />
            </div>

            {passwordError && (
              <div className="text-red-600 text-sm font-medium">{passwordError}</div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0072A8] text-white font-bold py-2 rounded-lg hover:bg-[#005A88] transition"
            >
              כניסה
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-4 md:p-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-[#0072A8]">ניהול לידים</h1>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleExportCSV}
              disabled={loading || leads.length === 0}
              className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
            >
              הורד דוח אקסל (CSV)
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition"
            >
              התנתקות
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0072A8]"></div>
            <p className="text-gray-600 mt-4">טוען לידים...</p>
          </div>
        )}

        {/* Table */}
        {!loading && leads.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0072A8] text-white">
                    <th className="px-4 py-3 text-right font-bold">שם</th>
                    <th className="px-4 py-3 text-right font-bold">טלפון</th>
                    <th className="px-4 py-3 text-right font-bold">תעודת זהות</th>
                    <th className="px-4 py-3 text-right font-bold">הנפקה</th>
                    <th className="px-4 py-3 text-right font-bold">דף</th>
                    <th className="px-4 py-3 text-right font-bold">תאריך שליחה</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-700">{lead.phone}</td>
                      <td className="px-4 py-3 text-gray-700">{lead.ssn || "-"}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {lead.ssn_date
                          ? new Date(lead.ssn_date).toLocaleDateString("he-IL")
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-700 text-sm truncate max-w-xs">
                        {lead.page_url || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {new Date(lead.submitted_at).toLocaleString("he-IL")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && leads.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">אין לידים עדיין</p>
          </div>
        )}

        {/* Stats */}
        {!loading && leads.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-lg font-semibold text-[#0072A8]">
              סה"כ לידים: {leads.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
