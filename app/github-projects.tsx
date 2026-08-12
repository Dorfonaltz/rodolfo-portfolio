"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink, FiGitBranch, FiStar } from "react-icons/fi";

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
};

const GITHUB_USER = "Dorfonaltz";
const FEATURED_REPOS = new Set(["reptriq", "meu-livro-de-contas", "Dorfonaltz", ".github"]);

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  HTML: "#e34f26",
  CSS: "#1572b6",
  Shell: "#89e051",
  Java: "#ed8b00",
  PHP: "#777bb4",
  C: "#a8b9cc",
  "C++": "#00599c",
};

function prepareRepos(repos: GitHubRepo[]) {
  return repos.filter(
    (repo) =>
      !repo.fork &&
      !repo.archived &&
      !repo.disabled &&
      !FEATURED_REPOS.has(repo.name),
  );
}

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?type=owner&sort=updated&direction=desc&per_page=100`,
      { headers: { Accept: "application/vnd.github+json" } },
    )
      .then((response) => {
        if (!response.ok) throw new Error("GitHub indisponível");
        return response.json() as Promise<GitHubRepo[]>;
      })
      .then((data) => {
        if (!active) return;
        setRepos(prepareRepos(data));
        setFailed(false);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="github-projects">
      <div className="github-projects-head">
        <div>
          <p className="github-projects-kicker">
            <FaGithub aria-hidden="true" /> Sincronizado com GitHub
          </p>
          <h3>Outros projetos</h3>
        </div>
        <span className="sync-status"><i /> Atualização automática</span>
      </div>

      {repos === null ? (
        <div className="compact-project-grid" aria-label="Carregando projetos do GitHub">
          {[0, 1, 2].map((item) => <div className="compact-project-card project-skeleton" key={item} />)}
        </div>
      ) : repos.length > 0 ? (
        <div className="compact-project-grid" aria-live="polite">
          {repos.map((repo) => {
            const languageColor = languageColors[repo.language ?? ""] ?? "#a78bfa";

            return (
              <article className="compact-project-card" key={repo.id}>
                <div className="compact-project-top">
                  <FiGitBranch aria-hidden="true" />
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Abrir ${repo.name} no GitHub`}
                  >
                    <FiExternalLink aria-hidden="true" />
                  </a>
                </div>
                <h4>{repo.name.replaceAll("-", " ")}</h4>
                <p>{repo.description || "Projeto público disponível no GitHub."}</p>
                <div className="compact-project-meta">
                  {repo.language && (
                    <span>
                      <i style={{ "--language-color": languageColor } as CSSProperties} />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span><FiStar aria-hidden="true" /> {repo.stargazers_count}</span>
                  )}
                  <time dateTime={repo.updated_at}>Atualizado {formatUpdatedAt(repo.updated_at)}</time>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="github-projects-empty">
          {failed
            ? "Não foi possível consultar o GitHub agora."
            : "Os próximos repositórios públicos aparecerão aqui automaticamente."}
          {" "}
          <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noreferrer">
            Ver GitHub
          </a>
        </p>
      )}
    </div>
  );
}
