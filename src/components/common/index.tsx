import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

// ============================================================
// SHARED COMMON COMPONENTS
// MetricCard, StatusBadge, PerformanceBar, TrendChip,
// EmptyState, LoadingState, ErrorState, AccessDenied, Breadcrumbs
// ============================================================

// -- MetricCard -----------------------------------------------
interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  iconBg?: string;
  iconColor?: string;
  context?: string;
  onClick?: () => void;
}

export function MetricCard({ label, value, change, changeLabel, icon, iconBg = '#EFF6FF', iconColor = 'var(--color-blue)', context, onClick }: MetricCardProps) {
  const changeDir = change !== undefined ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : undefined;
  return (
    <div className="metric-card" onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {icon && (
        <div className="metric-card-icon" style={{ background: iconBg }}>
          <span style={{ color: iconColor }}>{icon}</span>
        </div>
      )}
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {change !== undefined && (
        <div className={`metric-change ${changeDir}`}>
          {changeDir === 'up' ? <TrendingUp size={14} /> : changeDir === 'down' ? <TrendingDown size={14} /> : <Minus size={14} />}
          <span>{change > 0 ? '+' : ''}{change.toFixed(1)} pp</span>
          {changeLabel && <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>{changeLabel}</span>}
        </div>
      )}
      {context && <div className="metric-context">{context}</div>}
    </div>
  );
}

// -- PerformanceBar --------------------------------------------
interface PerformanceBarProps {
  value: number;
  showLabel?: boolean;
  height?: number;
}

function getPerfLevel(v: number): 'strong' | 'good' | 'moderate' | 'low' {
  if (v >= 70) return 'strong';
  if (v >= 55) return 'good';
  if (v >= 40) return 'moderate';
  return 'low';
}

export function PerformanceBar({ value, showLabel = true, height = 6 }: PerformanceBarProps) {
  const level = getPerfLevel(value);
  return (
    <div className="perf-bar-container">
      <div className="perf-bar" style={{ height }}>
        <div className={`perf-bar-fill ${level}`} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
      {showLabel && <span className={`perf-percentage ${level}`}>{value.toFixed(0)}%</span>}
    </div>
  );
}

// -- TrendChip -------------------------------------------------
interface TrendChipProps {
  trend: 'improving' | 'declining' | 'stable';
  compact?: boolean;
}

export function TrendChip({ trend, compact }: TrendChipProps) {
  const labels = { improving: '↑ Improving', declining: '↓ Declining', stable: '→ Stable' };
  const compactLabels = { improving: '↑', declining: '↓', stable: '→' };
  return <span className={`trend-chip ${trend}`}>{compact ? compactLabels[trend] : labels[trend]}</span>;
}

// -- StatusBadge -----------------------------------------------
const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  active:           { label: 'Active',           className: 'badge-success' },
  inactive:         { label: 'Inactive',         className: 'badge-muted' },
  transfer_pending: { label: 'Transfer Pending', className: 'badge-warning' },
  transferred:      { label: 'Transferred',      className: 'badge-muted' },
  graduated:        { label: 'Graduated',        className: 'badge-info' },
  withdrawn:        { label: 'Withdrawn',        className: 'badge-muted' },
  suspended:        { label: 'Suspended',        className: 'badge-danger' },
  on_leave:         { label: 'On Leave',         className: 'badge-warning' },
  draft:            { label: 'Draft',            className: 'badge-muted' },
  verified:         { label: 'Verified',         className: 'badge-success' },
  pending_review:   { label: 'Pending Review',   className: 'badge-warning' },
  completed:        { label: 'Completed',        className: 'badge-success' },
  planned:          { label: 'Planned',          className: 'badge-info' },
  cancelled:        { label: 'Cancelled',        className: 'badge-muted' },
  improved:         { label: 'Improved',         className: 'badge-success' },
  no_change:        { label: 'No Change',        className: 'badge-muted' },
  declined:         { label: 'Declined',         className: 'badge-danger' },
  high:             { label: '✓ High',           className: 'badge-success' },
  medium:           { label: '~ Medium',         className: 'badge-warning' },
  low:              { label: '⚠ Low',            className: 'badge-danger' },
  unclear:          { label: '? Unclear',        className: 'badge-muted' },
};

