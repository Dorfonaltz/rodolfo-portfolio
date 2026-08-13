"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiExternalLink,
  FiMail,
  FiVolume2,
  FiVolumeX,
  FiX,
} from "react-icons/fi";
import {
  SiCloudflare,
  SiCss,
  SiDynatrace,
  SiGrafana,
  SiHtml5,
  SiJira,
  SiJavascript,
  SiLinux,
  SiNewrelic,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import {
  TbActivityHeartbeat,
  TbBrandWindows,
  TbChartBar,
  TbCloud,
  TbNetwork,
  TbServer,
  TbSitemap,
  TbTicket,
} from "react-icons/tb";
import GitHubProjects from "./github-projects";

type SectionId =
  | "sobre"
  | "especialidades"
  | "projetos"
  | "experiencia"
  | "formacao"
  | "contato";

type Panel = {
  id: SectionId;
  number: string;
  label: string;
  title: string;
  summary: string;
};

type Technology = {
  label: string;
  icon: IconType;
  color: string;
  secondaryColor?: string;
};

type BrandStyle = CSSProperties & {
  "--brand": string;
  "--brand-secondary": string;
};

const panels: Panel[] = [
  {
    id: "sobre",
    number: "01",
    label: "Sobre mim",
    title: "Visão analítica e execução prática.",
    summary: "Experiência em ambientes críticos, investigação e construção de soluções úteis.",
  },
  {
    id: "especialidades",
    number: "02",
    label: "Especialidades",
    title: "Onde eu gero valor.",
    summary: "Infraestrutura, observabilidade, dados, automação e suporte técnico.",
  },
  {
    id: "projetos",
    number: "03",
    label: "Projetos",
    title: "Ideias que viraram produto.",
    summary: "REPTRIQ, FINTRIQ e novos projetos sincronizados diretamente com o GitHub.",
  },
  {
    id: "experiencia",
    number: "04",
    label: "Experiência",
    title: "Operação, suporte e confiabilidade.",
    summary: "Trajetória em NOC, certificados digitais e processos operacionais.",
  },
  {
    id: "formacao",
    number: "05",
    label: "Formação",
    title: "Aprendizado em movimento.",
    summary: "Análise e Desenvolvimento de Sistemas na Universidade Paulista.",
  },
  {
    id: "contato",
    number: "06",
    label: "Contato",
    title: "Vamos construir algo útil.",
    summary: "Aberto a conexões, oportunidades e projetos em tecnologia.",
  },
];

const expertise: Array<{
  number: string;
  title: string;
  description: string;
  technologies: Technology[];
}> = [
  {
    number: "01",
    title: "Infraestrutura & Cloud",
    description: "Ambientes Windows e Linux, fundamentos de redes, servidores e operação de serviços críticos.",
    technologies: [
      { label: "Windows Server", icon: TbBrandWindows, color: "#0078d4" },
      { label: "Linux", icon: SiLinux, color: "#fcc624" },
      { label: "Redes", icon: TbNetwork, color: "#1ba0d7" },
      { label: "Cloud", icon: TbCloud, color: "#38bdf8" },
    ],
  },
  {
    number: "02",
    title: "Observabilidade",
    description: "Monitoramento contínuo, análise de performance e identificação proativa de falhas.",
    technologies: [
      { label: "Grafana", icon: SiGrafana, color: "#f46800" },
      { label: "Dynatrace", icon: SiDynatrace, color: "#1496ff", secondaryColor: "#73be28" },
      { label: "New Relic", icon: SiNewrelic, color: "#1ce783" },
      { label: "Zabbix", icon: TbActivityHeartbeat, color: "#d40000" },
    ],
  },
  {
    number: "03",
    title: "Back-end & Dados",
    description: "Lógica, automações e análises para transformar dados em decisões práticas.",
    technologies: [
      { label: "Python", icon: SiPython, color: "#3776ab", secondaryColor: "#ffd43b" },
      { label: "PostgreSQL / SQL", icon: SiPostgresql, color: "#4169e1" },
      { label: "Power BI", icon: TbChartBar, color: "#f2c811" },
      { label: "TypeScript", icon: SiTypescript, color: "#3178c6" },
    ],
  },
  {
    number: "04",
    title: "Operações & Suporte",
    description: "Diagnóstico de incidentes, atendimento técnico e colaboração entre equipes.",
    technologies: [
      { label: "Jira", icon: SiJira, color: "#0052cc" },
      { label: "Incidentes", icon: TbTicket, color: "#ff5630" },
      { label: "Servidores", icon: TbServer, color: "#7b61ff" },
      { label: "Processos", icon: TbSitemap, color: "#36b37e" },
    ],
  },
];

const projectStack: Record<string, Technology> = {
  React: { label: "React", icon: SiReact, color: "#61dafb" },
  TypeScript: { label: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  Drizzle: { label: "Banco de dados", icon: SiPostgresql, color: "#4169e1" },
  Cloudflare: { label: "Cloudflare D1", icon: SiCloudflare, color: "#f38020" },
  JavaScript: { label: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  HTML: { label: "HTML5", icon: SiHtml5, color: "#e34f26" },
  CSS: { label: "CSS3", icon: SiCss, color: "#1572b6" },
  Charts: { label: "Chart.js", icon: TbChartBar, color: "#ff6384" },
};

const projects = [
  {
    name: "REPTRIQ",
    eyebrow: "Treino & performance",
    description: "Aplicativo de treino e força com registro de cargas, PRs, volume e sincronização segura entre dispositivos.",
    stack: ["React", "TypeScript", "Drizzle", "Cloudflare"],
    href: "https://github.com/Dorfonaltz/reptriq",
    logo: "/reptriq-logo.png",
  },
  {
    name: "FINTRIQ",
    eyebrow: "Finanças pessoais",
    description: "Aplicativo web para controle financeiro, orçamento por categoria, metas e planejamento de compras.",
    stack: ["JavaScript", "HTML", "CSS", "Charts"],
    href: "https://github.com/Dorfonaltz/meu-livro-de-contas",
    live: "https://dorfonaltz.github.io/meu-livro-de-contas/",
    logo: "/fintriq-logo.svg",
  },
];

const experience = [
  {
    role: "Analista NOC N1",
    company: "CPFL Energia",
    summary: "Monitoramento de infraestrutura e aplicações críticas, análise inicial de redes, servidores e aplicações, gestão de incidentes e cumprimento de SLA.",
    highlight: "+30 incidentes por turno",
  },
  {
    role: "Analista de Certificados Digitais",
    company: "Hall System Soluções Empresariais",
    summary: "Emissão e gestão de certificados ICP-Brasil, validação de identidade e suporte técnico em sistemas, navegadores e dispositivos.",
    highlight: "6 a 15 emissões por dia",
  },
  {
    role: "Assistente Administrativo",
    company: "Fonte Nova",
    summary: "Controle de contratos, documentação e planilhas, conectando organização, comunicação e melhoria de processos.",
    highlight: "Processos operacionais",
  },
];

function TechIcons({ items }: { items: Technology[] }) {
  return (
    <ul className="universe-tech-list">
      {items.map(({ label, icon: Icon, color, secondaryColor }) => (
        <li
          key={label}
          title={label}
          style={{
            "--brand": color,
            "--brand-secondary": secondaryColor ?? color,
          } as BrandStyle}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

function ModalContent({ id }: { id: SectionId }) {
  if (id === "sobre") {
    return (
      <div className="universe-modal-content modal-about">
        <div className="universe-modal-heading">
          <p>Sobre mim</p>
          <h2>Visão analítica, execução prática e aprendizado contínuo.</h2>
        </div>
        <div className="modal-about-grid">
          <div className="modal-long-copy">
            <p>
              Minha experiência passa por monitoramento de ambientes críticos,
              resolução de incidentes e suporte a usuários. No dia a dia,
              aprendi a investigar com calma, priorizar impacto e comunicar com clareza.
            </p>
            <p>
              Também transformo ideias em projetos próprios. É onde conecto
              infraestrutura, desenvolvimento e automação para construir
              ferramentas que resolvem problemas reais.
            </p>
          </div>
          <div className="modal-facts">
            <div><span>Base</span><strong>Campinas · SP</strong></div>
            <div><span>Foco</span><strong>Infra · Cloud · DevOps</strong></div>
            <div><span>Formação</span><strong>ADS · 2026</strong></div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "especialidades") {
    return (
      <div className="universe-modal-content">
        <div className="universe-modal-heading">
          <p>Especialidades</p>
          <h2>Onde eu gero valor.</h2>
        </div>
        <div className="universe-expertise-grid">
          {expertise.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <TechIcons items={item.technologies} />
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (id === "projetos") {
    return (
      <div className="universe-modal-content">
        <div className="universe-modal-heading">
          <p>Projetos</p>
          <h2>Ideias que viraram produto.</h2>
        </div>
        <div className="universe-featured-projects">
          {projects.map((project) => (
            <article key={project.name}>
              <div className="universe-project-logo">
                <img src={project.logo} alt={`Logo do ${project.name}`} />
              </div>
              <div>
                <span>{project.eyebrow}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <TechIcons items={project.stack.map((item) => projectStack[item])} />
                <div className="universe-project-actions">
                  <a href={project.href} target="_blank" rel="noreferrer">
                    <FaGithub aria-hidden="true" /> Código
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <FiExternalLink aria-hidden="true" /> Abrir
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <GitHubProjects />
      </div>
    );
  }

  if (id === "experiencia") {
    return (
      <div className="universe-modal-content">
        <div className="universe-modal-heading">
          <p>Experiência</p>
          <h2>Trajetória profissional.</h2>
        </div>
        <div className="universe-experience-list">
          {experience.map((item, index) => (
            <article key={item.role}>
              <span>0{index + 1}</span>
              <div><h3>{item.role}</h3><p>{item.company}</p></div>
              <p>{item.summary}</p>
              <strong>{item.highlight}</strong>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (id === "formacao") {
    return (
      <div className="universe-modal-content modal-education">
        <div className="universe-modal-heading">
          <p>Formação</p>
          <h2>Análise e Desenvolvimento de Sistemas</h2>
        </div>
        <div className="modal-education-card">
          <span>Universidade Paulista — UNIP</span>
          <strong>2024 — 2026</strong>
          <p>
            Formação direcionada a desenvolvimento, bancos de dados, engenharia
            de software e construção de soluções tecnológicas.
          </p>
          <i>Em andamento</i>
        </div>
      </div>
    );
  }

  return (
    <div className="universe-modal-content modal-contact">
      <div className="universe-modal-heading">
        <p>Contato</p>
        <h2>Vamos construir algo que funcione de verdade.</h2>
      </div>
      <p className="modal-contact-copy">
        Estou aberto a conexões, oportunidades e projetos em infraestrutura,
        cloud, automação, dados e desenvolvimento.
      </p>
      <div className="modal-contact-links">
        <a href="mailto:rodolfovonsoski@gmail.com">
          <FiMail aria-hidden="true" /><span>E-mail</span><strong>rodolfovonsoski@gmail.com</strong>
        </a>
        <a href="https://www.linkedin.com/in/vonsoski/" target="_blank" rel="noreferrer">
          <FaLinkedinIn aria-hidden="true" /><span>LinkedIn</span><strong>/in/vonsoski</strong>
        </a>
        <a href="https://github.com/Dorfonaltz" target="_blank" rel="noreferrer">
          <FaGithub aria-hidden="true" /><span>GitHub</span><strong>/Dorfonaltz</strong>
        </a>
        <a href="/curriculo-rodolfo-vonsoski.pdf" download>
          <FiDownload aria-hidden="true" /><span>Currículo</span><strong>Baixar PDF</strong>
        </a>
      </div>
    </div>
  );
}

export default function PortfolioUniverse() {
  const [active, setActive] = useState<SectionId | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAmbient = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.onended = null;
    audio.pause();
    audio.currentTime = 0;
    audioRef.current = null;
    setAudioEnabled(false);
  }, []);

  const toggleAmbient = useCallback(async () => {
    if (audioRef.current) {
      stopAmbient();
      return;
    }

    const audio = new Audio("/valve-intro.mp3");
    audio.preload = "auto";
    audio.volume = 0.35;
    audio.onended = () => {
      if (audioRef.current !== audio) return;
      audioRef.current = null;
      setAudioEnabled(false);
    };

    audioRef.current = audio;

    try {
      await audio.play();
      setAudioEnabled(true);
    } catch {
      audioRef.current = null;
      setAudioEnabled(false);
    }
  }, [stopAmbient]);

  const closeModal = useCallback(() => {
    setActive(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  }, []);

  const openPanel = (id: SectionId, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setActive(id);
  };

  const movePanel = (direction: -1 | 1) => {
    if (!active) return;
    const current = panels.findIndex((panel) => panel.id === active);
    const next = (current + direction + panels.length) % panels.length;
    setActive(panels[next].id);
  };

  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, closeModal]);

  useEffect(() => () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.onended = null;
    audio.pause();
    audio.currentTime = 0;
    audioRef.current = null;
  }, []);

  const activePanel = active ? panels.find((panel) => panel.id === active) : null;

  return (
    <section className="hl-console" id="top">
      <div className="hl-static" aria-hidden="true" />
      <div className="hl-code" aria-hidden="true">
        0x52 0x56 &nbsp; NOC::CLOUD::DATA &nbsp; SYS/PORTFOLIO<br />
        INCIDENT RESPONSE &nbsp; AUTOMATION &nbsp; OBSERVABILITY<br />
        CPFL // HALL_SYSTEM // FONTE_NOVA // UNIP_2026
      </div>
      <div className="hl-lambda" aria-hidden="true">λ</div>

      <header className="hl-windowbar">
        <span>RV PERSONNEL TERMINAL</span>
        <div>
          <button
            className={`hl-audio-toggle${audioEnabled ? " is-active" : ""}`}
            type="button"
            onClick={() => void toggleAmbient()}
            aria-pressed={audioEnabled}
            aria-label={audioEnabled ? "Desligar som ambiente" : "Ligar som ambiente"}
          >
            {audioEnabled ? <FiVolume2 aria-hidden="true" /> : <FiVolumeX aria-hidden="true" />}
            <span>SOM {audioEnabled ? "ON" : "OFF"}</span>
          </button>
          <div className="hl-window-controls" aria-hidden="true"><i>—</i><b>×</b></div>
        </div>
      </header>

      <div className="hl-brand">
        <p>CLASSIFIED PERSONNEL INTERFACE // CAMPINAS · SP</p>
        <h1>
          <span>R O D O L F O</span>
          <b aria-hidden="true">λ</b>
          <span>V O N S O S K I</span>
        </h1>
        <div>
          <span>NOC OPERATIONS</span>
          <span>INFRASTRUCTURE</span>
          <span>AUTOMATION</span>
        </div>
      </div>

      <div className="hl-menu-shell">
        <div className="hl-introduction">
          <p>SUBJECT // RODOLFO VONSOSKI</p>
          <strong>Tecnologia para manter operações em movimento.</strong>
          <span>
            Profissional de tecnologia com experiência em ambientes críticos,
            suporte NOC e construção de soluções digitais confiáveis.
          </span>
        </div>

        <nav className="hl-menu" aria-label="Arquivos do portfólio">
          {panels.map((panel) => (
            <button
              key={panel.id}
              onClick={(event) => openPanel(panel.id, event.currentTarget)}
              aria-label={`Abrir arquivo ${panel.label}`}
            >
              <span className="hl-menu-name">{panel.label}</span>
              <span className="hl-menu-description">{panel.summary}</span>
            </button>
          ))}
        </nav>
      </div>

      <footer className="hl-statusbar">
        <div className="hl-system-links" aria-label="Links profissionais">
          <a href="https://www.linkedin.com/in/vonsoski/" target="_blank" rel="noreferrer" aria-label="Abrir LinkedIn">
            <FaLinkedinIn aria-hidden="true" /><span>LinkedIn</span>
          </a>
          <a href="https://github.com/Dorfonaltz" target="_blank" rel="noreferrer" aria-label="Abrir GitHub">
            <FaGithub aria-hidden="true" /><span>GitHub</span>
          </a>
          <a href="/curriculo-rodolfo-vonsoski.pdf" download aria-label="Baixar currículo">
            <FiDownload aria-hidden="true" /><span>Currículo</span>
          </a>
        </div>
        <span>30+ INCIDENTS // 05 PLATFORMS // 02 PRODUCTS</span>
        <small>λ/RV · BUILD 2026.08</small>
      </footer>

      {active && activePanel && (
        <div
          className="universe-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="universe-modal-title"
          ref={modalRef}
        >
          <header className="universe-modal-bar">
            <div>
              <span>{activePanel.number} / 06</span>
              <strong id="universe-modal-title">{activePanel.label}</strong>
            </div>
            <button ref={closeRef} onClick={closeModal} aria-label="Fechar seção expandida">
              <FiX aria-hidden="true" />
            </button>
          </header>

          <div className="universe-modal-scroll">
            <ModalContent id={active} />
          </div>

          <footer className="universe-modal-navigation">
            <button onClick={() => movePanel(-1)}>
              <FiChevronLeft aria-hidden="true" /> Anterior
            </button>
            <span>{activePanel.label}</span>
            <button onClick={() => movePanel(1)}>
              Próxima <FiChevronRight aria-hidden="true" />
            </button>
          </footer>
        </div>
      )}
    </section>
  );
}
