import { useForm, Link } from '@inertiajs/react'

export default function CreatePage({ clientes }) {
    const { data, setData, post, processing, errors } = useForm({
        cliente_id: '',
        data: new Date().toISOString().split('T')[0],
        validade: '',
        itens: [{ descricao: '', tipo_servico: '', quantidade: 1, preco_unitario: 0 }],
    })

    function atualizarItem(index, campo, valor) {
        const novos = [...data.itens]
        novos[index][campo] = valor
        setData('itens', novos)
    }

    function adicionarItem() {
        setData('itens', [...data.itens, { descricao: '', tipo_servico: '', quantidade: 1, preco_unitario: 0 }])
    }

    function removerItem(index) {
        if (data.itens.length === 1) return
        setData('itens', data.itens.filter((_, i) => i !== index))
    }

    function total() {
        return data.itens.reduce((soma, item) => {
            return soma + (Number(item.quantidade) || 0) * (Number(item.preco_unitario) || 0)
        }, 0)
    }

    function submit(e) {
        e.preventDefault()
        post('/orcamentos')
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">Novo Orçamento</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Cliente *</label>
                            <select
                                value={data.cliente_id}
                                onChange={(e) => setData('cliente_id', e.target.value)}
                                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                            >
                                <option value="">— Selecionar —</option>
                                {clientes.map((c) => (
                                    <option key={c.id} value={c.id}>{c.nome}</option>
                                ))}
                            </select>
                            {errors.cliente_id && <p className="mt-1 text-sm text-red-600">{errors.cliente_id}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Data *</label>
                                <input type="date" value={data.data}
                                    onChange={(e) => setData('data', e.target.value)}
                                    className="w-full rounded border border-gray-300 px-3 py-2" />
                                {errors.data && <p className="mt-1 text-sm text-red-600">{errors.data}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Validade</label>
                                <input type="date" value={data.validade}
                                    onChange={(e) => setData('validade', e.target.value)}
                                    className="w-full rounded border border-gray-300 px-3 py-2" />
                                {errors.validade && <p className="mt-1 text-sm text-red-600">{errors.validade}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Itens</h2>
                            <button type="button" onClick={adicionarItem}
                                className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300">
                                + Adicionar item
                            </button>
                        </div>

                        <div className="space-y-3">
                            {data.itens.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-start">
                                    <div className="col-span-4">
                                        <input type="text" placeholder="Descrição" value={item.descricao}
                                            onChange={(e) => atualizarItem(index, 'descricao', e.target.value)}
                                            className="w-full rounded border border-gray-300 px-2 py-1 text-sm" />
                                        {errors[`itens.${index}.descricao`] && <p className="text-xs text-red-600">{errors[`itens.${index}.descricao`]}</p>}
                                    </div>
                                    <div className="col-span-3">
                                        <input type="text" placeholder="Tipo de serviço" value={item.tipo_servico}
                                            onChange={(e) => atualizarItem(index, 'tipo_servico', e.target.value)}
                                            className="w-full rounded border border-gray-300 px-2 py-1 text-sm" />
                                    </div>
                                    <div className="col-span-1">
                                        <input type="number" min="1" value={item.quantidade}
                                            onChange={(e) => atualizarItem(index, 'quantidade', e.target.value)}
                                            className="w-full rounded border border-gray-300 px-2 py-1 text-sm" />
                                    </div>
                                    <div className="col-span-2">
                                        <input type="number" step="0.01" min="0" value={item.preco_unitario}
                                            onChange={(e) => atualizarItem(index, 'preco_unitario', e.target.value)}
                                            className="w-full rounded border border-gray-300 px-2 py-1 text-sm" />
                                    </div>
                                    <div className="col-span-1 pt-1 text-right text-sm text-gray-700">
                                        {(Number(item.quantidade) || 0) * (Number(item.preco_unitario) || 0)}
                                    </div>
                                    <div className="col-span-1 pt-1 text-right">
                                        <button type="button" onClick={() => removerItem(index)}
                                            className="text-sm text-red-600 hover:underline">×</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 border-t pt-3 text-right">
                            <span className="text-sm font-medium text-gray-700">Total: </span>
                            <span className="text-lg font-bold text-gray-900">{total()} Kz</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button type="submit" disabled={processing}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
                            Guardar Orçamento
                        </button>
                        <Link href="/orcamentos" className="text-gray-600 hover:underline self-center">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}