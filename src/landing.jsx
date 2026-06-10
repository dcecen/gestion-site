import React, { useState } from 'react'
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, Phone, Mail, ExternalLink } from './icons'
import { COMPANY_G, DEMO_USER } from './data'

export default function Landing({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function fillDemo(e) {
    e.preventDefault()
    setEmail(DEMO_USER.email)
    setPassword(DEMO_USER.password)
    setError('')
  }

  function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (
        email.trim().toLowerCase() === DEMO_USER.email &&
        password === DEMO_USER.password
      ) {
        onLogin(DEMO_USER)
      } else {
        setError('Identifiants incorrects. Utilisez les codes de démonstration.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-ink-950">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] shrink-0 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'repeating-linear-gradient(135deg, #ffffff 0 1px, transparent 1px 18px)' }} />

        <div className="relative">
          <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
              <polygon points="2,2 38,2 2,38" fill="#d87a2e" />
              <polygon points="38,2 38,38 2,38" fill="#ffffff" />
            </svg>
            <div className="leading-tight">
              <div className="text-[13px] font-bold tracking-tight text-white" style={{ letterSpacing: '0.06em' }}>RENOV CONSEIL EST</div>
              <div className="mt-0.5 font-mono text-[10px] tracking-[0.22em] uppercase text-sand-400">Espace propriétaire</div>
            </div>
          </div>

          <div className="mt-16">
            <div className="text-[11px] font-mono tracking-[0.22em] uppercase text-sand-400">Portail de gestion locative</div>
            <h1 className="mt-4 text-[38px] xl:text-[44px] font-semibold tracking-tight text-white leading-[1.1]" style={{ textWrap: 'balance' }}>
              Votre patrimoine, suivi en temps réel.
            </h1>
            <p className="mt-5 text-[15px] text-ink-300 max-w-xs leading-relaxed">
              Consultez vos loyers, suivez les interventions et échangez avec votre gestionnaire depuis un seul espace sécurisé.
            </p>
          </div>

          <div className="mt-14 space-y-4">
            {[
              { icon: ShieldCheck, title: 'Accès sécurisé', text: 'Vos données sont privées et chiffrées.' },
              { icon: Sparkles, title: 'Tableau de bord complet', text: 'Biens, loyers, interventions, documents.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sand-500/15 text-sand-400 inline-flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[14px] font-medium text-white">{title}</div>
                  <div className="text-[13px] text-ink-400">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-[12px] text-ink-500 space-y-1">
          <div>{COMPANY_G.address}</div>
          <div className="flex items-center gap-4">
            <a href={`tel:${COMPANY_G.phoneRaw}`} className="hover:text-ink-300 transition">{COMPANY_G.phone}</a>
            <a href={COMPANY_G.mainSiteUrl} className="hover:text-ink-300 transition inline-flex items-center gap-1">
              Site principal <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
              <polygon points="2,2 38,2 2,38" fill="#d87a2e" />
              <polygon points="38,2 38,38 2,38" fill="#ffffff" />
            </svg>
            <div className="leading-tight">
              <div className="text-[12px] font-bold tracking-tight text-white" style={{ letterSpacing: '0.06em' }}>RENOV CONSEIL EST</div>
              <div className="mt-0.5 font-mono text-[10px] tracking-[0.18em] uppercase text-sand-400">Espace propriétaire</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h2 className="text-[22px] font-semibold tracking-tight text-ink-900">Connexion</h2>
            <p className="mt-1 text-[14px] text-ink-500">Accédez à votre espace de gestion locative.</p>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-ink-700 mb-1.5">Adresse e-mail</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="email" required autoFocus value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="vous@exemple.fr"
                    className="w-full pl-9 pr-3 py-2.5 rounded-md border border-ink-200 text-[14px] text-ink-900 focus:outline-none focus:border-ink-900 focus:ring-2 focus:ring-ink-900/10 transition" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-ink-700 mb-1.5">Mot de passe</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type={showPw ? 'text' : 'password'} required value={password} onChange={e => { setPassword(e.target.value); setError('') }}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-md border border-ink-200 text-[14px] text-ink-900 focus:outline-none focus:border-ink-900 focus:ring-2 focus:ring-ink-900/10 transition" />
                  <button type="button" onClick={() => setShowPw(s => !s)} aria-label={showPw ? 'Masquer' : 'Afficher'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2.5">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-ink-900 hover:bg-ink-800 disabled:opacity-60 text-white font-medium text-[14px] px-4 py-3 rounded-md transition">
                {loading ? 'Connexion…' : <>Se connecter <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-ink-100">
              <div className="text-[12px] text-ink-500 mb-3 text-center">Accès de démonstration</div>
              <button onClick={fillDemo}
                className="w-full py-2.5 px-4 rounded-md border border-ink-200 hover:border-sand-400 hover:bg-sand-50 text-[13px] text-ink-700 font-medium transition flex items-center justify-between">
                <span>Remplir les identifiants démo</span>
                <span className="font-mono text-[11px] text-ink-400">{DEMO_USER.email}</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-[12px] text-ink-500">
            Vous n'avez pas d'accès ?{' '}
            <a href={`mailto:${COMPANY_G.email}`} className="text-sand-400 hover:text-sand-300 transition">
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
