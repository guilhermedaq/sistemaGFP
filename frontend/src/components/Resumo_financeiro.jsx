import { useState, useEffect } from "react";

export function ResumoFinanceiro(){
    const [mes, setMes] = useState('2026-09'); //guardar mês do ano
    const [resumo, setResumo] = useState({
        total_receita: 0,
        total_despesa: 0,
        saldo_geral: 0
    }); // chamar o total financeiro
    const [categorias, setCategorias] = useState([]); //chamar as categorias para exibição na tela
    const [abaAtiva, setAbaAtiva] = useState('DESPESA'); // 'despesa' ou 'receita'
    const [valores, setValores] = useState({}); // Estado para guardar valores

    function month_change_handle(e) {
            setMes(e.target.value)
    }
    const handleValorChange = (id, valor) => {
        setValores((prev) => ({
        ...prev,
        [id]: valor,
        }));
    };

    useEffect(() => { 

    async function buscarDados() {
        try{
            const resposta = await fetch(`http://localhost:3000/gastos/${mes}`);
            const dados = await resposta.json();
            setResumo(dados)
        } catch (err) {
          console.error("Erro ao carregar dados:", err);
    }

    }
    buscarDados();

    }, [mes]);

    useEffect(()=>{
        async function chamarCategorias(){
            try{
                const resposta = await fetch('http://localhost:3000/categorias');
                const dados = await resposta.json();
                setCategorias(dados.categorias);
            } catch (err) {
              console.error("Erro ao carregar categorias:", err);
            }
        }
        chamarCategorias()
    }, [])
    
    // Função auxiliar para formatar moeda em pt-BR
    const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor || 0);

    // Soma das despesas digitadas nos inputs
    const totalDespesasDigitado = categorias
    .filter((cat) => cat.tipo === 'DESPESA')
    .reduce((acc, cat) => acc + (Number(valores[cat.id]) || 0), 0);

    // Soma das receitas digitadas nos inputs
    const totalReceitasDigitado = categorias
    .filter((cat) => cat.tipo === 'RECEITA')
    .reduce((acc, cat) => acc + (Number(valores[cat.id]) || 0), 0);

    // Totais finais combinando a base (do mês) com os inputs atuais
    const totalDespesas = (Number(resumo.total_despesa) || 0) + totalDespesasDigitado;
    const totalReceitas = (Number(resumo.total_receita) || 0) + totalReceitasDigitado;
    const saldoGeral = totalReceitas - totalDespesas;
    return (
        <div className="p-4 w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
        <h1 className="text-xl font-bold text-gray-800">Resumo Financeiro</h1>
        

    <div className="border-2 p-4 rounded-lg w-full space-y-4">

    {/* Botões de Alternância (Tabs) */}
    <div className="flex border-b">
        <button
        type="button"
        onClick={() => setAbaAtiva('DESPESA')}
        className={`flex-1 py-2 font-bold text-center border-b-2 transition-colors ${
            abaAtiva === 'DESPESA'
            ? 'border-red-500 text-red-600 bg-red-50/50'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
        >
        Despesas
        </button>

        <button
        type="button"
        onClick={() => setAbaAtiva('RECEITA')}
        className={`flex-1 py-2 font-bold text-center border-b-2 transition-colors ${
            abaAtiva === 'RECEITA'
            ? 'border-green-500 text-green-600 bg-green-50/50'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
        >
        Receitas
        </button>
    </div>

    {/* Tabela com suporte a valores digitados e prefixo R$ */}
    <table className="w-full text-left border-collapse">
        <thead>
        <tr className="text-sm font-semibold text-gray-600 border-b">
            <th className="py-2">Categoria</th>
            <th className="py-2 text-right w-44">Valor (R$)</th>
        </tr>
        </thead>
        <tbody>
        {categorias
            .filter((cat) => cat.tipo === abaAtiva)
            .map((cat) => (
            <tr key={cat.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-2.5 text-gray-700 text-sm font-medium">{cat.nome}</td>
                <td className="py-2.5 text-right">
                <div className="flex items-center justify-end space-x-1">
                    <span className="text-xs text-gray-500 font-medium">R$</span>
                    <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    value={valores[cat.id] || ''}
                    onChange={(e) => handleValorChange(cat.id, e.target.value)}
                    className={`border rounded px-2 py-1.5 w-28 text-right focus:outline-none focus:ring-1 text-sm ${
                        abaAtiva === 'DESPESA' ? 'focus:ring-red-500' : 'focus:ring-green-500'
                    }`}
                    />
                </div>
                </td>
            </tr>
            ))}
        </tbody>
    </table>

    </div>


    <div className="p-4 space-y-4"> {/* Resumo financeiro */}

    {/* Linha 1: Despesas e Receitas lado a lado (2 colunas) */}
    <div className="grid grid-cols-2 gap-4">
        {/* Bloco de Despesas */}
        <div className="text-center p-3 bg-red-50 rounded-lg">
        <h1 className="font-semibold text-gray-700">Despesas</h1>
        <p className="text-lg font-bold text-red-600">
            R$ {formatarMoeda(totalDespesas)}
        </p>
        </div>

        {/* Bloco de Receitas */}
        <div className="text-center p-3 bg-green-50 rounded-lg">
        <h1 className="font-semibold text-gray-700">Receitas</h1>
        <p className="text-lg font-bold text-green-600">
            R$ {formatarMoeda(totalReceitas)}
        </p>
        </div>
    </div>

    {/* Linha 2: Saldo Geral centralizado sozinho */}
    <div className="text-center p-3 bg-blue-50 rounded-lg">
        <h1 className="font-semibold text-gray-700">Saldo Geral</h1>
        <p className={`text-xl font-bold ${saldoGeral >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
        R$ {formatarMoeda(saldoGeral)}
        </p>
    </div>

    </div>


        <input
         type="month"
         id="mes"
         value={mes}
         onChange={month_change_handle}
        />

        </div>
    );
}