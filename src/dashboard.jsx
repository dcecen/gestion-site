import React, { useState, useMemo } from 'react'
import {
  LayoutDashboard, Home, Wallet, Wrench, FileText, MessageSquare, Settings,
  LogOut, Bell, User, Building2, TrendingUp, Euro, Clock, CheckCircle2, AlertCircle,
  Download, MapPin, Phone, Mail, Calendar, Plus, Send, Filter, Search,
  ChevronRight, ChevronDown, ExternalLink, Receipt, Check,
} from './icons'
import { COMPANY_G, PROPERTIES, TRANSACTIONS, INTERVENTIONS, DOCUMENTS, MESSAGES } from './data'

// =============================================================
// HELPERS
// =============================================================
function fmt(n) { return (n ?? 0).toLocaleString('fr-FR') }
function fmtDate(s) { return new Date(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) }
function fmtDateShort(s) { return new Date(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) }

const TXN_STYLE = {
  rent:     { label: 'Loyer',       cls: 'bg-emerald-100 text-emerald-800' },
  expense:  { label: 'Charge',      cls: 'bg-red-100 text-red-800' },
  fees:     { label: 'Honoraires',  cls: 'bg-amber-100 text-amber-800' },
  transfer: { label: 'Virement',    cls: 'bg-ink-100 text-ink-700' },
  event:    { label: 'Événement',   cls: 'bg-sky-100 text-sky-800' },
}

const STATUS_STYLE = {
  'in-progress': { label: 'En cours',  icon: Clock,        cls: 'bg-amber-100 text-amber-800' },
  'done':        { label: 'Terminé',   icon: CheckCircle2, cls: 'bg-emerald-100 text-emerald-800' },
  'planned':     { label: 'Planifié',  icon: Calendar,     cls: 'bg-sky-100 text-sky-800' },
}

function propName(id) {
  if (id === 'all') return 'Tous les biens'
  return PROPERTIES.find(p => p.id === id)?.nickname ?? id
}

// =============================================================
// TOP NAVIGATION
// =============================================================
const NAV_ITEMS = [
  { id: 'dashboard',      label: 'Tableau de bord', Icon: LayoutDashboard },
  { id: 'biens',          label: 'Mes biens',        Icon: Home },
  { id: 'finances',       label: 'Finances',         Icon: Wallet },
  { id: 'interventions',  label: 'Travaux',          Icon: Wrench },
  { id: 'documents',      label: 'Documents',        Icon: FileText },
  { id: 'messages',       label: 'Messages',         Icon: MessageSquare },
]

