import { useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { VscRepoForked } from "react-icons/vsc";
import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function RepoDetails({username}) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const token = "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"; // use environment variable for production
  const reposPerPage = 6;

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      if (!username) return;

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const userResponse = await fetch(
          `https://api.github.com/users/${username}`,
          { headers }
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();

        const reposResponse = await fetch(userData.repos_url, { headers });
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
        const reposData = await reposResponse.json();

        const sortedRepos = reposData
          .map((repo) => ({
            name: repo.name,
            description: repo.description || "No description provided.",
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: repo.updated_at,
          }))
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        setRepos(sortedRepos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, [username, token]);

  function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-600 disabled:text-gray-300"
          aria-label="Previous page"
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              currentPage === page
                ? "bg-[#6777EF] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-600 disabled:text-gray-300"
          aria-label="Next page"
        >
          →
        </button>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;

  const totalPages = Math.ceil(repos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const endIndex = startIndex + reposPerPage;
  const currentRepos = repos.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-1xl mx-auto p-5 space-y-6 bg-white rounded-lg shadow-md mt-5">
      <h2 className="text-xl font-bold text-gray-600">Repositories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {currentRepos.map((repo, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-100"
          >
            <div className="text-[#6777EF] text-lg font-semibold cursor-pointer">
              <Link
                to={`https://github.com/${username}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </Link>{" "}
            </div>
            <p className="text-gray-600 text-sm mt-2">{repo.description}</p>

            <p className="text-gray-500 text-sm mt-2">
              <strong>Language:</strong> {repo.language || "Unknown"}
            </p>

            <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
              <p className="flex items-center gap-1">
                <AiOutlineStar size={16} className="text-yellow-500" />{" "}
                {repo.stargazers_count} Stars
              </p>
              <p className="flex items-center gap-1">
                <VscRepoForked size={16} className="text-blue-500" />{" "}
                {repo.forks_count} Forks
              </p>
              <p className="flex items-center gap-1">
                <BiTimeFive size={16} className="text-gray-400" /> Last Updated:{" "}
                {new Date(repo.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
