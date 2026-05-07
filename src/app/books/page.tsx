export const dynamic = 'force-dynamic';

import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';
import Publication from '@/models/Publication';
import Patent from '@/models/Patent';
import { getDynamicCounts } from '@/lib/getDynamicCounts';
import BooksPageClientWrapper from './BooksPageClientWrapper';

function parseDateForSort(dateStr: string): number {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

async function getData() {
  try {
    await dbConnect();
    const rawBooks = await Book.find({}).lean();
    const books = rawBooks.sort((a: { publishedDate?: string }, b: { publishedDate?: string }) => parseDateForSort(b.publishedDate || '') - parseDateForSort(a.publishedDate || ''));

    const pubs = await Publication.find({}).sort({ createdAt: -1 }).lean();
    const patents = await Patent.find({}).sort({ order: 1, createdAt: -1 }).lean();
    const counts = await getDynamicCounts();

    const journals = pubs
      .filter((p: { type?: string }) => p.type === 'Journal')
      .sort((a: { date?: string }, b: { date?: string }) => parseDateForSort(b.date || '') - parseDateForSort(a.date || ''));

    const conferences = pubs
      .filter((p: { type?: string }) => p.type === 'Article' || !p.type)
      .sort((a: { date?: string }, b: { date?: string }) => parseDateForSort(b.date || '') - parseDateForSort(a.date || ''));

    // We mock the curated "Start Here" list using the most recent combinations
    const startHereData = [
      { title: books[0]?.title || "AI For Enterprise Growth", desc: "A definitive guide to scaling operations using quantum-ready AI frameworks.", type: "Book" },
      { title: journals[0]?.title || "Ethical AI in Modern Governance", desc: "Frameworks for identifying and mitigating bias in civic machine learning systems.", type: "Journal Article" },
      { title: patents[0]?.title || "Intelligent Automation Systems", desc: patents[0]?.description || "A novel approach to automated patent analysis and processing.", type: "Patent" },
      { title: journals[1]?.title || "Predictive Matrices in Electoral AI", desc: "Analysis of quantum-probability impacts on multivariable geopolitical forecasts.", type: "Case Study" },
      { title: conferences[0]?.title || "Transforming Universities with AR", desc: "A practical roadmap for Deans executing spatial computing curricula.", type: "Conference Paper" },
      { title: conferences[1]?.title || "Baggage Flow AI Optimization", desc: "Computer vision application study reducing transport hub friction.", type: "Report" },
    ].filter(i => i.title);

    return {
      books: JSON.parse(JSON.stringify(books)),
      journals: JSON.parse(JSON.stringify(journals)),
      conferences: JSON.parse(JSON.stringify(conferences)),
      patents: JSON.parse(JSON.stringify(patents)),
      startHereData,
      counts
    };
  } catch {
    return { books: [], journals: [], conferences: [], patents: [], startHereData: [], counts: {} };
  }
}

export async function generateMetadata() {
  const counts = await getDynamicCounts();
  return {
    title: 'Books & Publications | Dr. Hemachandran K',
    description: `Authored ${counts.books}+ books and ${counts.articles}+ articles on AI, analytics, and digital transformation.`,
  };
}

export default async function BooksPage() {
  const data = await getData();

  return (
    <BooksPageClientWrapper
      counts={data.counts}
      startHereData={data.startHereData}
      books={data.books}
      journals={data.journals}
      conferences={data.conferences}
      patents={data.patents}
      cases={data.conferences}
    />
  );
}