function TopNav({ page, setPage, user, onLogout, unreadMessages }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-ink-200 sticky top-0 z-30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 40 40" aria-hidden="true">
              <polygon points="2,2 38,2 2,38" fill="#d87a2e" />
              <polygon points="38,2 38,38 2,38" fill="#1f3a5f" />
            </svg>
            <div className="hidden sm:block leading-tight">
              <div className="text-[12px] font-bold tracking-tight text-ink-900" style={{ letterSpacing: '0.06em' }}>RENOV CONSEIL EST</div>
              <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-sand-700">Espace propriétaire</div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setPage(id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-medium transition ${
                  page === id ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                }`}>
                <Icon className="w-4 h-4" />
                {label}
                {id === 'messages' && unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full inline-flex items-center justify-center">
                    {unreadMessages}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-[13px] text-ink-700">
              <div className="w-7 h-7 rounded-full bg-sand-100 text-sand-700 inline-flex items-center justify-center font-semibold text-[11px]">
                {user.initials}
              </div>
              <span className="font-medium hidden md:inline">{user.firstName} {user.lastName}</span>
            </div>
            <button onClick={onLogout} title="Se déconnecter"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md text-ink-500 hover:text-ink-900 hover:bg-ink-50 transition">
              <LogOut className="w-4 h-4" />
            </button>
            <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-md text-ink-500 hover:bg-ink-50 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-ink-100 py-2 pb-3 slide-up">
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => { setPage(id); setMobileOpen(false) }}
                className={`flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-md text-[14px] font-medium transition ${
                  page === id ? 'bg-ink-900 text-white' : 'text-ink-700 hover:bg-ink-50'
                }`}>
                <Icon className="w-4 h-4" />
                {label}
                {id === 'messages' && unreadMessages > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 inline-flex items-center justify-center">{unreadMessages}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

// =============================================================
// STAT CARD
// =============================================================
function StatCard({ label, value, sub, icon: Icon, accent }) {
  return (
    <div className="bg-white border border-ink-200 rounded-xl p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-ink-500">{label}</div>
        {Icon && <div className={`w-9 h-9 rounded-lg inline-flex items-center justify-center ${accent || 'bg-ink-100 text-ink-600'}`}><Icon className="w-4.5 h-4.5" /></div>}
      </div>
      <div className="mt-2 text-[26px] font-semibold tracking-tight text-ink-900 leading-none">{value}</div>
      {sub && <div className="mt-1.5 text-[12px] text-ink-500">{sub}</div>}
    </div>
  )
}

// =============================================================
// PAGE: TABLEAU DE BORD
// =============================================================
function PageDashboard({ setPage }) {
  const occupied = PROPERTIES.filter(p => p.status === 'occupied')
  const vacant = PROPERTIES.filter(p => p.status === 'vacant')
  const monthlyGross = occupied.reduce((sum, p) => sum + p.tenant.rent + p.tenant.charges, 0)
  const activeInterventions = INTERVENTIONS.filter(i => i.status === 'in-progress')
  const recentTxns = TRANSACTIONS.slice(0, 5)

  return (
    <div className="page-enter space-y-8">
      <div>
        <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-ink-500">Vue d'ensemble</div>
        <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-ink-900">Tableau de bord</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Biens en gestion" value={PROPERTIES.length} sub={`${occupied.length} occupés · ${vacant.length} vacant`} icon={Building2} accent="bg-ink-100 text-ink-700" />
        <StatCard label="Loyers mensuels" value={`${fmt(monthlyGross)} €`} sub="charges comprises" icon={Euro} accent="bg-emerald-100 text-emerald-700" />
        <StatCard label="Travaux en cours" value={activeInterventions.length} sub="interventions actives" icon={Wrench} accent="bg-amber-100 text-amber-700" />
        <StatCard label="Taux d'occupation" value="67 %" sub="2/3 biens loués" icon={TrendingUp} accent="bg-sky-100 text-sky-700" />
      </div>

      {/* Vacant alert */}
      {vacant.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-[14px] font-medium text-amber-900">{vacant.length} bien{vacant.length > 1 ? 's' : ''} vacant{vacant.length > 1 ? 's' : ''}</div>
            <div className="text-[13px] text-amber-700 mt-0.5">{vacant.map(p => p.nickname).join(', ')} — recherche locataire en cours.</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent transactions */}
        <div className="bg-white border border-ink-200 rounded-xl shadow-soft overflow-hidden">
          <div className="px-5 py-3.5 border-b border-ink-100 flex items-center justify-between">
            <div className="text-[13px] font-semibold text-ink-900">Dernières opérations</div>
            <button onClick={() => setPage('finances')} className="text-[12px] text-sand-700 hover:text-sand-800 font-medium">Voir tout →</button>
          </div>
          <div className="divide-y divide-ink-100">
            {recentTxns.map(t => {
              const style = TXN_STYLE[t.type] || TXN_STYLE.event
              const positive = t.amount > 0
              return (
                <div key={t.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-ink-900 truncate">{t.label}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${style.cls}`}>{style.label}</span>
                      <span className="text-[11px] text-ink-400 font-mono">{fmtDateShort(t.date)}</span>
                    </div>
                  </div>
                  {t.amount !== 0 && (
                    <div className={`text-[14px] font-semibold shrink-0 ${positive ? 'text-emerald-700' : 'text-red-700'}`}>
                      {positive ? '+' : ''}{fmt(t.amount)} €
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Active interventions */}
        <div className="bg-white border border-ink-200 rounded-xl shadow-soft overflow-hidden">
          <div className="px-5 py-3.5 border-b border-ink-100 flex items-center justify-between">
            <div className="text-[13px] font-semibold text-ink-900">Travaux & interventions</div>
            <button onClick={() => setPage('interventions')} className="text-[12px] text-sand-700 hover:text-sand-800 font-medium">Voir tout →</button>
          </div>
          <div className="divide-y divide-ink-100">
            {INTERVENTIONS.map(iv => {
              const st = STATUS_STYLE[iv.status] || STATUS_STYLE['planned']
              return (
                <div key={iv.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium text-ink-900 truncate">{iv.title}</div>
                      <div className="text-[12px] text-ink-500 mt-0.5">{propName(iv.property)}</div>
                    </div>
                    <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                  </div>
                  {iv.status !== 'done' && (
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[11px] text-ink-500 mb-1">
                        <span>Avancement</span>
                        <span className="font-medium">{iv.progress} %</span>
                      </div>
                      <div className="w-full bg-ink-100 rounded-full h-1.5">
                        <div className="bg-sand-500 h-1.5 rounded-full transition-all" style={{ width: `${iv.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================
// PAGE: MES BIENS
// =============================================================
function PageBiens() {
  const [selected, setSelected] = useState(null)
  const prop = selected ? PROPERTIES.find(p => p.id === selected) : null

  return (
    <div className="page-enter space-y-6">
      <div>
        <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-ink-500">Patrimoine</div>
        <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-ink-900">Mes biens</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PROPERTIES.map(p => {
          const isOcc = p.status === 'occupied'
          return (
            <div key={p.id} onClick={() => setSelected(selected === p.id ? null : p.id)}
              className={`cursor-pointer bg-white border rounded-xl overflow-hidden shadow-soft transition hover:shadow-card hover:-translate-y-0.5 ${selected === p.id ? 'border-sand-500 ring-2 ring-sand-500/20' : 'border-ink-200'}`}>
              <div className="relative aspect-[4/3] placeholder-stripes border-b border-ink-200 flex items-center justify-center">
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-500 text-center px-4">{p.imageLabel}</div>
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${isOcc ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-amber-900'}`}>
                    {isOcc ? 'Occupé' : 'Vacant'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-[16px] font-semibold text-ink-900">{p.nickname}</div>
                <div className="text-[13px] text-ink-500 mt-0.5">{p.type} · {p.surface} m²</div>
                <div className="flex items-start gap-1.5 mt-2 text-[12px] text-ink-500">
                  <MapPin className="w-3.5 h-3.5 text-sand-600 mt-0.5 shrink-0" />
                  <span>{p.address}</span>
                </div>
                {isOcc && (
                  <div className="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between text-[12px]">
                    <span className="text-ink-500">Loyer CC</span>
                    <span className="font-semibold text-ink-900">{fmt(p.tenant.rent + p.tenant.charges)} €/mois</span>
                  </div>
                )}
                {!isOcc && p.targetRent && (
                  <div className="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between text-[12px]">
                    <span className="text-ink-500">Loyer cible</span>
                    <span className="font-semibold text-amber-700">{fmt(p.targetRent)} €/mois</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {prop && (
        <div className="bg-white border border-sand-300 rounded-xl p-6 shadow-card slide-up">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-ink-500">Fiche détaillée</div>
              <h2 className="mt-1 text-[20px] font-semibold tracking-tight text-ink-900">{prop.nickname}</h2>
            </div>
            <button onClick={() => setSelected(null)} className="text-[12px] text-ink-500 hover:text-ink-900 transition">Fermer ×</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-ink-500 mb-3">Informations</div>
              <div className="space-y-2 text-[13px]">
                {[
                  ['Type', prop.type],
                  ['Surface', `${prop.surface} m²`],
                  ['Pièces', `${prop.rooms} (dont ${prop.bedrooms} chambre${prop.bedrooms > 1 ? 's' : ''})`],
                  ['Adresse', prop.address],
                  ['Statut', prop.status === 'occupied' ? 'Occupé' : `Vacant depuis ${fmtDate(prop.vacantSince)}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="text-ink-500 w-28 shrink-0">{k}</span>
                    <span className="font-medium text-ink-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {prop.tenant && (
              <div>
                <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-ink-500 mb-3">Locataire</div>
                <div className="space-y-2 text-[13px]">
                  {[
                    ['Nom', prop.tenant.name],
                    ['Loyer HC', `${fmt(prop.tenant.rent)} €`],
                    ['Charges', `${fmt(prop.tenant.charges)} €`],
                    ['Total CC', `${fmt(prop.tenant.rent + prop.tenant.charges)} €`],
                    ['Dépôt', `${fmt(prop.tenant.depositHeld)} €`],
                    ['Bail jusqu\'au', fmtDate(prop.tenant.contractEnd)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <span className="text-ink-500 w-28 shrink-0">{k}</span>
                      <span className="font-medium text-ink-900">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <a href={`tel:${prop.tenant.phone}`} className="inline-flex items-center gap-1.5 text-[12px] font-medium border border-ink-200 hover:border-ink-400 px-3 py-2 rounded-md text-ink-700 transition">
                    <Phone className="w-3.5 h-3.5" /> Appeler
                  </a>
                  <a href={`mailto:${prop.tenant.email}`} className="inline-flex items-center gap-1.5 text-[12px] font-medium border border-ink-200 hover:border-ink-400 px-3 py-2 rounded-md text-ink-700 transition">
                    <Mail className="w-3.5 h-3.5" /> E-mail
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// =============================================================
// PAGE: FINANCES
// =============================================================
function PageFinances() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.property === filter)
  const totalIn  = filtered.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const totalOut = filtered.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0)

  return (
    <div className="page-enter space-y-6">
      <div>
        <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-ink-500">Comptabilité</div>
        <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-ink-900">Finances</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Encaissements" value={`${fmt(totalIn)} €`} icon={Euro} accent="bg-emerald-100 text-emerald-700" />
        <StatCard label="Décaissements" value={`${fmt(totalOut)} €`} icon={Receipt} accent="bg-red-100 text-red-700" />
        <div className="hidden lg:block">
          <StatCard label="Solde net" value={`${fmt(totalIn - totalOut)} €`} icon={TrendingUp} accent="bg-ink-100 text-ink-700" />
        </div>
      </div>

      <div className="bg-white border border-ink-200 rounded-xl shadow-soft overflow-hidden">
        <div className="px-5 py-3.5 border-b border-ink-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-[13px] font-semibold text-ink-900 flex-1">Historique des opérations</div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-ink-400" />
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="text-[13px] border border-ink-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-ink-700 bg-white">
              <option value="all">Tous les biens</option>
              {PROPERTIES.map(p => <option key={p.id} value={p.id}>{p.nickname}</option>)}
            </select>
          </div>
        </div>
        <div className="divide-y divide-ink-100">
          {filtered.map(t => {
            const style = TXN_STYLE[t.type] || TXN_STYLE.event
            const positive = t.amount > 0
            return (
              <div key={t.id} className="px-5 py-3.5 flex items-center gap-4">
                <div className="font-mono text-[11px] text-ink-400 shrink-0 w-20">{fmtDateShort(t.date)}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-ink-900 truncate">{t.label}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${style.cls}`}>{style.label}</span>
                    <span className="text-[11px] text-ink-400">{propName(t.property)}</span>
                  </div>
                </div>
                {t.amount !== 0 && (
                  <div className={`text-[14px] font-semibold shrink-0 ${positive ? 'text-emerald-700' : 'text-red-700'}`}>
                    {positive ? '+' : ''}{fmt(t.amount)} €
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// =============================================================
// PAGE: INTERVENTIONS
// =============================================================
function PageInterventions() {
  const [open, setOpen] = useState(null)

  return (
    <div className="page-enter space-y-6">
      <div>
        <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-ink-500">Suivi technique</div>
        <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-ink-900">Travaux & interventions</h1>
      </div>

      <div className="space-y-4">
        {INTERVENTIONS.map(iv => {
          const st = STATUS_STYLE[iv.status] || STATUS_STYLE['planned']
          const isOpen = open === iv.id
          return (
            <div key={iv.id} className="bg-white border border-ink-200 rounded-xl shadow-soft overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : iv.id)} className="w-full text-left px-5 py-4 flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-[15px] font-semibold text-ink-900">{iv.title}</div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                  </div>
                  <div className="text-[12px] text-ink-500 mt-0.5">{propName(iv.property)} · {iv.contractor}</div>
                  {iv.status !== 'done' && (
                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="flex-1 bg-ink-100 rounded-full h-1.5 max-w-xs">
                        <div className="bg-sand-500 h-1.5 rounded-full" style={{ width: `${iv.progress}%` }} />
                      </div>
                      <span className="text-[11px] text-ink-500 font-mono">{iv.progress} %</span>
                    </div>
                  )}
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1 text-[12px] text-ink-500">
                  {iv.cost > 0 && <span className="font-semibold text-ink-800">{fmt(iv.cost)} €</span>}
                  <ChevronDown className={`w-4 h-4 text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 border-t border-ink-100 slide-up">
                  <p className="mt-4 text-[13px] text-ink-700 leading-relaxed">{iv.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-[12px]">
                    <div><span className="text-ink-500 block">Début</span><span className="font-medium text-ink-900">{fmtDate(iv.startDate)}</span></div>
                    {iv.expectedEnd && <div><span className="text-ink-500 block">Fin prévue</span><span className="font-medium text-ink-900">{fmtDate(iv.expectedEnd)}</span></div>}
                    {iv.completedDate && <div><span className="text-ink-500 block">Terminé</span><span className="font-medium text-emerald-700">{fmtDate(iv.completedDate)}</span></div>}
                    <div><span className="text-ink-500 block">Coût</span><span className="font-medium text-ink-900">{iv.cost > 0 ? `${fmt(iv.cost)} € TTC` : 'Inclus'}</span></div>
                  </div>
                  {iv.updates.length > 0 && (
                    <div className="mt-5">
                      <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-ink-500 mb-3">Journal de suivi</div>
                      <div className="space-y-2.5">
                        {iv.updates.map((u, i) => (
                          <div key={i} className="flex gap-3 text-[13px]">
                            <span className="font-mono text-ink-400 shrink-0 text-[11px] mt-0.5">{fmtDateShort(u.date)}</span>
                            <span className="text-ink-700">{u.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================
// PAGE: DOCUMENTS
// =============================================================
function PageDocuments() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const filtered = DOCUMENTS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || d.property === filter
    return matchSearch && matchFilter
  })

  function fmtSize(kb) {
    if (kb >= 1024) return `${(kb / 1024).toFixed(1)} Mo`
    return `${kb} Ko`
  }

  const TYPE_ICON = { Quittance: Receipt, Bail: FileText, Facture: Receipt, Devis: FileText, Reporting: TrendingUp, 'État des lieux': Check }

  return (
    <div className="page-enter space-y-6">
      <div>
        <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-ink-500">Bibliothèque</div>
        <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-ink-900">Documents</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input type="text" placeholder="Rechercher un document…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-ink-200 text-[14px] focus:outline-none focus:border-ink-700 focus:ring-2 focus:ring-ink-900/10" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="text-[13px] border border-ink-200 rounded-md px-3 py-2.5 focus:outline-none focus:border-ink-700 bg-white">
          <option value="all">Tous les biens</option>
          {PROPERTIES.map(p => <option key={p.id} value={p.id}>{p.nickname}</option>)}
          <option value="all_props">Tous (général)</option>
        </select>
      </div>

      <div className="bg-white border border-ink-200 rounded-xl shadow-soft overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-[13px] text-ink-500">Aucun document trouvé.</div>
        ) : (
          <div className="divide-y divide-ink-100">
            {filtered.map(d => {
              const Icon = TYPE_ICON[d.type] || FileText
              return (
                <div key={d.id} className="px-5 py-3.5 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-ink-100 text-ink-600 inline-flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-ink-900 truncate">{d.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-ink-400">{d.type}</span>
                      <span className="text-ink-300">·</span>
                      <span className="text-[11px] text-ink-400">{propName(d.property)}</span>
                      <span className="text-ink-300">·</span>
                      <span className="text-[11px] text-ink-400 font-mono">{fmtDate(d.date)}</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-ink-400 shrink-0 hidden sm:block">{fmtSize(d.sizeKb)}</div>
                  <button title="Télécharger"
                    className="shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-md text-ink-400 hover:text-ink-900 hover:bg-ink-50 transition">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================
// PAGE: MESSAGES
// =============================================================
function PageMessages() {
  const [messages, setMessages] = useState(MESSAGES.map(m => ({ ...m })))
  const [draft, setDraft] = useState('')

  function send(e) {
    e.preventDefault()
    if (!draft.trim()) return
    const newMsg = {
      id: `m${Date.now()}`,
      from: 'owner',
      author: 'Marc DUBOIS',
      date: new Date().toISOString().slice(0, 16),
      text: draft.trim(),
    }
    setMessages(prev => [newMsg, ...prev])
    setDraft('')
  }

  function fmtTs(s) {
    const d = new Date(s)
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) + ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="page-enter space-y-6">
      <div>
        <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-ink-500">Communication</div>
        <h1 className="mt-1 text-[26px] font-semibold tracking-tight text-ink-900">Messages</h1>
      </div>

      <div className="bg-white border border-ink-200 rounded-xl shadow-soft overflow-hidden flex flex-col" style={{ minHeight: '480px' }}>
        <div className="px-5 py-3.5 border-b border-ink-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sand-100 text-sand-700 inline-flex items-center justify-center font-semibold text-[12px]">DC</div>
          <div>
            <div className="text-[13px] font-semibold text-ink-900">{COMPANY_G.agent}</div>
            <div className="text-[11px] text-ink-500">{COMPANY_G.name}</div>
          </div>
        </div>

        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {[...messages].reverse().map(m => {
            const isOwner = m.from === 'owner'
            return (
              <div key={m.id} className={`flex ${isOwner ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isOwner ? 'bg-ink-900 text-white rounded-br-sm' : 'bg-ink-50 border border-ink-200 text-ink-900 rounded-bl-sm'}`}>
                  <div className={`text-[14px] leading-relaxed ${isOwner ? 'text-white' : 'text-ink-900'}`}>{m.text}</div>
                  <div className={`text-[10px] mt-1.5 ${isOwner ? 'text-ink-400' : 'text-ink-500'}`}>{fmtTs(m.date)}</div>
                </div>
              </div>
            )
          })}
        </div>

        <form onSubmit={send} className="px-5 py-4 border-t border-ink-100 flex gap-3">
          <input type="text" value={draft} onChange={e => setDraft(e.target.value)}
            placeholder="Écrire un message à votre gestionnaire…"
            className="flex-1 px-4 py-2.5 rounded-md border border-ink-200 text-[14px] focus:outline-none focus:border-ink-700 focus:ring-2 focus:ring-ink-900/10" />
          <button type="submit" disabled={!draft.trim()}
            className="inline-flex items-center gap-1.5 bg-sand-500 hover:bg-sand-600 disabled:opacity-50 text-white font-medium text-[13px] px-4 py-2.5 rounded-md transition">
            <Send className="w-4 h-4" />
            Envoyer
          </button>
        </form>
      </div>

      <div className="bg-white border border-ink-200 rounded-xl p-5 shadow-soft">
        <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-ink-500 mb-3">Contact direct</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
          <a href={`tel:${COMPANY_G.phoneRaw}`} className="flex items-center gap-2.5 px-4 py-3 border border-ink-200 rounded-md hover:border-sand-400 hover:bg-sand-50 transition text-ink-700">
            <Phone className="w-4 h-4 text-sand-600" />{COMPANY_G.phone}
          </a>
          <a href={`mailto:${COMPANY_G.agentEmail}`} className="flex items-center gap-2.5 px-4 py-3 border border-ink-200 rounded-md hover:border-sand-400 hover:bg-sand-50 transition text-ink-700">
            <Mail className="w-4 h-4 text-sand-600" />{COMPANY_G.agentEmail}
          </a>
        </div>
      </div>
    </div>
  )
}

// =============================================================
// DASHBOARD SHELL
// =============================================================
export default function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState('dashboard')
  const unread = MESSAGES.filter(m => m.unread).length

  const pages = {
    dashboard:      <PageDashboard setPage={setPage} />,
    biens:          <PageBiens />,
    finances:       <PageFinances />,
    interventions:  <PageInterventions />,
    documents:      <PageDocuments />,
    messages:       <PageMessages />,
  }

  return (
    <div className="min-h-screen bg-ink-50/50">
      <TopNav page={page} setPage={setPage} user={user} onLogout={onLogout} unreadMessages={unread} />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-10">
        {pages[page] || pages.dashboard}
      </main>
      <footer className="border-t border-ink-200 bg-white mt-12 py-4 px-6 text-center text-[11px] text-ink-400">
        {COMPANY_G.name} · SIRET {COMPANY_G.siret} ·{' '}
        <a href={COMPANY_G.mainSiteUrl} className="hover:text-ink-700 transition inline-flex items-center gap-1">
          Site principal <ExternalLink className="w-3 h-3" />
        </a>{' '}·{' '}
        <a href={COMPANY_G.immobilierUrl} className="hover:text-ink-700 transition inline-flex items-center gap-1">
          Annonces immobilières <ExternalLink className="w-3 h-3" />
        </a>
      </footer>
    </div>
  )
}
