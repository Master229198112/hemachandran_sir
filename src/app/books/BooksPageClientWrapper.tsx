'use client';
import { useState } from 'react';
import { ExternalLink, BookOpen, Quote, FileText, Presentation } from 'lucide-react';
import styles from './books.module.css';

interface StartHereItem {
  title: string;
  desc: string;
  type: string;
}

interface PublicationItem {
  title: string;
  authors?: string;
  publisher?: string;
  publishedDate?: string;
  date?: string;
  link?: string;
  amazonLink?: string;
}

interface BooksWrapperProps {
  counts: Record<string, number>;
  startHereData: StartHereItem[];
  books: PublicationItem[];
  journals: PublicationItem[];
  conferences: PublicationItem[];
  cases: PublicationItem[];
}

export default function BooksPageClientWrapper({
  counts,
  startHereData,
  books,
  journals,
  conferences,
  cases
}: BooksWrapperProps) {
  const [activeTab, setActiveTab] = useState('books');
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setCurrentPage(1);
  };

  const tabs = [
    { id: 'books', label: 'Books', icon: <BookOpen size={16} />, data: books },
    { id: 'journals', label: 'Journal Articles', icon: <FileText size={16} />, data: journals },
    { id: 'conferences', label: 'Conference Papers', icon: <Presentation size={16} />, data: conferences },
    { id: 'cases', label: 'Cases & Reports', icon: <Quote size={16} />, data: cases },
  ];

  const currentData = tabs.find((t) => t.id === activeTab)?.data || [];

  // Pagination logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const displayData = currentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ paddingTop: '80px' }}>
      <header style={{ padding: '20px 0 40px', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(249, 180, 1, 0.05) 0%, transparent 60%)' }}>
        <div className="container max-w-4xl">
          <h1 className="hero-title">Books &amp; <span className="accent-text">Publications</span></h1>
          <p className="hero-desc">
            {counts?.books || '50'}+ books, {counts?.articles || '100'}+ articles and cases on AI, analytics, and digital transformation for leaders, educators and policymakers.
          </p>
        </div>
      </header>

      <section className="section bg-secondary" style={{ paddingTop: '10px' }}>
        <div className="container">
          <h2 className="section-title text-center mb-12">Start <span className="accent-text">Here</span></h2>
          <div className="grid-2">
             {startHereData.map((item, i) => (
                <div key={i} className="card bg-dark flex flex-col justify-between">
                  <div>
                    <h3 className="mb-2 text-xl">{item.title}</h3>
                    <p className="text-sm text-muted mb-4">{item.desc}</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">{item.type}</span>
                </div>
             ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.tabsContainer}>
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`${styles.tabBtn} ${activeTab === t.id ? styles.activeTab : ''}`}
                onClick={() => handleTabChange(t.id)}
              >
                {t.icon} <span style={{ marginLeft: '4px' }}>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="grid-2 mt-8">
            {displayData.map((item: PublicationItem, idx: number) => {
              const hrefLink = item.link || item.amazonLink;
              
              const CardContent = (
                <>
                  <h4 className="text-lg mb-2">{item.title}</h4>
                  {item.authors && <p className="text-sm text-muted mb-2">{item.authors}</p>}
                  {item.publisher && <p className="text-sm text-muted mb-2">{item.publisher} - {item.publishedDate}</p>}
                  {item.date && <p className="text-sm text-muted mb-2">{item.date}</p>}
                  
                  {hrefLink && (
                    <span className="text-accent text-sm font-bold flex gap-1 align-center mt-4 inline-flex">
                      View Publication <ExternalLink size={14} />
                    </span>
                  )}
                </>
              );

              if (hrefLink) {
                return (
                  <a key={idx} href={hrefLink} target="_blank" rel="noreferrer" className="card bg-dark block" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
                    {CardContent}
                  </a>
                );
              }

              return (
                <div key={idx} className="card bg-dark">
                  {CardContent}
                </div>
              );
            })}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center gap-2" style={{ marginTop: '30px', marginBottom: '30px' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '8px 16px', minWidth: '40px', borderRadius: '4px' }}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
             <a href="https://scholar.google.co.in/citations?user=xGa-DEcAAAAJ&hl=en" target="_blank" rel="noreferrer" className="btn btn-outline inline-flex align-center gap-2" style={{ padding: '12px 24px' }}>
                View Full List on Google Scholar <ExternalLink size={18} />
             </a>
          </div>
        </div>
      </section>
    </div>
  );
}
