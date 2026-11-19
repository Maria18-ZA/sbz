import { Link, useForm, router } from '@inertiajs/react'

export default function ShowPage({ cliente }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        data_medicao: new Date().toISOString().split('T')[0],
        peito: '',
        cintura: '',
        quadril: '',
        altura: '',
        ombro: '',
        comprimento: '',
        observacoes: '',
    })

    function submitMedida(e) {
        e.preventDefault()
        post(`/clientes/${cliente.id}/medidas`, {
            onSuccess: () => reset('peito', 'cintura', 'quadril', 'altura', 'ombro', 'comprimento', 'observacoes'),
        })
    }

    function apagarMedida(id) {
        if (confirm('Apagar esta medição?')) {
            router.delete(`/medidas/${id}`)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl">
                <Link href="/clientes" className="mb-4 inline-block text-blue-600 hover:underline">
                    ← Voltar
                </Link>

                {/* Ficha do cliente */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <h1 className="mb-4 text-2xl font-bold text-gray-800">{cliente.nome}</h1>
                    <dl className="grid grid-cols-2 gap-2 text-gray-700">
                        <div><dt className="inline font-medium">Tipo: </dt><dd className="inline">{cliente.tipo}</dd></div>
                        <div><dt className="inline font-medium">Contacto: </dt><dd className="inline">{cliente.contacto}</dd></div>
                        {cliente.email && <div><dt className="inline font-medium">Email: </dt><dd className="inline">{cliente.email}</dd></div>}
                        {cliente.morada && <div><dt className="inline font-medium">Morada: </dt><dd className="inline">{cliente.morada}</dd></div>}
                        {cliente.setor && <div><dt className="inline font-medium">Setor: </dt><dd className="inline">{cliente.setor}</dd></div>}
                    </dl>
                </div>

                {/* Histórico de medidas */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Histórico de Medidas</h2>

                    {cliente.medidas.length === 0 ? (
                        <p className="text-gray-500">Ainda não há medições registadas.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Data</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Peito</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Cintura</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Quadril</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Altura</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Ombro</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Compr.</th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cliente.medidas.map((m) => (
                                        <tr key={m.id}>
                                            <td className="px-3 py-2 text-gray-800">{m.data_medicao}</td>
                                            <td className="px-3 py-2 text-gray-600">{m.peito ?? '—'}</td>
                                            <td className="px-3 py-2 text-gray-600">{m.cintura ?? '—'}</td>
                                            <td className="px-3 py-2 text-gray-600">{m.quadril ?? '—'}</td>
                                            <td className="px-3 py-2 text-gray-600">{m.altura ?? '—'}</td>
                                            <td className="px-3 py-2 text-gray-600">{m.ombro ?? '—'}</td>
                                            <td className="px-3 py-2 text-gray-600">{m.comprimento ?? '—'}</td>
                                            <td className="px-3 py-2 text-right">
                                                <button
                                                    onClick={() => apagarMedida(m.id)}
                                                    className="text-sm text-red-600 hover:underline"
                                                >
                                                    Apagar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Formulário de nova medição */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Nova Medição</h2>

                    <form onSubmit={submitMedida} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Data da medição *</label>
                            <input
                                type="date"
                                value={data.data_medicao}
                                onChange={(e) => setData('data_medicao', e.target.value)}
                                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                            />
                            {errors.data_medicao && <p className="mt-1 text-sm text-red-600">{errors.data_medicao}</p>}
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                ['peito', 'Peito'],
                                ['cintura', 'Cintura'],
                                ['quadril', 'Quadril'],
                                ['altura', 'Altura'],
                                ['ombro', 'Ombro'],
                                ['comprimento', 'Comprimento'],
                            ].map(([campo, label]) => (
                                <div key={campo}>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={data[campo]}
                                        onChange={(e) => setData(campo, e.target.value)}
                                        className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    />
                                    {errors[campo] && <p className="mt-1 text-sm text-red-600">{errors[campo]}</p>}
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Observações</label>
                            <textarea
                                value={data.observacoes}
                                onChange={(e) => setData('observacoes', e.target.value)}
                                rows={2}
                                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Registar Medição
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}