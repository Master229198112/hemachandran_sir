import Link from 'next/link';
import { Target, Search, Rocket, ArrowRight, Zap, Building, GraduationCap, Server, ShieldCheck, Scale, Compass, Cpu, Activity, LayoutGrid } from 'lucide-react';
import styles from './page.module.css';
import { getDynamicCounts } from '@/lib/getDynamicCounts';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';
import ScrollingLogos from '@/components/ScrollingLogos';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'AI Consulting & Governance | Dr. Hemachandran K',
  description: 'AI strategy, governance, system implementation, and validation frameworks for enterprises, governments, and universities.',
};

export default async function AIConsultingPage() {
  await getDynamicCounts();
  await dbConnect();
  
  const allPartners = await Partner.find({}).sort({ order: 1, createdAt: -1 }).lean();
  const clients = allPartners.filter((p) => p.type === 'client').map((p) => ({ _id: p._id.toString(), name: p.name, imageUrl: p.imageUrl }));
  const mous = allPartners.filter((p) => p.type === 'mou').map((p) => ({ _id: p._id.toString(), name: p.name, imageUrl: p.imageUrl }));

  return (
    <div className={styles.page}>
      
      {/* Hero Section */}
      <header className={styles.header}>
        <div className="container">
          <h1 className="hero-title">AI Strategy, Governance &amp; <span className="accent-text">System Implementation</span></h1>
          <p className="hero-desc" style={{ maxWidth: '900px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Organizations today are investing heavily in artificial intelligence - often without clear validation, governance, or measurable outcomes. The result is predictable: misaligned systems, hidden bias, underperforming models, and wasted investments.
          </p>
          <p className="hero-desc mt-4" style={{ maxWidth: '900px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--accent)' }}>
            We work with governments, enterprises, universities, and high-growth startups to ensure that AI is not just implemented - but <strong>aligned, validated, and delivering real impact</strong>.
          </p>
        </div>
      </header>

      {/* What We Do Section */}
      <section className="section bg-secondary" style={{ padding: '20px 0' }}>
        <div className="container">
          <h2 className="section-title text-center mb-12">What We <span className="accent-text">Do</span></h2>
          <div className="grid-2">
            
            <div className="card">
              <ShieldCheck size={32} className="text-accent mb-4" />
              <h3 className="mb-3">AI Audit, Validation &amp; Risk Assessment</h3>
              <p className="text-sm text-muted mb-4">Before scaling AI, organizations need clarity. We assess:</p>
              <ul className="bulletList text-sm mb-4">
                <li><ArrowRight size={14} className="text-accent" /> Model performance in real-world conditions</li>
                <li><ArrowRight size={14} className="text-accent" /> Bias, fairness, and ethical risks</li>
                <li><ArrowRight size={14} className="text-accent" /> Data quality and pipeline integrity</li>
                <li><ArrowRight size={14} className="text-accent" /> Regulatory and governance readiness</li>
              </ul>
              <div className="bg-dark p-3 rounded border-l-2 border-accent">
                <span className="text-xs text-accent uppercase font-bold tracking-wider">Outcome</span>
                <p className="text-sm mt-1">A clear understanding of whether your AI systems are reliable, compliant, and fit for scale.</p>
              </div>
            </div>

            <div className="card">
              <Scale size={32} className="text-accent mb-4" />
              <h3 className="mb-3">AI vs. Technology Decision Advisory</h3>
              <p className="text-sm text-muted mb-4">Not every business problem requires AI. We evaluate:</p>
              <ul className="bulletList text-sm mb-4">
                <li><ArrowRight size={14} className="text-accent" /> Where AI creates measurable value</li>
                <li><ArrowRight size={14} className="text-accent" /> Where simpler technologies are more effective</li>
                <li><ArrowRight size={14} className="text-accent" /> Cost vs. impact of AI adoption</li>
                <li><ArrowRight size={14} className="text-accent" /> Strategic alignment with business goals</li>
              </ul>
              <div className="bg-dark p-3 rounded border-l-2 border-accent">
                <span className="text-xs text-accent uppercase font-bold tracking-wider">Outcome</span>
                <p className="text-sm mt-1">Focused technology decisions that improve productivity - not complexity.</p>
              </div>
            </div>

            <div className="card">
              <Compass size={32} className="text-accent mb-4" />
              <h3 className="mb-3">AI Strategy &amp; Execution Roadmap</h3>
              <p className="text-sm text-muted mb-4">Most AI strategies fail at execution. We design:</p>
              <ul className="bulletList text-sm mb-4">
                <li><ArrowRight size={14} className="text-accent" /> 12–36 month AI transformation roadmaps</li>
                <li><ArrowRight size={14} className="text-accent" /> Integration with existing systems and workflows</li>
                <li><ArrowRight size={14} className="text-accent" /> Scalable architecture aligned with business priorities</li>
                <li><ArrowRight size={14} className="text-accent" /> Governance frameworks embedded from day one</li>
              </ul>
              <div className="bg-dark p-3 rounded border-l-2 border-accent">
                <span className="text-xs text-accent uppercase font-bold tracking-wider">Outcome</span>
                <p className="text-sm mt-1">A practical roadmap that moves from concept to deployment.</p>
              </div>
            </div>

            <div className="card">
              <Cpu size={32} className="text-accent mb-4" />
              <h3 className="mb-3">AI System Design &amp; Implementation</h3>
              <p className="text-sm text-muted mb-4">Beyond advisory, we build and deploy AI systems through our research and engineering teams.</p>
              <ul className="bulletList text-sm mb-4">
                <li><ArrowRight size={14} className="text-accent" /> Machine learning and deep learning systems</li>
                <li><ArrowRight size={14} className="text-accent" /> Computer vision and NLP solutions</li>
                <li><ArrowRight size={14} className="text-accent" /> Predictive analytics and decision intelligence</li>
                <li><ArrowRight size={14} className="text-accent" /> Intelligent automation and infrastructure systems</li>
              </ul>
              <div className="bg-dark p-3 rounded border-l-2 border-accent">
                <span className="text-xs text-accent uppercase font-bold tracking-wider">Outcome</span>
                <p className="text-sm mt-1">Production-ready AI systems tailored to your operational needs.</p>
              </div>
            </div>

            <div className="card" style={{ gridColumn: '1 / -1' }}>
              <div className="flex flex-col md:flex-row gap-6 align-center">
                <div style={{ flex: '0 0 80px' }}>
                  <Activity size={48} className="text-accent" />
                </div>
                <div style={{ flex: '1' }}>
                  <h3 className="mb-3">AI Monitoring, Optimization &amp; Lifecycle Management</h3>
                  <p className="text-sm text-muted mb-4">AI systems degrade over time if left unmanaged. We provide:</p>
                  <div className="grid-2 gap-4 text-sm mb-4">
                    <div>
                      <ul className="bulletList">
                        <li><ArrowRight size={14} className="text-accent" /> Continuous performance monitoring</li>
                        <li><ArrowRight size={14} className="text-accent" /> Bias and drift detection</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="bulletList">
                        <li><ArrowRight size={14} className="text-accent" /> Model optimization and retraining</li>
                        <li><ArrowRight size={14} className="text-accent" /> Governance compliance tracking</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-dark p-3 rounded border-l-2 border-accent">
                    <span className="text-xs text-accent uppercase font-bold tracking-wider">Outcome</span>
                    <p className="text-sm mt-1">AI systems that remain accurate, stable, and trustworthy over time.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section" style={{ padding: '40px 0' }}>
        <div className="container">
          <h2 className="section-title text-center mb-12">Industries We <span className="accent-text">Serve</span></h2>
          <div className="grid-2 gap-6">
            <div className="card bg-dark flex gap-4 align-start">
              <Building size={32} className="text-accent shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Governments &amp; Smart Cities</h3>
                <p className="text-muted">AI-driven governance, predictive infrastructure, and policy-aligned systems for large-scale public impact.</p>
              </div>
            </div>
            
            <div className="card bg-dark flex gap-4 align-start">
              <GraduationCap size={32} className="text-accent shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Universities &amp; Education Systems</h3>
                <p className="text-muted">AI research centers, curriculum transformation, and intelligent learning ecosystems.</p>
              </div>
            </div>

            <div className="card bg-dark flex gap-4 align-start">
              <Server size={32} className="text-accent shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Enterprises &amp; Startups</h3>
                <p className="text-muted">End-to-end AI integration - from strategy to product deployment and scaling.</p>
              </div>
            </div>

            <div className="card bg-dark flex gap-4 align-start">
              <Zap size={32} className="text-accent shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Aviation &amp; Mobility</h3>
                <p className="text-muted">Advanced AI systems for passenger flow, operational efficiency, and infrastructure intelligence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach (Process) */}
      <section className="section bg-secondary text-center" style={{ padding: '40px 0' }}>
        <div className="container">
          <h2 className="section-title mb-12">Our <span className="accent-text">Approach</span></h2>
          
          <div className="grid-4 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div className="card bg-dark border border-gray">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(249, 180, 1, 0.1)' }}>
                <Search size={24} className="text-accent" />
              </div>
              <h4 className="mb-2">1. Assessment</h4>
              <p className="text-sm text-muted">Evaluate current systems, data, and organizational readiness.</p>
            </div>
            
            <div className="card bg-dark border border-gray">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(249, 180, 1, 0.1)' }}>
                <Target size={24} className="text-accent" />
              </div>
              <h4 className="mb-2">2. Design</h4>
              <p className="text-sm text-muted">Develop architecture, governance frameworks, and execution plans.</p>
            </div>
            
            <div className="card bg-dark border border-gray">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(249, 180, 1, 0.1)' }}>
                <Rocket size={24} className="text-accent" />
              </div>
              <h4 className="mb-2">3. Build &amp; Deploy</h4>
              <p className="text-sm text-muted">Implement AI systems with engineering oversight and stakeholder alignment.</p>
            </div>

            <div className="card bg-dark border border-gray">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(249, 180, 1, 0.1)' }}>
                <Activity size={24} className="text-accent" />
              </div>
              <h4 className="mb-2">4. Monitor &amp; Improve</h4>
              <p className="text-sm text-muted">Ensure long-term performance, compliance, and scalability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Approach Works & Engagement Models */}
      <section className="section" style={{ padding: '20px 0' }}>
        <div className="container">
          <div className="grid-2 gap-8">
            
            <div className="card" style={{ background: 'linear-gradient(145deg, var(--bg-card), rgba(249, 180, 1, 0.05))' }}>
              <h3 className="mb-6 border-b border-gray pb-4">Why This Approach Works</h3>
              <p className="text-sm mb-4">Most organizations struggle with AI because:</p>
              <ul className="bulletList text-sm mb-6 text-muted">
                <li><span className="text-red-500 mr-2">✕</span> Strategy is disconnected from execution</li>
                <li><span className="text-red-500 mr-2">✕</span> Governance is treated as an afterthought</li>
                <li><span className="text-red-500 mr-2">✕</span> Systems are deployed without validation</li>
              </ul>
              
              <p className="text-sm mb-4 mt-6 pt-6 border-t border-gray">Our approach integrates:</p>
              <ul className="bulletList text-sm mb-6">
                <li><CheckItem /> Technical depth in AI systems</li>
                <li><CheckItem /> Governance and risk management frameworks</li>
                <li><CheckItem /> Real-world deployment experience across sectors</li>
              </ul>
              <p className="text-sm text-accent italic">Supported by global advisory and policy engagement across institutions and AI ecosystems.</p>
            </div>

            <div className="card bg-dark flex flex-col justify-between">
              <div>
                <h3 className="mb-6 border-b border-gray pb-4 flex align-center gap-2"><LayoutGrid size={24} className="text-accent"/> Engagement Models</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3 align-center bg-secondary p-4 rounded border border-gray">
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0"></div>
                    <span className="font-bold">AI Audit &amp; Advisory Engagements</span>
                  </li>
                  <li className="flex gap-3 align-center bg-secondary p-4 rounded border border-gray">
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0"></div>
                    <span className="font-bold">End-to-End AI Transformation Projects</span>
                  </li>
                  <li className="flex gap-3 align-center bg-secondary p-4 rounded border border-gray">
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0"></div>
                    <span className="font-bold">Ongoing AI Monitoring &amp; Governance Retainers</span>
                  </li>
                </ul>
                <p className="text-sm text-muted">Each engagement is customized based on organizational scale, complexity, and risk profile.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Logos Section */}
      {(clients.length > 0 || mous.length > 0) && (
        <section className="section bg-secondary" style={{ padding: '30px 0 20px', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            {clients.length > 0 && <ScrollingLogos title="Trusted Clients" logos={clients} />}
            {mous.length > 0 && <div style={{ marginTop: clients.length > 0 ? '60px' : '0' }}><ScrollingLogos title="MoUs Signed" logos={mous} /></div>}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="section text-center" style={{ padding: '40px 0 100px' }}>
        <div className="container max-w-3xl mx-auto bg-dark p-12 rounded border border-accent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
          <h2 className="mb-6">Ensure your AI investments deliver measurable results - not unintended risks.</h2>
          <p className="text-muted mb-8 text-lg">Request a consultation to evaluate your current systems and define the right path forward.</p>
          <Link href="/contact?interest=consulting" className="btn btn-primary btn-lg">
            Request a Consultation <ArrowRight size={18} className="inline ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// Helper component for checkmarks
function CheckItem() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="inline mr-2" style={{ transform: 'translateY(-1px)' }}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
