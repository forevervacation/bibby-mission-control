'use client';

export default function QuickActions() {
  const actions = [
    { icon: '🔴', label: 'Live Users', value: '1 active', color: 'from-red-500 to-pink-500' },
    { icon: '👥', label: 'Total Users (7d)', value: '51', color: 'from-blue-500 to-cyan-500' },
    { icon: '🆕', label: 'New Signups (7d)', value: '29', color: 'from-green-500 to-emerald-500' },
    { icon: '📄', label: 'Page Views (7d)', value: '303', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${action.color} rounded-xl p-6 shadow-xl hover:scale-105 transition-transform cursor-pointer`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">{action.label}</p>
              <p className="text-white text-3xl font-bold mt-2">{action.value}</p>
            </div>
            <div className="text-5xl opacity-50">{action.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