export function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? { label: status, className: 'badge-muted' };
  return <span className={`badge ${config.className}`}>{config.label}</span>;
}

// -- EmptyState ------------------------------------------------
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="state-container">
      {icon && (
        <div className="state-icon" style={{ background: 'var(--color-surface-alt)' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>{icon}</span>
        </div>
      )}
      <div className="state-title">{title}</div>
      {description && <p className="state-description">{description}</p>}
      {action && <div style={{ marginTop: '0.5rem' }}>{action}</div>}
    </div>
  );
}

// -- LoadingState ----------------------------------------------
export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="state-container">
      <div style={{ width: 40, height: 40, border: '3px solid var(--color-border)', borderTopColor: 'var(--color-blue)', borderRadius: '50%' }} className="spin" />
      <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>{message}</span>
    </div>
  );
}

// -- Skeleton --------------------------------------------------
export function SkeletonCard() {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="skeleton" style={{ height: 16, width: '40%' }} />
      <div className="skeleton" style={{ height: 32, width: '60%' }} />
      <div className="skeleton" style={{ height: 12, width: '30%' }} />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="table-container">
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="skeleton" style={{ height: 14, width: 200 }} />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-light)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="skeleton" style={{ height: 32, width: 32, borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <div className="skeleton" style={{ height: 14, width: `${50 + Math.random() * 30}%` }} />
            <div className="skeleton" style={{ height: 11, width: `${30 + Math.random() * 20}%` }} />
          </div>
          <div className="skeleton" style={{ height: 24, width: 60, borderRadius: 999 }} />
        </div>
      ))}
    </div>
  );
}

// -- ErrorState -----------------------------------------------
export function ErrorState({ message = "Something went wrong.", onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="state-container">
      <div className="state-icon" style={{ background: 'var(--color-danger-bg)' }}>
        <span style={{ color: 'var(--color-danger)', fontSize: '1.5rem' }}>!</span>
      </div>
      <div className="state-title">Unable to load</div>
      <p className="state-description">{message}</p>
      {onRetry && (
        <button className="btn btn-secondary" onClick={onRetry}>Try Again</button>
      )}
    </div>
  );
}

// -- AccessDenied ----------------------------------------------
export function AccessDenied() {
  return (
    <div className="state-container">
      <div className="state-icon" style={{ background: 'var(--color-warning-bg)' }}>
        <span style={{ fontSize: '1.75rem' }}>🔒</span>
      </div>
      <div className="state-title">Access Restricted</div>
      <p className="state-description">
        You don't have permission to view this information. If you believe this is an error, please contact your administrator.
      </p>
    </div>
  );
}

// -- Breadcrumbs -----------------------------------------------
interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {i > 0 && <ChevronRight size={12} className="breadcrumb-separator" />}
          <span
            className={`breadcrumb-item${i === items.length - 1 ? ' current' : ''}`}
            onClick={item.onClick}
            role={item.onClick ? 'button' : undefined}
            tabIndex={item.onClick ? 0 : undefined}
          >
            {item.label}
          </span>
        </span>
      ))}
    </nav>
  );
}

// -- DemoLabel -------------------------------------------------
export function DemoLabel({ label = 'Demo Data' }: { label?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
      fontSize: '0.6875rem', fontWeight: 600, padding: '0.125rem 0.5rem',
      background: '#F5F3FF', color: '#7C3AED',
      borderRadius: 'var(--radius-full)', border: '1px solid #DDD6FE',
      textTransform: 'uppercase', letterSpacing: '0.06em',
    }}>
      {label}
    </span>
  );
}

// -- SectionHeader ---------------------------------------------
export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
