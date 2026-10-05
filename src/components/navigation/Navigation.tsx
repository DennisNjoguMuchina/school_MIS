import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Settings,
  Bell, ChevronDown, LogOut, Menu, X, Shield, ClipboardList,
  TrendingUp, Brain, MessageSquare, UserCheck, School,
  Calendar, GitBranch, FileText, Layers, FlaskConical,
  AlertTriangle, ChevronRight, Home, UserCog, BookMarked,
  BarChart2, Target, Upload, ScanLine, Wrench, User, 
  Building2, ArrowLeftRight, Star, Code2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types/auth';

// ============================================================
// NAVIGATION CONFIGURATION
// Each role gets a completely different navigation structure.
// ============================================================

interface NavItem {
  label: string;
  to?: string;
  icon: React.ReactNode;
  children?: NavItem[];
  section?: string;
}

function getNavItems(role: UserRole): NavItem[] {
  switch (role) {
    case 'admin':
      return [
        { label: 'Dashboard', to: '/admin', icon: <LayoutDashboard size={18} />, section: 'Overview' },
        { label: 'School Details', to: '/admin/school', icon: <Building2 size={18} />, section: 'School' },
        { label: 'Academic Years', to: '/admin/academic-years', icon: <Calendar size={18} />, section: 'School' },
        { label: 'Terms', to: '/admin/terms', icon: <GitBranch size={18} />, section: 'School' },
        { label: 'Grades', to: '/admin/grades', icon: <Layers size={18} />, section: 'Academic Structure' },
        { label: 'Streams', to: '/admin/streams', icon: <GitBranch size={18} />, section: 'Academic Structure' },
        { label: 'Subjects', to: '/admin/subjects', icon: <BookOpen size={18} />, section: 'Academic Structure' },
        { label: 'Curriculum', to: '/admin/curriculum', icon: <BookMarked size={18} />, section: 'Academic Structure' },
        { label: 'Students', to: '/admin/students', icon: <GraduationCap size={18} />, section: 'People' },
        { label: 'Teachers', to: '/admin/teachers', icon: <UserCheck size={18} />, section: 'People' },
        { label: 'Parents', to: '/admin/parents', icon: <Users size={18} />, section: 'People' },
        { label: 'Management', to: '/admin/management-users', icon: <UserCog size={18} />, section: 'People' },
        { label: 'Teacher Assignments', to: '/admin/assignments', icon: <ClipboardList size={18} />, section: 'Assignments' },
        { label: 'Admissions', to: '/admin/admissions', icon: <School size={18} />, section: 'Student Movement' },
        { label: 'Promotions', to: '/admin/promotions', icon: <TrendingUp size={18} />, section: 'Student Movement' },
        { label: 'Transfers', to: '/admin/transfers', icon: <ArrowLeftRight size={18} />, section: 'Student Movement' },
        { label: 'Roles & Permissions', to: '/admin/roles', icon: <Shield size={18} />, section: 'Security' },
        { label: 'Audit Log', to: '/admin/audit-log', icon: <FileText size={18} />, section: 'Security' },
        { label: 'Settings', to: '/admin/settings', icon: <Settings size={18} />, section: 'Settings' },
      ];

    case 'management':
      return [
        { label: 'Dashboard', to: '/management', icon: <LayoutDashboard size={18} />, section: 'Overview' },
        { label: 'School Performance', to: '/management/performance', icon: <BarChart2 size={18} />, section: 'Performance' },
        { label: 'Grades', to: '/management/grades', icon: <Layers size={18} />, section: 'Performance' },
        { label: 'Subjects', to: '/management/subjects', icon: <BookOpen size={18} />, section: 'Performance' },
        { label: 'Learning Gaps', to: '/management/gaps', icon: <Target size={18} />, section: 'Performance' },
        { label: 'Learners', to: '/management/learners', icon: <GraduationCap size={18} />, section: 'Performance' },
        { label: 'Interventions', to: '/management/interventions', icon: <Wrench size={18} />, section: 'Action' },
        { label: 'What-If Analysis', to: '/management/whatif', icon: <FlaskConical size={18} />, section: 'Action' },
        { label: 'AI Assistant', to: '/management/ai', icon: <Brain size={18} />, section: 'Intelligence' },
        { label: 'Audit Log', to: '/management/audit-log', icon: <FileText size={18} />, section: 'Security' },
      ];

    case 'teacher':
      return [
        { label: 'Dashboard', to: '/teacher', icon: <LayoutDashboard size={18} />, section: 'Overview' },
        { label: 'My Classes', to: '/teacher/classes', icon: <School size={18} />, section: 'Teaching' },
        { label: 'My Learners', to: '/teacher/learners', icon: <GraduationCap size={18} />, section: 'Teaching' },
        { label: 'Assessments', to: '/teacher/assessments', icon: <ClipboardList size={18} />, section: 'Assessment' },
        { label: 'Enter Marks', to: '/teacher/enter-marks', icon: <FileText size={18} />, section: 'Assessment' },
        { label: 'Upload Marksheet', to: '/teacher/upload', icon: <Upload size={18} />, section: 'Assessment' },
        { label: 'OCR Review', to: '/teacher/ocr-review', icon: <ScanLine size={18} />, section: 'Assessment' },
        { label: 'Performance', to: '/teacher/performance', icon: <BarChart2 size={18} />, section: 'Analytics' },
        { label: 'Interventions', to: '/teacher/interventions', icon: <Wrench size={18} />, section: 'Action' },
        { label: 'AI Assistant', to: '/teacher/ai', icon: <Brain size={18} />, section: 'Intelligence' },
      ];

    case 'parent':
      return [
        { label: 'Dashboard', to: '/parent', icon: <Home size={18} />, section: 'My Children' },
        { label: 'Performance', to: '/parent/performance', icon: <BarChart2 size={18} />, section: 'Learning' },
        { label: 'Subjects', to: '/parent/subjects', icon: <BookOpen size={18} />, section: 'Learning' },
        { label: 'Attendance', to: '/parent/attendance', icon: <Calendar size={18} />, section: 'Learning' },
        { label: 'Teacher Feedback', to: '/parent/feedback', icon: <MessageSquare size={18} />, section: 'Communication' },
        { label: 'Interventions', to: '/parent/interventions', icon: <Wrench size={18} />, section: 'Support' },
        { label: 'AI Assistant', to: '/parent/ai', icon: <Brain size={18} />, section: 'Intelligence' },
      ];

    case 'student':
      return [
        { label: 'My Dashboard', to: '/student', icon: <Home size={18} />, section: 'Overview' },
        { label: 'My Performance', to: '/student/performance', icon: <BarChart2 size={18} />, section: 'Learning' },
        { label: 'My Subjects', to: '/student/subjects', icon: <BookOpen size={18} />, section: 'Learning' },
        { label: 'AI Learning Assistant', to: '/student/ai', icon: <Brain size={18} />, section: 'Intelligence' },
      ];

    default:
      return [];
  }
}

