import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExperts } from "../api/expertApi";

function Home() {
  const navigate = useNavigate();

  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);

        const data = await getExperts(
          page,
          search,
          category
        );

        setExperts(data.experts);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
        setError("Failed to load experts");
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, [page, search, category]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Experts</h1>

      <input
        type="text"
        placeholder="Search expert"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          padding: "10px",
          marginRight: "10px"
        }}
      />

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
      >
        <option value="">
          All
        </option>

        <option value="Career">
          Career
        </option>

        <option value="Fitness">
          Fitness
        </option>

        <option value="Technology">
          Technology
        </option>

        <option value="Finance">
          Finance
        </option>
      </select>

      <div>
        {experts.map((expert) => (
          <div
            key={expert._id}
            onClick={() => {
              console.log(
                "Clicked:",
                expert._id
              );

              navigate(
                `/expert/${expert._id}`
              );
            }}
            style={{
              border:
                "1px solid gray",
              padding:
                "15px",
              margin:
                "15px 0",
              cursor:
                "pointer",
              borderRadius:
                "8px"
            }}
          >
            <h2>
              {expert.name}
            </h2>

            <p>
              Category:{" "}
              {
                expert.category
              }
            </p>

            <p>
              Experience:{" "}
              {
                expert.experience
              }{" "}
              years
            </p>

            <p>
              Rating:{" "}
              {
                expert.rating
              }
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px"
        }}
      >
        <button
          disabled={
            page === 1
          }
          onClick={() =>
            setPage(
              page - 1
            )
          }
        >
          Previous
        </button>

        <span
          style={{
            margin:
              "0 15px"
          }}
        >
          Page {page}
        </span>

        <button
          disabled={
            page ===
            totalPages
          }
          onClick={() =>
            setPage(
              page + 1
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;