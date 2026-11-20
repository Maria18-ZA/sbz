import { Link, router, useForm } from '@inertiajs/react'

export default function ShowPage({ orcamento }) {
    const { data, setData, post, processing, errors } = useForm({
        data_entrega: '',
        responsavel: '',
    })

    function mudarEstado(estado) {
        router.patch(`/orcamentos/${orcamento.id}/estado`, { estado })
    }

    function criarPedido(e) {
        e.preventDefault()
        post(`/orcamentos/${orcamento.id}/pedido`)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl">
                <Link href="/orcamentos" className="mb-4 inline-block text-blue-600 hover:underline">← Voltar</Link>

                {/* Cabeçalho */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Orçamento #{orcamento.id}</h1>
                            <p className="mt-1 text-gray-600">Cliente: {orcamento.cliente.nome}</p>
                            <p className="text-gray-600">Data: {orcamento.data} | Validade: {orcamento.validade ?? '—'}</p>
                        </div>
                        <span className="rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                            {orcamento.estado}
                        </span>
                    </div>

                    <div className="mt-4 flex gap-2">
                        {['rascunho', 'enviado', 'aprovado', 'rejeitado'].map((e) => (
                            <button key={e} onClick={() => mudarEstado(e)}
                                disabled={orcamento.estado === e}
                                className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 disabled:opacity-40">
                                {e}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Itens */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-3 text-lg font-semibold text-gray-800">Itens</h2>
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Descrição</th>
                                <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Tipo</th>
                                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Qtd</th>
                                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Preço Unit.</th>
                                <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orcamento.itens.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-3 py-2 text-gray-800">{item.descricao}</td>
                                    <td className="px-3 py-2 text-gray-600">{item.tipo_servico ?? '—'}</td>
                                    <td className="px-3 py-2 text-right text-gray-600">{item.quantidade}</td>
                                    <td className="px-3 py-2 text-right text-gray-600">{item.preco_unitario}</td>
                                    <td className="px-3 py-2 text-right text-gray-800">{item.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t font-semibold">
                                <td colSpan={4} className="px-3 py-2 text-right text-gray-700">Total</td>
                                <td className="px-3 py-2 text-right text-gray-900">{orcamento.total} Kz</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Criar pedido — só quando aprovado e ainda sem pedido */}
                {orcamento.estado === 'aprovado' && !orcamento.pedido && (
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-3 text-lg font-semibold text-gray-800">Criar Pedido</h2>
                        <form onSubmit={criarPedido} className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Data de entrega</label>
                                    <input type="date" value={data.data_entrega}
                                        onChange={(e) => setData('data_entrega', e.target.value)}
                                        className="w-full rounded border border-gray-300 px-3 py-2" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Responsável</label>
                                    <input type="text" value={data.responsavel}
                                        onChange={(e) => setData('responsavel', e.target.value)}
                                        className="w-full rounded border border-gray-300 px-3 py-2" />
                                </div>
                            </div>
                            {errors.orcamento && <p className="text-sm text-red-600">{errors.orcamento}</p>}
                            <button type="submit" disabled={processing}
                                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50">
                                Criar Pedido
                            </button>
                        </form>
                    </div>
                )}

                {/* Link para o pedido, se já existir */}
                {orcamento.pedido && (
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="text-gray-700">Este orçamento já tem um pedido.</p>
                        <Link href={`/pedidos/${orcamento.pedido.id}`} className="mt-2 inline-block text-blue-600 hover:underline">
                            Ver pedido #{orcamento.pedido.id}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}