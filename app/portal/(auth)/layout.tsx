export default function PortalAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="band auth-shell">
      <div className="wrap auth-wrap">
        <div className="brand">36&nbsp;DUNES</div>
        {children}
      </div>
    </div>
  );
}
