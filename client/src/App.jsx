import styles from './index.module.css';
import sqlLogo from './assets/sql-logo.png';
import { useState } from 'react';

function App() {
  const [queryDescription, setQueryDescription] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const generatedQuery = await generateQuery();
    setSqlQuery(generatedQuery);
    setLoading(false);
  };

  const generateQuery = async () => {
    try {
      const response = await fetch("http://localhost:3005/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ queryDescription }),
      });
      if (!response.ok) {
        return "Error: Could not generate query.";
      }
      const data = await response.json();
      if (!data.response) {
        return "No response from backend.";
      }
      return data.response.trim();
    } catch (error) {
      return "Network or server error.";
    }
  };

  return (
    <main className={styles.main}>
      <img src={sqlLogo} alt="" className={styles.icon} />
      <h3>Generate SQL Query</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query-description"
          placeholder="Describe your Query"
          value={queryDescription}
          onChange={(e) => setQueryDescription(e.target.value)}
        />
        <input
          type="submit"
          value={loading ? "Generating..." : "Generate Query"}
          disabled={loading}
        />
        <pre>{sqlQuery}</pre>
      </form>
    </main>
  );
}

export default App;
