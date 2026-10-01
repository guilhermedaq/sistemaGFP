import { useState, useEffect } from "react";

export function ResumoFinanceiro(){
    const [mes, setMes] = useState('2026-09');


    const [resumo, setResumo] = useState({
        total_receita: 0,
        total_despesa: 0,
        saldo_geral: 0
    });

    function month_change_handle(e) {
            setMes(e.target.value)
    }

    useEffect(() => {

    async function buscarDados() {
        const resposta = await fetch(`http://localhost:3000/gastos/${mes}`);
        const dados = await resposta.json();
        setResumo(dados)
    }
    buscarDados();

    }, [mes]);
    
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-xl font-bold text-gray-800">Resumo Financeiro</h1>
        

        <input
         type="month"
         id="mes"
         value={mes}
         onChange={month_change_handle}
        />
        <div className="border-2 flex flex-row gap-3">
            <div className="">
                <h1>Gastos</h1>
            </div>
            
            <div>
                <h1>Despesas</h1>
            </div>
        </div>
        </div>
    );
}