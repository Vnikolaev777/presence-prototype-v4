import { LayoutGrid } from 'lucide-react';

export function AppsForSchoolsView() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-1">Apps for Schools</h1>
        <p className="text-slate-500 text-sm">Browse and manage applications available for your school.</p>
      </div>

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <LayoutGrid className="w-7 h-7 text-slate-400" />
        </div>
        <p className="text-slate-500 text-sm">Coming soon</p>
      </div>
    </div>
  );
}
