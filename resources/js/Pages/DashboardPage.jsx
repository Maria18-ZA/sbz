export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-800">SBZ Gestão</h1>
                <p className="mt-2 text-gray-600">Sistema de gestão do atelier.</p>
                <a href="/clientes" className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Ver Clientes
                </a>
            </div>
        </div>
    )
}
