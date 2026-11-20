import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Card3D } from '../components/3d/Card3D';
import {
  ShieldCheck,
  Award,
  Target,
  BookOpen,
  Compass,
  CheckCircle,
  Building2,
  Calendar,
  Globe,
  MapPin,
  Phone,
  Mail,
  Users,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-xs font-bold text-red-600 dark:text-red-400">
          <ShieldCheck className="w-4 h-4 text-red-500" />
          <span>B.V.V. Sangha's Heritage • Established 1963</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Basaveshwar Engineering College (Autonomous), Bagalkote
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
          A premier Government-Aided Autonomous institution permanently affiliated to Visvesvaraya Technological
          University (VTU), Belagavi, approved by AICTE, New Delhi, and accredited by NAAC with 'A' Grade (2024 to 2029).
        </p>

        {/* Counseling & Accreditation Badges */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          <Badge variant="primary" size="md">CET Code: E031 (Aided) / E049 (Unaided)</Badge>
          <Badge variant="blue" size="md">COMEDK: E024</Badge>
          <Badge variant="green" size="md">NAAC 'A' Grade (2024–2029)</Badge>
          <Badge variant="neutral" size="md">World Bank TEQIP-I, II & III</Badge>
        </div>
      </div>

      {/* Featured Campus Hero Photo */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[480px] sm:h-[540px] w-full border border-slate-200 dark:border-zinc-800">
        <img
          src="/college-campus.jpg"
          alt="Basaveshwar Engineering College Administrative Quadrangle"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6 sm:p-10">
          <div className="text-white space-y-2 max-w-3xl">
            <span className="px-3.5 py-1 rounded-full bg-red-600 text-xs font-bold uppercase shadow-3d-red inline-block">
              S. Nijalingappa Vidyanagar, Bagalkote
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              A 93-Acre Lush Green Campus of Academic Eminence
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Serving the nation for over six decades with cutting-edge laboratories, world-class faculty,
              and premier placement ecosystems.
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card3D glowColor="red" intensity={10}>
          <div className="p-6 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 flex items-center justify-center mx-auto mb-3 font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">1963</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold mt-1">Year of Establishment</p>
          </div>
        </Card3D>

        <Card3D glowColor="blue" intensity={10}>
          <div className="p-6 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-900/60 flex items-center justify-center mx-auto mb-3 font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">93 Acres</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold mt-1">Lush Green Campus</p>
          </div>
        </Card3D>

        <Card3D glowColor="green" intensity={10}>
          <div className="p-6 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-center mx-auto mb-3 font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">NAAC 'A'</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold mt-1">Grade (2024–2029)</p>
          </div>
        </Card3D>

        <Card3D glowColor="red" intensity={10}>
          <div className="p-6 text-center bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 flex items-center justify-center mx-auto mb-3 font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">TEQIP</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold mt-1">World Bank Funded</p>
          </div>
        </Card3D>
      </div>

      {/* About B.V.V. Sangha & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <Card3D glowColor="none" intensity={6}>
          <div className="p-8 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full space-y-4">
            <Badge variant="primary">Parent Organization</Badge>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Shri B.V.V. Sangha, Bagalkote
            </h3>
            <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-sm">
              Basaveshwar Veerashaiva Vidyavardhaka Sangha (B.V.V. Sangha) was established in 1906 by His Holiness
              Shri Gurubasava Mahaswamiji of Bilur. Over more than a century of selfless public service, the Sangha
              has grown into one of North Karnataka's most distinguished educational conglomerates, managing over
              150 educational institutions ranging from primary schools to post-graduate research colleges and medical institutes.
            </p>
            <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-sm">
              Under the visionary leadership of Chairman & President Shri Veeranna Charantimath, the Sangha continues
              its noble commitment to make high-quality professional education accessible to all students across the country.
            </p>
          </div>
        </Card3D>

        <Card3D glowColor="blue" intensity={6}>
          <div className="p-8 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full space-y-4">
            <Badge variant="blue">Autonomous Pedagogy</Badge>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Autonomy & TEQIP Excellence
            </h3>
            <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-sm">
              Basaveshwar Engineering College was conferred Autonomous status by UGC and VTU in 2007. Autonomy empowers
              BEC to craft flexible, industry-relevant curricula, introduce modern electives like AI/ML, Cyber Security,
              VLSI, and Cloud Computing, and conduct continuous transparent evaluations.
            </p>
            <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-sm">
              BEC is among the select institutions chosen by the Government of India and the World Bank for support
              under Technical Education Quality Improvement Programme (TEQIP Phase I, Phase II, and Phase III),
              pumping substantial grants into state-of-the-art lab equipment, faculty research, and international symposiums.
            </p>
          </div>
        </Card3D>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card3D glowColor="red" intensity={8}>
          <div className="p-8 space-y-4 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-slate-600 dark:text-zinc-300 leading-relaxed">
              To be a premier technical institution of global repute, recognized for imparting quality engineering education,
              fostering scientific inquiry, nurturing ethical values, and empowering graduates to excel in global engineering practice.
            </p>
          </div>
        </Card3D>

        <Card3D glowColor="green" intensity={8}>
          <div className="p-8 space-y-4 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 h-full">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <ul className="space-y-3 text-slate-600 dark:text-zinc-300 text-sm">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Deliver student-centric, outcome-based engineering education with modern digital pedagogies.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Establish advanced R&D centers, incubation clusters (BEC-STEP), and strong industry collaborations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Inculcate professional ethics, leadership qualities, entrepreneurial spirit, and social responsibility.</span>
              </li>
            </ul>
          </div>
        </Card3D>
      </div>

      {/* Official Contact & Helplines from becbgk.edu */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Official Institutional Helplines & Location
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Postal Address</h4>
              <p className="text-slate-600 dark:text-zinc-400 text-xs mt-1">
                Basaveshwar Engineering College, S. Nijalingappa Vidyanagar, Bagalkote - 587 102, Karnataka, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Telephones</h4>
              <p className="text-slate-600 dark:text-zinc-400 text-xs mt-1">
                +91-76187-81963<br />
                08354-234060 / 234204
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Email Addresses</h4>
              <p className="text-slate-600 dark:text-zinc-400 text-xs mt-1">
                becprincipal@yahoo.com<br />
                principal@becbgk.edu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