// ============================================================
// SIDEBAR COMPONENT
// ============================================================
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function groupNavItems(items: NavItem[]) {
  const groups: Record<string, NavItem[]> = {};
  for (const item of items) {
    const section = item.section ?? 'General';
    if (!groups[section]) groups[section] = [];
    groups[section].push(item);
  }
  return groups;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { role } = useAuth();
  const navItems = role ? getNavItems(role) : [];
  const groups = groupNavItems(navItems);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-sidebar bg-black opacity-30 md:hidden"
          onClick={onClose}
          style={{ backgroundColor: 'rgb(0 0 0 / 0.3)', zIndex: 99 }}
        />
      )}
      <aside className={`sidebar${isOpen ? ' open' : ''}`}>
        <nav className="sidebar-nav">
          {Object.entries(groups).map(([section, items]) => (
            <React.Fragment key={section}>
              <div className="sidebar-section-label">{section}</div>
              {items.map(item => (
                <SidebarNavItem key={item.to ?? item.label} item={item} onNavigate={onClose} />
              ))}
            </React.Fragment>
          ))}
        </nav>

        {/* Dev link */}
        {import.meta.env.DEV && (
          <div className="sidebar-footer">
            <NavLink
              to="/dev/accounts"
              className={({ isActive }) => `nav-item nav-item-sub${isActive ? ' active' : ''}`}
              onClick={onClose}
            >
              <Code2 size={15} className="nav-icon" style={{ color: '#7C3AED' }} />
              <span style={{ color: '#7C3AED', fontSize: '0.8125rem' }}>Dev Account Center</span>
            </NavLink>
          </div>
        )}
      </aside>
    </>
  );
}

function SidebarNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  if (item.children) {
    const isChildActive = item.children.some(c => c.to && location.pathname.startsWith(c.to));
    return (
      <div>
        <button
          className={`nav-item nav-group-toggle w-full${isChildActive ? ' active' : ''}`}
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
        >
          <span className="flex items-center gap-3 flex-1">
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </span>
          <ChevronRight size={14} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: '150ms' }} />
        </button>
        {expanded && item.children.map(child => (
          <NavLink
            key={child.to}
            to={child.to!}
            className={({ isActive }) => `nav-item nav-item-sub${isActive ? ' active' : ''}`}
            onClick={onNavigate}
          >
            <span className="nav-icon">{child.icon}</span>
            {child.label}
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <NavLink
      to={item.to!}
      end={item.to !== undefined && ['/', '/admin', '/management', '/teacher', '/parent', '/student'].includes(item.to)}
      className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
      onClick={onNavigate}
    >
      <span className="nav-icon">{item.icon}</span>
      {item.label}
    </NavLink>
  );
}

// ============================================================
// TOP BAR COMPONENT
// ============================================================
const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrator',
  management: 'Management',
  teacher: 'Teacher',
  parent: 'Parent',
  student: 'Student',
};

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = user ? `${user.name.split(' ')[0][0]}${user.name.split(' ').pop()?.[0] ?? ''}`.toUpperCase() : '?';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="topbar" role="banner">
      {/* Mobile menu toggle */}
      <button className="topbar-icon-btn" onClick={onMenuToggle} aria-label="Toggle navigation" style={{ display: 'none' }} id="mobile-menu-btn">
        <Menu size={20} />
      </button>

      {/* Logo + school */}
      <div className="topbar-logo">
        <div className="topbar-logo-icon" aria-hidden>
          <GraduationCap size={20} color="white" />
        </div>
        <div>
          <div className="topbar-school-name">Greenfield Academy</div>
          <div className="topbar-school-sub">School Performance Intelligence</div>
        </div>
      </div>

      <div className="topbar-divider" aria-hidden />

      <div className="topbar-academic-info" aria-label="Current academic period">
        <span className="topbar-year">2026 Academic Year</span>
        <span className="topbar-term">Term 3 · Active</span>
      </div>

      <div className="topbar-spacer" />

      <div className="topbar-actions">
        {/* Notifications */}
        <button className="topbar-icon-btn" aria-label="Notifications" title="Notifications">
          <Bell size={18} />
          <span className="notif-badge" aria-label="New notifications" />
        </button>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            className="topbar-user-btn"
            onClick={() => setProfileOpen(o => !o)}
            aria-label="User menu"
            aria-expanded={profileOpen}
          >
            <div className="topbar-avatar" aria-hidden>{initials}</div>
            <div className="topbar-user-info">
              <div className="topbar-user-name">{user?.name}</div>
              <div className="topbar-user-role">{role ? ROLE_LABELS[role] : ''}</div>
            </div>
            <ChevronDown size={14} color="rgba(255,255,255,0.5)" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setProfileOpen(false)} style={{ zIndex: 299 }} />
              <div
                style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  background: 'white', borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)',
                  minWidth: 200, zIndex: 300, overflow: 'hidden',
                  animation: 'slideUp 150ms ease',
                }}
                role="menu"
              >
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>{user?.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{user?.email}</div>
                  {user?.role && (
                    <div style={{ marginTop: '0.375rem' }}>
                      <span className={`badge badge-info`}>{ROLE_LABELS[user.role]}</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: '0.5rem' }}>
                  <button
                    className="nav-item w-full"
                    onClick={() => { setProfileOpen(false); navigate('/profile'); }}
                    role="menuitem"
                  >
                    <User size={16} /> My Profile
                  </button>
                  {import.meta.env.DEV && (
                    <button
                      className="nav-item w-full"
                      onClick={() => { setProfileOpen(false); navigate('/dev/accounts'); }}
                      role="menuitem"
                      style={{ color: '#7C3AED' }}
                    >
                      <Code2 size={16} /> Switch Account
                    </button>
                  )}
                  <button
                    className="nav-item w-full"
                    onClick={handleLogout}
                    role="menuitem"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
